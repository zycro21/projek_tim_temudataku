import { PrismaClient, Prisma } from '@prisma/client';
import { NotFoundError, BadRequestError, InternalServerError } from '../utils/errorTypes';
import prisma from '../config/prisma';
import { 
  addDays, 
  addWeeks, 
  addMonths, 
  format, 
  parse, 
  isBefore, 
  isAfter, 
  isEqual, 
  parseISO, 
  setHours, 
  setMinutes,
  isSameDay,
  startOfDay,
  endOfDay
} from 'date-fns';

export interface BatchSessionInput {
  startTime: string | Date;
  endTime: string | Date;
  durationMinutes?: number;
  meetingLink?: string;
  status?: string;
  notes?: string;
}

export interface RecurringSessionOptions {
  serviceId: number;
  startDate: Date;
  endDate: Date;
  durationMinutes: number;
  daysOfWeek: number[]; // 0 = Sunday, 1 = Monday, etc.
  startTimes: string[]; // Array of times in format "HH:MM"
  recurrencePattern: 'weekly' | 'biweekly' | 'monthly';
  status?: string;
  meetingLink?: string;
  notes?: string;
}

export interface MentoringSessionCreate {
  serviceId: number;
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
  meetingLink?: string;
  status?: string;
  notes?: string;
}

export interface MentoringSessionUpdate {
  startTime?: Date;
  endTime?: Date;
  durationMinutes?: number;
  meetingLink?: string;
  status?: string;
  notes?: string;
}

export interface SessionResponse {
  id: number;
  serviceId: number;
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
  meetingLink: string | null;
  status: string | null;
  notes: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
}

/**
 * Create multiple sessions at once (batch scheduling)
 */
export const createBatchSessions = async (
  serviceId: number,
  sessions: BatchSessionInput[]
): Promise<SessionResponse[]> => {
  try {
    // Check if service exists
    const service = await prisma.mentoring_services.findUnique({
      where: {
        id: serviceId,
      },
    });
    
    if (!service) {
      throw new NotFoundError('Mentoring service not found');
    }
    
    // Validate each session
    for (const session of sessions) {
      const startTime = new Date(session.startTime);
      const endTime = new Date(session.endTime);
      
      validateSessionTime(startTime, endTime);
      
      // Check for scheduling conflicts
      await checkSchedulingConflicts(serviceId, startTime, endTime);
    }
    
    // Create all sessions
    const createdSessions: SessionResponse[] = [];
    const baseTimestamp = Math.floor(Date.now() / 1000);
    
    for (let i = 0; i < sessions.length; i++) {
      const session = sessions[i];
      const startTime = new Date(session.startTime);
      const endTime = new Date(session.endTime);
      
      // Calculate duration if not provided
      const durationMinutes = session.durationMinutes || calculateDuration(startTime, endTime);
      
      // Generate unique ID
      const sessionId = baseTimestamp + i;
      
      const newSession = await prisma.mentoring_sessions.create({
        data: {
          id: sessionId,
          service_id: serviceId,
          start_time: startTime,
          end_time: endTime,
          duration_minutes: durationMinutes,
          meeting_link: session.meetingLink,
          status: session.status || 'scheduled',
          notes: session.notes,
        },
      });
      
      createdSessions.push({
        id: newSession.id,
        serviceId: newSession.service_id,
        startTime: newSession.start_time,
        endTime: newSession.end_time,
        durationMinutes: newSession.duration_minutes,
        meetingLink: newSession.meeting_link,
        status: newSession.status,
        notes: newSession.notes,
      });
    }
    
    return createdSessions;
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      throw error;
    }
    throw new InternalServerError('Error creating batch sessions');
  }
};

/**
 * Create recurring sessions
 */
