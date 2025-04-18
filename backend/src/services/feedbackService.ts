// backend/src/services/feedbackService.ts
import { PrismaClient } from '@prisma/client';
import { NotFoundError, BadRequestError } from '../utils/errorTypes';

const prisma = new PrismaClient();

/**
 * Interface for feedback creation
 */
interface FeedbackCreateInput {
  session_id: number;
  user_id: number;
  rating: number;
  comment?: string;
}

/**
 * Interface for feedback update
 */
interface FeedbackUpdateInput {
  rating?: number;
  comment?: string;
}

/**
 * Create a new feedback entry
 */
export const createFeedback = async (data: FeedbackCreateInput) => {
  // Check if user has already provided feedback for this session
  const existingFeedback = await prisma.feedback.findFirst({
    where: {
      session_id: data.session_id,
      user_id: data.user_id,
    },
  });

  if (existingFeedback) {
    throw new BadRequestError('You have already provided feedback for this session');
  }

  // Check if the session exists
  const session = await prisma.mentoringSession.findUnique({
    where: { id: data.session_id },
  });

  if (!session) {
    throw new NotFoundError('Mentoring session not found');
  }

  // Check if the user is a participant in this session
  const booking = await prisma.booking.findFirst({
    where: {
      session_id: data.session_id,
      mentee_id: data.user_id,
    },
  });

  if (!booking) {
    throw new BadRequestError('You can only provide feedback for sessions you have participated in');
  }

  // Check if the session is completed
  if (session.status !== 'completed') {
    throw new BadRequestError('You can only provide feedback for completed sessions');
  }

  // Check if rating is within valid range
  if (data.rating < 1 || data.rating > 5) {
    throw new BadRequestError('Rating must be between 1 and 5');
  }

  // Get the latest feedback ID
  const latestFeedback = await prisma.feedback.findFirst({
    orderBy: {
      id: 'desc',
    },
  });

  const newId = latestFeedback ? latestFeedback.id + 1 : 1;

  // Create the feedback
  const newFeedback = await prisma.feedback.create({
    data: {
      id: newId,
      session_id: data.session_id,
      user_id: data.user_id,
      rating: data.rating,
      comment: data.comment || null,
      submitted_date: new Date(),
      created_at: new Date(),
    },
  });

  return newFeedback;
};

/**
 * Get all feedback with pagination
 */
