import { PrismaClient, Prisma } from '@prisma/client';
import { NotFoundError, InternalServerError, BadRequestError } from '../utils/errorTypes';
import prisma from '../config/prisma';

export interface MentoringServiceCreate {
  mentorId: number;
  serviceName: string;
  description?: string;
  price: number;
  serviceType?: string;
  maxParticipants?: number;
  durationDays: number;
  isActive?: boolean;
}

export interface MentoringServiceUpdate {
  serviceName?: string;
  description?: string;
  price?: number;
  serviceType?: string;
  maxParticipants?: number;
  durationDays?: number;
  isActive?: boolean;
}

export const searchMentoringServices = async (
  searchQuery?: string,
  filters: any = {},
  sortOptions: { field: string; direction: 'asc' | 'desc' } = { field: 'created_at', direction: 'desc' },
  page: number = 1,
  limit: number = 10
) => {
  try {
    const skip = (page - 1) * limit;
    
    // Build the where clause
    const where: Prisma.MentoringServiceWhereInput = {};
    
    // Text search in name and description
    if (searchQuery) {
      where.OR = [
        { service_name: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
      ];
    }
    
    // Price range
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      where.price = {};
      
      if (filters.priceMin !== undefined) {
        where.price.gte = new Prisma.Decimal(filters.priceMin);
      }
      
      if (filters.priceMax !== undefined) {
        where.price.lte = new Prisma.Decimal(filters.priceMax);
      }
    }
    
    // Service type
    if (filters.serviceType) {
      where.service_type = filters.serviceType;
    }
    
    // Duration range
    if (filters.durationMin !== undefined || filters.durationMax !== undefined) {
      where.duration_days = {};
      
      if (filters.durationMin !== undefined) {
        where.duration_days.gte = filters.durationMin;
      }
      
      if (filters.durationMax !== undefined) {
        where.duration_days.lte = filters.durationMax;
      }
    }
    
    // Filter by mentor
    if (filters.mentorId) {
      where.mentor_id = filters.mentorId;
    }
    
    // Active status
    if (filters.isActive !== undefined) {
      where.is_active = filters.isActive;
    }
    
    // Validate and map sort field
    const sortFieldMap: Record<string, string> = {
      'price': 'price',
      'duration': 'duration_days',
      'name': 'service_name',
      'created': 'created_at',
      'created_at': 'created_at'
    };
    
    const sortField = sortFieldMap[sortOptions.field] || 'created_at';
    const sortDirection = sortOptions.direction === 'asc' ? 'asc' : 'desc';
    
    // Count total records for pagination
    const total = await prisma.mentoringService.count({ where });
    
    // Get services with mentor information
    const services = await prisma.mentoringService.findMany({
      where,
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
        sessions: {
          where: {
            start_time: { gte: new Date() },
            status: 'scheduled'
          },
          orderBy: {
            start_time: 'asc'
          },
          take: 3, // Just get the next 3 upcoming sessions
          include: {
            _count: {
              select: {
                bookings: true
              }
            }
          }
        }
      },
      skip,
      take: limit,
      orderBy: {
        [sortField]: sortDirection,
      },
    });
    
    // Format the response for client consumption
    const formattedServices = services.map(service => ({
      id: service.id,
      mentorId: service.mentor_id,
      mentorName: service.mentor.user.full_name,
      mentorPicture: service.mentor.user.profile_picture,
      expertise: service.mentor.expertise,
      serviceName: service.service_name,
      description: service.description,
      price: service.price,
      serviceType: service.service_type,
      maxParticipants: service.max_participants,
      durationDays: service.duration_days,
      isActive: service.is_active,
      upcomingSessions: service.sessions.map(session => ({
        id: session.id,
        startTime: session.start_time,
        endTime: session.end_time,
        availableSlots: service.max_participants 
          ? (service.max_participants - (session._count?.bookings || 0)) 
          : null
      })),
      createdAt: service.created_at,
      updatedAt: service.updated_at,
    }));
    
    return {
      services: formattedServices,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
      filters: {
        applied: Object.keys(filters).length > 0 || !!searchQuery,
        available: {
          serviceTypes: await getDistinctServiceTypes(),
          priceRange: await getPriceRange(),
          durationRange: await getDurationRange()
        }
      }
    };
  } catch (error) {
    throw new InternalServerError('Error searching mentoring services');
  }
};

/**
 * Get distinct service types for filters
 */
const getDistinctServiceTypes = async () => {
  const types = await prisma.mentoringService.findMany({
    select: {
      service_type: true
    },
    distinct: ['service_type']
  });
  
  return types.map(t => t.service_type).filter(Boolean);
};

/**
 * Get price range for filters
 */