export const createRecurringSessions = async (
  options: RecurringSessionOptions
): Promise<SessionResponse[]> => {
  try {
    // Check if service exists
    const service = await prisma.mentoring_services.findUnique({
      where: {
        id: options.serviceId,
      },
    });
    
    if (!service) {
      throw new NotFoundError('Mentoring service not found');
    }
    
    // Validate inputs
    if (isBefore(options.endDate, options.startDate)) {
      throw new BadRequestError('End date must be after start date');
    }
    
    if (options.durationMinutes < 15 || options.durationMinutes > 480) {
      throw new BadRequestError('Duration must be between 15 and 480 minutes');
    }
    
    if (options.daysOfWeek.length === 0) {
      throw new BadRequestError('At least one day of week must be specified');
    }
    
    if (options.startTimes.length === 0) {
      throw new BadRequestError('At least one start time must be specified');
    }
    
    // Generate sessions
    const sessions: SessionResponse[] = [];
    let currentDate = new Date(options.startDate);
    const baseTimestamp = Math.floor(Date.now() / 1000);
    let counter = 0;
    
    while (isBefore(currentDate, options.endDate) || isEqual(currentDate, options.endDate)) {
      const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
      
      if (options.daysOfWeek.includes(dayOfWeek)) {
        // Create a session for each start time on this day
        for (const timeStr of options.startTimes) {
          // Parse the time string (HH:MM)
          const [hours, minutes] = timeStr.split(':').map(Number);
          
          // Set the start time
          const startTime = new Date(currentDate);
          startTime.setHours(hours, minutes, 0, 0);
          
          // Skip if the start time is in the past
          if (isBefore(startTime, new Date())) {
            continue;
          }
          
          // Calculate end time
          const endTime = new Date(startTime);
          endTime.setMinutes(endTime.getMinutes() + options.durationMinutes);
          
          // Skip if there's a scheduling conflict
          try {
            await checkSchedulingConflicts(options.serviceId, startTime, endTime);
          } catch (error) {
            console.log(`Skipping session at ${startTime} due to conflict`);
            continue;
          }
          
          // Generate unique ID
          const sessionId = baseTimestamp + counter++;
          
          // Create the session
          const newSession = await prisma.mentoring_sessions.create({
            data: {
              id: sessionId,
              service_id: options.serviceId,
              start_time: startTime,
              end_time: endTime,
              duration_minutes: options.durationMinutes,
              meeting_link: options.meetingLink,
              status: options.status || 'scheduled',
              notes: options.notes,
            },
          });
          
          sessions.push({
            id: newSession.id,
            serviceId: newSession.service_id,
            startTime: newSession.start_time,
            endTime: newSession.end_time,
            durationMinutes: newSession.duration_minutes,
            meetingLink: newSession.meeting_link,
            status: newSession.status,
            notes: newSession.notes,
          });
        }
      }
      
      // Move to the next date based on recurrence pattern
      if (options.recurrencePattern === 'weekly') {
        currentDate = addDays(currentDate, 1);
      } else if (options.recurrencePattern === 'biweekly') {
        // If it's the last day of the current week, skip to the first day of the week after next
        if (dayOfWeek === 6) { // Saturday
          currentDate = addDays(currentDate, 8); // Skip to next Sunday + 7 days
        } else {
          currentDate = addDays(currentDate, 1);
        }
      } else if (options.recurrencePattern === 'monthly') {
        // If it's the last day of the month, skip to the first day of the next month
        const nextDay = addDays(currentDate, 1);
        if (nextDay.getDate() === 1) {
          currentDate = nextDay;
        } else {
          currentDate = addDays(currentDate, 1);
        }
      }
    }
    
    return sessions;
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      throw error;
    }
    throw new InternalServerError('Error creating recurring sessions');
  }
};

/**
 * Get available time slots for a service
 */