export const getAllFeedback = async (page: number = 1, limit: number = 10, sessionId?: number) => {
  const skip = (page - 1) * limit;

  const whereClause = sessionId ? { session_id: sessionId } : {};

  const [feedback, total] = await Promise.all([
    prisma.feedback.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            full_name: true,
            profile_picture: true,
          },
        },
        session: {
          select: {
            id: true,
            start_time: true,
            service: {
              select: {
                id: true,
                service_name: true,
                mentor: {
                  select: {
                    id: true,
                    user: {
                      select: {
                        id: true,
                        full_name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        submitted_date: 'desc',
      },
      skip,
      take: limit,
    }),
    prisma.feedback.count({
      where: whereClause,
    }),
  ]);

  return {
    data: feedback,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get feedback by ID
 */
export const getFeedbackById = async (id: number) => {
  const feedback = await prisma.feedback.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          full_name: true,
          profile_picture: true,
        },
      },
      session: {
        select: {
          id: true,
          start_time: true,
          service: {
            select: {
              id: true,
              service_name: true,
              mentor: {
                select: {
                  id: true,
                  user: {
                    select: {
                      id: true,
                      full_name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!feedback) {
    throw new NotFoundError('Feedback not found');
  }

  return feedback;
};

/**
 * Update feedback
 */
export const updateFeedback = async (id: number, data: FeedbackUpdateInput) => {
  // Check if feedback exists
  const existingFeedback = await prisma.feedback.findUnique({
    where: { id },
  });

  if (!existingFeedback) {
    throw new NotFoundError('Feedback not found');
  }

  // Check if rating is within valid range
  if (data.rating !== undefined && (data.rating < 1 || data.rating > 5)) {
    throw new BadRequestError('Rating must be between 1 and 5');
  }

  // Update the feedback
  const updatedFeedback = await prisma.feedback.update({
    where: { id },
    data: {
      rating: data.rating,
      comment: data.comment,
    },
    include: {
      user: {
        select: {
          id: true,
          full_name: true,
          profile_picture: true,
        },
      },
      session: {
        select: {
          id: true,
          service: {
            select: {
              mentor: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return updatedFeedback;
};

/**
 * Delete feedback
 */
export const deleteFeedback = async (id: number) => {
  // Check if feedback exists
  const existingFeedback = await prisma.feedback.findUnique({
    where: { id },
  });

  if (!existingFeedback) {
    throw new NotFoundError('Feedback not found');
  }

  // Delete the feedback
  await prisma.feedback.delete({
    where: { id },
  });

  return true;
};

/**
 * Get feedback by session ID with pagination
 */
export const getFeedbackBySession = async (sessionId: number, page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  // Check if session exists
  const session = await prisma.mentoringSession.findUnique({
    where: { id: sessionId },
  });

  if (!session) {
    throw new NotFoundError('Mentoring session not found');
  }

  const [feedback, total] = await Promise.all([
    prisma.feedback.findMany({
      where: {
        session_id: sessionId,
      },
      include: {
        user: {
          select: {
            id: true,
            full_name: true,
            profile_picture: true,
          },
        },
      },
      orderBy: {
        submitted_date: 'desc',
      },
      skip,
      take: limit,
    }),
    prisma.feedback.count({
      where: {
        session_id: sessionId,
      },
    }),
  ]);

  // Calculate average rating
  const avgRating = feedback.length > 0
    ? feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length
    : 0;

  return {
    data: feedback,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    statistics: {
      averageRating: parseFloat(avgRating.toFixed(1)),
      totalReviews: total,
    },
  };
};

/**
 * Get average rating for a mentor
 */
export const getMentorAverageRating = async (mentorId: number) => {
  // Check if mentor exists
  const mentor = await prisma.mentorProfile.findUnique({
    where: { id: mentorId },
  });

  if (!mentor) {
    throw new NotFoundError('Mentor not found');
  }

  // Get all services by this mentor
  const mentorServices = await prisma.mentoringService.findMany({
    where: {
      mentor_id: mentorId,
    },
    select: {
      id: true,
    },
  });

  const serviceIds = mentorServices.map(service => service.id);

  // Get all sessions for these services
  const sessions = await prisma.mentoringSession.findMany({
    where: {
      service_id: {
        in: serviceIds,
      },
    },
    select: {
      id: true,
    },
  });

  const sessionIds = sessions.map(session => session.id);

  // Get all feedback for these sessions
  const feedback = await prisma.feedback.findMany({
    where: {
      session_id: {
        in: sessionIds,
      },
    },
  });

  // Calculate statistics
  const totalFeedback = feedback.length;
  const averageRating = totalFeedback > 0
    ? feedback.reduce((sum, item) => sum + item.rating, 0) / totalFeedback
    : 0;

  // Calculate rating distribution
  const ratingDistribution = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  feedback.forEach(item => {
    ratingDistribution[item.rating as keyof typeof ratingDistribution]++;
  });

  return {
    mentorId,
    statistics: {
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalReviews: totalFeedback,
      ratingDistribution,
    },
  };
};

/**
 * Get feedback for a mentor with pagination
 */
export const getMentorFeedback = async (mentorId: number, page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  // Check if mentor exists
  const mentor = await prisma.mentorProfile.findUnique({
    where: { id: mentorId },
    include: {
      user: {
        select: {
          id: true,
          full_name: true,
          profile_picture: true,
        },
      },
    },
  });

  if (!mentor) {
    throw new NotFoundError('Mentor not found');
  }

  // Get all services by this mentor
  const mentorServices = await prisma.mentoringService.findMany({
    where: {
      mentor_id: mentorId,
    },
    select: {
      id: true,
    },
  });

  const serviceIds = mentorServices.map(service => service.id);

  // Get all sessions for these services
  const sessions = await prisma.mentoringSession.findMany({
    where: {
      service_id: {
        in: serviceIds,
      },
    },
    select: {
      id: true,
    },
  });

  const sessionIds = sessions.map(session => session.id);

  // Count total feedback
  const totalFeedback = await prisma.feedback.count({
    where: {
      session_id: {
        in: sessionIds,
      },
    },
  });

  // Get paginated feedback
  const feedback = await prisma.feedback.findMany({
    where: {
      session_id: {
        in: sessionIds,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          full_name: true,
          profile_picture: true,
        },
      },
      session: {
        select: {
          id: true,
          start_time: true,
          service: {
            select: {
              id: true,
              service_name: true,
            },
          },
        },
      },
    },
    orderBy: {
      submitted_date: 'desc',
    },
    skip,
    take: limit,
  });

  // Calculate average rating
  const allFeedback = await prisma.feedback.findMany({
    where: {
      session_id: {
        in: sessionIds,
      },
    },
    select: {
      rating: true,
    },
  });

  const avgRating = allFeedback.length > 0
    ? allFeedback.reduce((sum, item) => sum + item.rating, 0) / allFeedback.length
    : 0;

  // Calculate rating distribution
  const ratingDistribution = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  allFeedback.forEach(item => {
    ratingDistribution[item.rating as keyof typeof ratingDistribution]++;
  });

  return {
    mentor: {
      id: mentor.id,
      fullName: mentor.user.full_name,
      profilePicture: mentor.user.profile_picture,
    },
    data: feedback,
    pagination: {
      total: totalFeedback,
      page,
      limit,
      totalPages: Math.ceil(totalFeedback / limit),
    },
    statistics: {
      averageRating: parseFloat(avgRating.toFixed(1)),
      totalReviews: totalFeedback,
      ratingDistribution,
    },
  };
};