const getPriceRange = async () => {
  const minPrice = await prisma.mentoringService.findFirst({
    select: { price: true },
    orderBy: { price: 'asc' }
  });
  
  const maxPrice = await prisma.mentoringService.findFirst({
    select: { price: true },
    orderBy: { price: 'desc' }
  });
  
  return {
    min: minPrice?.price || new Prisma.Decimal(0),
    max: maxPrice?.price || new Prisma.Decimal(0)
  };
};

/**
 * Get duration range for filters
 */
const getDurationRange = async () => {
  const minDuration = await prisma.mentoringService.findFirst({
    select: { duration_days: true },
    orderBy: { duration_days: 'asc' }
  });
  
  const maxDuration = await prisma.mentoringService.findFirst({
    select: { duration_days: true },
    orderBy: { duration_days: 'desc' }
  });
  
  return {
    min: minDuration?.duration_days || 0,
    max: maxDuration?.duration_days || 0
  };
};

/**
 * Get mentor profile by user ID
 */
export const getMentorProfileByUserId = async (userId: number) => {
  try {
    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!mentorProfile) {
      throw new NotFoundError('Mentor profile not found');
    }

    return mentorProfile;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError('Error fetching mentor profile');
  }
};

/**
 * Get all mentoring services with pagination and filters
 */