export const getAvailableTimeSlots = async (
  serviceId: number,
  startDate: Date,
  endDate: Date
) => {
  try {
    // Check if service exists
    const service = await prisma.mentoring_services.findUnique({
      where: {
        id: serviceId,
      },
    });
    
    if (!service) {
      throw new NotFoundError('Mentoring service not found');
    }
    
    // Get all existing sessions for the service in the date range
    const existingSessions = await prisma.mentoring_sessions.findMany({
      where: {
        service_id: serviceId,
        start_time: {
          gte: startDate,
          lte: endDate,
        },
        status: {
          in: ['scheduled', 'ongoing'],
        },
      },
      include: {
        bookings: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: {
        start_time: 'asc',
      },
    });
    
    // Format the results by day
    const availableSlotsByDay = {};
    let currentDay = new Date(startDate);
    
    while (isBefore(currentDay, endDate) || isEqual(currentDay, endDate)) {
      const dayStr = format(currentDay, 'yyyy-MM-dd');
      const sessionsForDay = existingSessions.filter(session => 
        isSameDay(session.start_time, currentDay)
      );
      
      availableSlotsByDay[dayStr] = sessionsForDay.map(session => ({
        id: session.id,
        startTime: session.start_time,
        endTime: session.end_time,
        durationMinutes: session.duration_minutes,
        availableSlots: service.max_participants 
          ? (service.max_participants - session.bookings.filter(b => 
              b.status === 'confirmed' || b.status === 'pending'
            ).length)
          : (service.service_type === 'one-on-one' ? 1 : null),
        isBooked: session.bookings.some(b => 
          b.status === 'confirmed' || b.status === 'pending'
        ),
        status: session.status,
      }));
      
      currentDay = addDays(currentDay, 1);
    }
    
    return {
      serviceId,
      serviceName: service.service_name,
      serviceType: service.service_type,
      startDate,
      endDate,
      availableSlotsByDay,
    };
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError('Error getting available time slots');
  }
};

/**
 * Get sessions for a specific day
 */
export const getSessionsByDay = async (
  serviceId: number,
  date: Date
) => {
  try {
    // Get the start and end of the day
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);
    
    // Get sessions for the day
    const sessions = await prisma.mentoring_sessions.findMany({
      where: {
        service_id: serviceId,
        start_time: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
      include: {
        bookings: {
          include: {
            mentee: {
              select: {
                full_name: true,
                email: true,
                profile_picture: true,
              },
            },
          },
        },
      },
      orderBy: {
        start_time: 'asc',
      },
    });
    
    // Get the service details
    const service = await prisma.mentoring_services.findUnique({
      where: {
        id: serviceId,
      },
      include: {
        mentor: {
          include: {
            user: {
              select: {
                full_name: true,
                email: true,
              },
            },
          },
        },
      },
    });
    
    if (!service) {
      throw new NotFoundError('Mentoring service not found');
    }
    
    // Format the response
    return {
      date: format(date, 'yyyy-MM-dd'),
      service: {
        id: service.id,
        name: service.service_name,
        type: service.service_type,
        mentorName: service.mentor.user.full_name,
        mentorEmail: service.mentor.user.email,
      },
      sessions: sessions.map(session => ({
        id: session.id,
        startTime: session.start_time,
        endTime: session.end_time,
        durationMinutes: session.duration_minutes,
        meetingLink: session.meeting_link,
        status: session.status,
        notes: session.notes,
        bookings: session.bookings.map(booking => ({
          id: booking.id,
          status: booking.status,
          menteeName: booking.mentee.full_name,
          menteeEmail: booking.mentee.email,
          menteePicture: booking.mentee.profile_picture,
        })),
      })),
    };
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError('Error getting sessions by day');
  }
};

/**
 * Cancel multiple sessions at once
 */
export const cancelMultipleSessions = async (
  sessionIds: number[],
  cancellationReason?: string
): Promise<SessionResponse[]> => {
  try {
    const cancelledSessions: SessionResponse[] = [];
    
    // Process each session
    for (const sessionId of sessionIds) {
      // Check if session exists
      const session = await prisma.mentoring_sessions.findUnique({
        where: {
          id: sessionId,
        },
        include: {
          bookings: true,
        },
      });
      
      if (!session) {
        throw new NotFoundError(`Session ${sessionId} not found`);
      }
      
      // Check if session can be cancelled (not already completed)
      if (session.status === 'completed') {
        throw new BadRequestError(`Session ${sessionId} is already completed and cannot be cancelled`);
      }
      
      // Update session status
      const updatedSession = await prisma.mentoring_sessions.update({
        where: {
          id: sessionId,
        },
        data: {
          status: 'cancelled',
          notes: cancellationReason 
            ? `${session.notes || ''}\nCancellation reason: ${cancellationReason}`
            : session.notes,
          updated_at: new Date(),
        },
      });
      
      // Update associated bookings
      if (session.bookings.length > 0) {
        await prisma.bookings.updateMany({
          where: {
            session_id: sessionId,
            status: {
              in: ['pending', 'confirmed'],
            },
          },
          data: {
            status: 'cancelled',
            updated_at: new Date(),
          },
        });
      }
      
      cancelledSessions.push({
        id: updatedSession.id,
        serviceId: updatedSession.service_id,
        startTime: updatedSession.start_time,
        endTime: updatedSession.end_time,
        durationMinutes: updatedSession.duration_minutes,
        meetingLink: updatedSession.meeting_link,
        status: updatedSession.status,
        notes: updatedSession.notes,
        updatedAt: updatedSession.updated_at,
      });
    }
    
    return cancelledSessions;
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      throw error;
    }
    throw new InternalServerError('Error cancelling sessions');
  }
};

