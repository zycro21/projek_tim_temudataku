import { PrismaClient, Prisma } from '@prisma/client';
import { NotFoundError, BadRequestError, InternalServerError } from '../utils/errorTypes';
import prisma from '../config/prisma';

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
    const where: Prisma.MentoringSessionWhereInput = {};
    
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
    const total = await prisma.mentoringSession.count({ where });
    
    // Get sessions with service information
    const sessions = await prisma.mentoringSession.findMany({
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
    const session = await prisma.mentoringSession.findUnique({
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
    const where: Prisma.MentoringSessionWhereInput = {
      service_id: serviceId,
    };
    
    if (filters.status) {
      where.status = filters.status;
    }
    
    // Count total records for pagination
    const total = await prisma.mentoringSession.count({ where });
    
    // Get sessions
    const sessions = await prisma.mentoringSession.findMany({
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
    const service = await prisma.mentoringService.findUnique({
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
    const mentorProfile = await prisma.mentorProfile.findUnique({
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
    const bookings = await prisma.booking.findMany({
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
  const where: Prisma.MentoringSessionWhereInput = {
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
  
  const conflictingSessions = await prisma.mentoringSession.findMany({
    where,
  });
  
  if (conflictingSessions.length > 0) {
    throw new BadRequestError('This time slot conflicts with an existing session');
  }
};

/**
 * Create new mentoring session
 */
export const createMentoringSession = async (data: MentoringSessionCreate) => {
  try {
    // Check if service exists
    const service = await prisma.mentoringService.findUnique({
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
    const newSession = await prisma.mentoringSession.create({
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
    const existingSession = await prisma.mentoringSession.findUnique({
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
    const updatedSession = await prisma.mentoringSession.update({
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

/**
 * Update session status
 */
export const updateSessionStatus = async (id: number, status: string) => {
  try {
    // Check if session exists
    const existingSession = await prisma.mentoringSession.findUnique({
      where: {
        id,
      },
    });
    
    if (!existingSession) {
      throw new NotFoundError('Mentoring session not found');
    }
    
    // Validate status value
    const validStatuses = ['scheduled', 'ongoing', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestError(`Status must be one of: ${validStatuses.join(', ')}`);
    }
    
    // Update session status
    const updatedSession = await prisma.mentoringSession.update({
      where: {
        id,
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
};

/**
 * Delete mentoring session
 */
export const deleteMentoringSession = async (id: number) => {
  try {
    // Check if session exists
    const existingSession = await prisma.mentoringSession.findUnique({
      where: {
        id,
      },
      include: {
        bookings: true,
      },
    });
    
    if (!existingSession) {
      throw new NotFoundError('Mentoring session not found');
    }
    
    // Check if session has active bookings
    const hasActiveBookings = existingSession.bookings.some(
      booking => booking.status === 'pending' || booking.status === 'confirmed' || booking.status === 'ongoing'
    );
    
    if (hasActiveBookings) {
      throw new BadRequestError('Cannot delete a session with active bookings');
    }
    
    // Delete session
    await prisma.mentoringSession.delete({
      where: {
        id,
      },
    });
    
    return true;
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      throw error;
    }
    throw new InternalServerError('Error deleting mentoring session');
  }
};