export const getAllMentoringServices = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  filters: any = {}
) => {
  try {
    const skip = (page - 1) * limit;
    
    // Build the where clause
    const where: Prisma.MentoringServiceWhereInput = {
      ...filters,
    };
    
    // Add search condition if provided
    if (search) {
      where.OR = [
        { service_name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    // Count total records for pagination
    const total = await prisma.mentoringService.count({ where });
    
    // Get services with mentor information
    const services = await prisma.mentoringService.findMany({
      where,
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
      skip,
      take: limit,
      orderBy: {
        created_at: 'desc',
      },
    });
    
    // Format the response for client consumption
    const formattedServices = services.map(service => ({
      id: service.id,
      mentorId: service.mentor_id,
      mentorName: service.mentor.user.full_name,
      mentorPicture: service.mentor.user.profile_picture,
      serviceName: service.service_name,
      description: service.description,
      price: service.price,
      serviceType: service.service_type,
      maxParticipants: service.max_participants,
      durationDays: service.duration_days,
      isActive: service.is_active,
      createdAt: service.created_at,
      updatedAt: service.updated_at,
    }));
    
    return {
      services: formattedServices,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new InternalServerError('Error fetching mentoring services');
  }
};

/**
 * Get mentoring service by ID
 */
export const getMentoringServiceById = async (id: number) => {
  try {
    const service = await prisma.mentoringService.findUnique({
      where: {
        id,
      },
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
        sessions: true,
      },
    });
    
    if (!service) {
      throw new NotFoundError('Mentoring service not found');
    }
    
    // Format the response
    return {
      id: service.id,
      mentorId: service.mentor_id,
      mentorName: service.mentor.user.full_name,
      mentorEmail: service.mentor.user.email,
      mentorPicture: service.mentor.user.profile_picture,
      mentorExpertise: service.mentor.expertise,
      serviceName: service.service_name,
      description: service.description,
      price: service.price,
      serviceType: service.service_type,
      maxParticipants: service.max_participants,
      durationDays: service.duration_days,
      isActive: service.is_active,
      createdAt: service.created_at,
      updatedAt: service.updated_at,
      sessions: service.sessions.map(session => ({
        id: session.id,
        startTime: session.start_time,
        endTime: session.end_time,
        durationMinutes: session.duration_minutes,
        meetingLink: session.meeting_link,
        status: session.status,
      })),
    };
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError('Error fetching mentoring service');
  }
};

/**
 * Get mentoring services by mentor ID
 */
export const getMentoringServicesByMentorId = async (
  mentorId: number,
  page: number = 1,
  limit: number = 10,
  filters: any = {}
) => {
  try {
    const skip = (page - 1) * limit;
    
    // Build the where clause
    const where: Prisma.MentoringServiceWhereInput = {
      mentor_id: mentorId,
      ...filters,
    };
    
    // Count total records for pagination
    const total = await prisma.mentoringService.count({ where });
    
    // Get services
    const services = await prisma.mentoringService.findMany({
      where,
      include: {
        sessions: {
          orderBy: {
            start_time: 'asc',
          },
          where: {
            start_time: {
              gte: new Date(),
            },
          },
          take: 5,  // Show only a few upcoming sessions
        },
      },
      skip,
      take: limit,
      orderBy: {
        created_at: 'desc',
      },
    });
    
    // Format the response
    const formattedServices = services.map(service => ({
      id: service.id,
      mentorId: service.mentor_id,
      serviceName: service.service_name,
      description: service.description,
      price: service.price,
      serviceType: service.service_type,
      maxParticipants: service.max_participants,
      durationDays: service.duration_days,
      isActive: service.is_active,
      createdAt: service.created_at,
      updatedAt: service.updated_at,
      upcomingSessions: service.sessions.map(session => ({
        id: session.id,
        startTime: session.start_time,
        endTime: session.end_time,
        status: session.status,
      })),
    }));
    
    return {
      services: formattedServices,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new InternalServerError('Error fetching mentor services');
  }
};

/**
 * Create new mentoring service
 */
export const createMentoringService = async (data: MentoringServiceCreate) => {
  try {
    // Check if mentor exists
    const mentor = await prisma.mentorProfile.findUnique({
      where: {
        id: data.mentorId,
      },
    });
    
    if (!mentor) {
      throw new NotFoundError('Mentor not found');
    }
    
    // Generate a unique ID for the new service (Unix timestamp)
    const newId = Math.floor(Date.now() / 1000);
    
    // Create new service
    const newService = await prisma.mentoringService.create({
      data: {
        id: newId,
        mentor_id: data.mentorId,
        service_name: data.serviceName,
        description: data.description,
        price: new Prisma.Decimal(data.price),
        service_type: data.serviceType,
        max_participants: data.maxParticipants,
        duration_days: data.durationDays,
        is_active: data.isActive ?? true,
      },
    });
    
    return {
      id: newService.id,
      mentorId: newService.mentor_id,
      serviceName: newService.service_name,
      description: newService.description,
      price: newService.price,
      serviceType: newService.service_type,
      maxParticipants: newService.max_participants,
      durationDays: newService.duration_days,
      isActive: newService.is_active,
      createdAt: newService.created_at,
    };
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError('Error creating mentoring service');
  }
};

/**
 * Update mentoring service
 */
export const updateMentoringService = async (
  id: number,
  data: MentoringServiceUpdate
) => {
  try {
    // Check if service exists
    const existingService = await prisma.mentoringService.findUnique({
      where: {
        id,
      },
    });
    
    if (!existingService) {
      throw new NotFoundError('Mentoring service not found');
    }
    
    // Update service
    const updatedService = await prisma.mentoringService.update({
      where: {
        id,
      },
      data: {
        service_name: data.serviceName,
        description: data.description,
        price: data.price !== undefined ? new Prisma.Decimal(data.price) : undefined,
        service_type: data.serviceType,
        max_participants: data.maxParticipants,
        duration_days: data.durationDays,
        is_active: data.isActive,
        updated_at: new Date(),
      },
    });
    
    return {
      id: updatedService.id,
      mentorId: updatedService.mentor_id,
      serviceName: updatedService.service_name,
      description: updatedService.description,
      price: updatedService.price,
      serviceType: updatedService.service_type,
      maxParticipants: updatedService.max_participants,
      durationDays: updatedService.duration_days,
      isActive: updatedService.is_active,
      createdAt: updatedService.created_at,
      updatedAt: updatedService.updated_at,
    };
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError('Error updating mentoring service');
  }
};

/**
 * Toggle service active status
 */
export const toggleServiceStatus = async (id: number) => {
  try {
    // Check if service exists
    const existingService = await prisma.mentoringService.findUnique({
      where: {
        id,
      },
    });
    
    if (!existingService) {
      throw new NotFoundError('Mentoring service not found');
    }
    
    // Toggle status
    const updatedService = await prisma.mentoringService.update({
      where: {
        id,
      },
      data: {
        is_active: !existingService.is_active,
        updated_at: new Date(),
      },
    });
    
    return {
      id: updatedService.id,
      mentorId: updatedService.mentor_id,
      serviceName: updatedService.service_name,
      is_active: updatedService.is_active,
      updatedAt: updatedService.updated_at,
    };
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError('Error toggling service status');
  }
};

/**
 * Delete mentoring service
 */
export const deleteMentoringService = async (id: number) => {
  try {
    // Check if service exists
    const existingService = await prisma.mentoringService.findUnique({
      where: {
        id,
      },
      include: {
        sessions: true,
      },
    });
    
    if (!existingService) {
      throw new NotFoundError('Mentoring service not found');
    }
    
    // Check if service has active sessions
    const hasActiveSessions = existingService.sessions.some(
      session => session.status === 'scheduled' || session.status === 'ongoing'
    );
    
    if (hasActiveSessions) {
      throw new BadRequestError('Cannot delete service with active sessions');
    }
    
    // Delete service
    await prisma.mentoringService.delete({
      where: {
        id,
      },
    });
    
    return true;
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      throw error;
    }
    throw new InternalServerError('Error deleting mentoring service');
  }
};