/**
 * Get all mentoring sessions with pagination and filters
 */
export const getAllMentoringSessions = async (
  page: number = 1,
  limit: number = 10,
  filters: any = {}
) => {
  try {
    const skip = (page - 1) * limit;
    
    // Build the where clause
    const where: Prisma.mentoring_sessionsWhereInput = {};
    
    if (filters.status) {
      where.status = filters.status;
    }
    
    if (filters.serviceId) {
      where.service_id = Number(filters.serviceId);
    }
    
    // Handle date range filtering
    if (filters.startDate || filters.endDate) {
      where.start_time = {};
      
      if (filters.startDate) {
        where.start_time.gte = filters.startDate;
      }
      
      if (filters.endDate) {
        where.start_time.lte = filters.endDate;
      }
    }
    
    // Count total records for pagination
    const total = await prisma.mentoring_sessions.count({ where });
    
    // Get sessions with service information
    const sessions = await prisma.mentoring_sessions.findMany({
      where,
      include: {
        service: {
          include: {
            mentor: {
              include: {
                user: {
                  select: {
                    full_name: true,
                    profile_picture: true,
                  },
                },
              },
            },
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        start_time: 'asc',
      },
    });
    
    // Format the response
    const formattedSessions = sessions.map(session => ({
      id: session.id,
      serviceId: session.service_id,
      serviceName: session.service.service_name,
      mentorId: session.service.mentor_id,
      mentorName: session.service.mentor.user.full_name,
      mentorPicture: session.service.mentor.user.profile_picture,
      startTime: session.start_time,
      endTime: session.end_time,
      durationMinutes: session.duration_minutes,
      meetingLink: session.meeting_link,
      status: session.status,
      notes: session.notes,
      createdAt: session.created_at,
      updatedAt: session.updated_at,
    }));
    
    return {
      sessions: formattedSessions,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new InternalServerError('Error fetching mentoring sessions');
  }
};

/**
 * Get mentoring session by ID
 */
export const getMentoringSessionById = async (id: number) => {
  try {
    const session = await prisma.mentoring_sessions.findUnique({
      where: {
        id,
      },
      include: {
        service: {
          include: {
            mentor: {
              include: {
                user: {
                  select: {
                    full_name: true,
                    profile_picture: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        bookings: {
          select: {
            id: true,
            booking_date: true,
            status: true,
            mentee_id: true,
            mentee: {
              select: {
                full_name: true,
                email: true,
                profile_picture: true,
              },
            },
          },
        },
      },
    });
    
    if (!session) {
      throw new NotFoundError('Mentoring session not found');
    }
    
    // Format the response
    return {
      id: session.id,
      serviceId: session.service_id,
      serviceName: session.service.service_name,
      serviceType: session.service.service_type,
      mentorId: session.service.mentor_id,
      mentorName: session.service.mentor.user.full_name,
      mentorEmail: session.service.mentor.user.email,
      mentorPicture: session.service.mentor.user.profile_picture,
      startTime: session.start_time,
      endTime: session.end_time,
      durationMinutes: session.duration_minutes,
      meetingLink: session.meeting_link,
      status: session.status,
      notes: session.notes,
      createdAt: session.created_at,
      updatedAt: session.updated_at,
      bookings: session.bookings.map(booking => ({
        id: booking.id,
        bookingDate: booking.booking_date,
        status: booking.status,
        menteeId: booking.mentee_id,
        menteeName: booking.mentee.full_name,
        menteeEmail: booking.mentee.email,
        menteePicture: booking.mentee.profile_picture,
      })),
    };
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError('Error fetching mentoring session');
  }
};

/**
 * Get mentoring sessions by service ID
 */
export const getMentoringSessionsByServiceId = async (
  serviceId: number,
  page: number = 1,
  limit: number = 10,
  filters: any = {}
) => {
  try {
    const skip = (page - 1) * limit;
    
    // Build the where clause
    const where: Prisma.mentoring_sessionsWhereInput = {
      service_id: serviceId,
    };
    
    if (filters.status) {
      where.status = filters.status;
    }
    
    // Count total records for pagination
    const total = await prisma.mentoring_sessions.count({ where });
    
    // Get sessions
    const sessions = await prisma.mentoring_sessions.findMany({
      where,
      include: {
        bookings: {
          select: {
            id: true,
            status: true,
            mentee_id: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        start_time: 'asc',
      },
    });
    
    // Format the response
    const formattedSessions = sessions.map(session => ({
      id: session.id,
      serviceId: session.service_id,
      startTime: session.start_time,
      endTime: session.end_time,
      durationMinutes: session.duration_minutes,
      meetingLink: session.meeting_link,
      status: session.status,
      notes: session.notes,
      createdAt: session.created_at,
      updatedAt: session.updated_at,
      bookingCount: session.bookings.length,
      hasActiveBookings: session.bookings.some(b => 
        b.status === 'pending' || b.status === 'confirmed' || b.status === 'ongoing'
      ),
    }));
    
    return {
      sessions: formattedSessions,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new InternalServerError('Error fetching sessions for this service');
  }
};

/**
 * Verify service ownership (for mentors)
 */
export const verifyServiceOwnership = async (serviceId: number, userId: number) => {
  try {
    // Get the service with its mentor
    const service = await prisma.mentoring_services.findUnique({
      where: {
        id: serviceId,
      },
      include: {
        mentor: true,
      },
    });
    
    if (!service) {
      throw new NotFoundError('Service not found');
    }
    
    // Get the mentor profile for the user
    const mentorProfile = await prisma.mentor_profiles.findUnique({
      where: {
        user_id: userId,
      },
    });
    
    if (!mentorProfile) {
      return false;
    }
    
    // Check if the mentor owns the service
    return service.mentor_id === mentorProfile.id;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError('Error verifying service ownership');
  }
};

/**
 * Check if session has active bookings
 */
export const sessionHasActiveBookings = async (sessionId: number) => {
  try {
    const bookings = await prisma.bookings.findMany({
      where: {
        session_id: sessionId,
        status: {
          in: ['pending', 'confirmed', 'ongoing'],
        },
      },
    });
    
    return bookings.length > 0;
  } catch (error) {
    throw new InternalServerError('Error checking session bookings');
  }
};

/**
 * Calculate session duration in minutes
 */
const calculateDuration = (startTime: Date, endTime: Date) => {
  const durationMs = endTime.getTime() - startTime.getTime();
  return Math.round(durationMs / (1000 * 60)); // Convert ms to minutes
};

/**
 * Validate session time
 */
const validateSessionTime = (startTime: Date, endTime: Date) => {
  // Check if end time is after start time
  if (endTime <= startTime) {
    throw new BadRequestError('End time must be after start time');
  }
  
  // Check if start time is in the future
  if (startTime <= new Date()) {
    throw new BadRequestError('Start time must be in the future');
  }
  
  // Check if session duration is reasonable (e.g., between 15 minutes and 8 hours)
  const duration = calculateDuration(startTime, endTime);
  if (duration < 15) {
    throw new BadRequestError('Session duration must be at least 15 minutes');
  }
  if (duration > 480) {
    throw new BadRequestError('Session duration cannot exceed 8 hours');
  }
};

/**
 * Check for scheduling conflicts
 */
const checkSchedulingConflicts = async (
  serviceId: number,
  startTime: Date,
  endTime: Date,
  excludeSessionId?: number
) => {
  const where: Prisma.mentoring_sessionsWhereInput = {
    service_id: serviceId,
    OR: [
      {
        // New session starts during an existing session
        start_time: { lte: startTime },
        end_time: { gt: startTime },
      },
      {
        // New session ends during an existing session
        start_time: { lt: endTime },
        end_time: { gte: endTime },
      },
      {
        // New session contains an existing session
        start_time: { gte: startTime },
        end_time: { lte: endTime },
      },
    ],
  };
  
  // Exclude the current session if updating
  if (excludeSessionId) {
    where.id = { not: excludeSessionId };
  }
  
  const conflictingSessions = await prisma.mentoring_sessions.findMany({
    where,
  });
  
  if (conflictingSessions.length > 0) {
    throw new BadRequestError('This time slot conflicts with an existing session');
  }
};

/**
 * Create new mentoring session
 */
export const createMentoringSession = async (
  data: MentoringSessionCreate
): Promise<SessionResponse> => {
  try {
    // Check if service exists
    const service = await prisma.mentoring_services.findUnique({
      where: {
        id: data.serviceId,
      },
    });
    
    if (!service) {
      throw new NotFoundError('Mentoring service not found');
    }
    
    // Validate session times
    validateSessionTime(data.startTime, data.endTime);
    
    // Check for scheduling conflicts
    await checkSchedulingConflicts(data.serviceId, data.startTime, data.endTime);
    
    // Generate a unique ID for the new session (Unix timestamp)
    const newId = Math.floor(Date.now() / 1000);
    
    // Create new session
    const newSession = await prisma.mentoring_sessions.create({
      data: {
        id: newId,
        service_id: data.serviceId,
        start_time: data.startTime,
        end_time: data.endTime,
        duration_minutes: data.durationMinutes || calculateDuration(data.startTime, data.endTime),
        meeting_link: data.meetingLink,
        status: data.status || 'scheduled',
        notes: data.notes,
      },
    });
    
    return {
      id: newSession.id,
      serviceId: newSession.service_id,
      startTime: newSession.start_time,
      endTime: newSession.end_time,
      durationMinutes: newSession.duration_minutes,
      meetingLink: newSession.meeting_link,
      status: newSession.status,
      notes: newSession.notes,
      createdAt: newSession.created_at,
    };
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      throw error;
    }
    throw new InternalServerError('Error creating mentoring session');
  }
};

/**
 * Update mentoring session
 */
export const updateMentoringSession = async (
  id: number,
  data: MentoringSessionUpdate
) => {
  try {
    // Check if session exists
    const existingSession = await prisma.mentoring_sessions.findUnique({
      where: {
        id,
      },
    });
    
    if (!existingSession) {
      throw new NotFoundError('Mentoring session not found');
    }
    
    // Check if session has active bookings
    const hasActiveBookings = await sessionHasActiveBookings(id);
    if (hasActiveBookings && (data.startTime || data.endTime)) {
      throw new BadRequestError('Cannot reschedule a session with active bookings');
    }
    
    // If updating times, validate them
    let startTime = existingSession.start_time;
    let endTime = existingSession.end_time;
    
    if (data.startTime) startTime = data.startTime;
    if (data.endTime) endTime = data.endTime;
    
    if (data.startTime || data.endTime) {
      validateSessionTime(startTime, endTime);
      await checkSchedulingConflicts(existingSession.service_id, startTime, endTime, id);
    }
    
    // Calculate duration if necessary
    let durationMinutes = data.durationMinutes;
    if (!durationMinutes && (data.startTime || data.endTime)) {
      durationMinutes = calculateDuration(startTime, endTime);
    }
    
    // Update session
    const updatedSession = await prisma.mentoring_sessions.update({
      where: {
        id,
      },
      data: {
        start_time: data.startTime,
        end_time: data.endTime,
        duration_minutes: durationMinutes,
        meeting_link: data.meetingLink,
        status: data.status,
        notes: data.notes,
        updated_at: new Date(),
      },
    });
    
    return {
      id: updatedSession.id,
      serviceId: updatedSession.service_id,
      startTime: updatedSession.start_time,
      endTime: updatedSession.end_time,
      durationMinutes: updatedSession.duration_minutes,
      meetingLink: updatedSession.meeting_link,
      status: updatedSession.status,
      notes: updatedSession.notes,
      updatedAt: updatedSession.updated_at,
    };
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      throw error;
    }
    throw new InternalServerError('Error updating mentoring session');
  }
};

export async function updateSessionStatus(sessionId: number, status: string) {
  try {
    // Periksa apakah sesi ada
    const existingSession = await prisma.mentoring_sessions.findUnique({
      where: {
        id: sessionId,
      },
    });
    
    if (!existingSession) {
      throw new NotFoundError('Sesi mentoring tidak ditemukan');
    }
    
    // Validasi nilai status
    const validStatuses = ['scheduled', 'ongoing', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestError(`Status harus salah satu dari: ${validStatuses.join(', ')}`);
    }
    
    // Update status sesi
    const updatedSession = await prisma.mentoring_sessions.update({
      where: {
        id: sessionId,
      },
      data: {
        status,
        updated_at: new Date(),
      },
    });
    
    return {
      id: updatedSession.id,
      serviceId: updatedSession.service_id,
      status: updatedSession.status,
      updatedAt: updatedSession.updated_at,
    };
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      throw error;
    }
    throw new InternalServerError('Error updating session status');
  }
}

export async function deleteMentoringSession(sessionId: number) {
  try {
    // Periksa apakah sesi ada
    const existingSession = await prisma.mentoring_sessions.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        bookings: true,
      },
    });
    
    if (!existingSession) {
      throw new NotFoundError('Sesi mentoring tidak ditemukan');
    }
    
    // Periksa apakah sesi memiliki booking aktif
    const hasActiveBookings = existingSession.bookings.some(
      booking => booking.status === 'pending' || booking.status === 'confirmed' || booking.status === 'ongoing'
    );
    
    if (hasActiveBookings) {
      throw new BadRequestError('Tidak dapat menghapus sesi dengan booking aktif');
    }
    
    // Hapus sesi
    await prisma.mentoring_sessions.delete({
      where: {
        id: sessionId,
      },
    });
    
    return true;
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      throw error;
    }
    throw new InternalServerError('Error menghapus sesi mentoring');
  }
}
