// 2. Service - src/services/mentorProfileService.ts
import { PrismaClient, Prisma } from '@prisma/client';
import { NotFoundError, BadRequestError, InternalServerError } from '../utils/errorTypes';

const prisma = new PrismaClient();

export interface MentorProfileData {
  id?: number;
  user_id: number;
  expertise?: string | null;
  bio?: string | null;
  experience?: string | null;
  availability_schedule?: any | null;
  hourly_rate?: number | null;
  is_verified?: boolean;
}

export const mentorProfileService = {
  async createMentorProfile(data: MentorProfileData) {
    try {
      console.log('Creating mentor profile with data:', JSON.stringify(data));
      
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: data.user_id },
      });

      if (!user) {
        throw new NotFoundError('User not found');
      }

      // Check if mentor profile already exists for this user
      const existingProfile = await prisma.mentorProfile.findUnique({
        where: { user_id: data.user_id },
      });

      if (existingProfile) {
        throw new BadRequestError('Mentor profile already exists for this user');
      }

      // Generate a unique numeric ID if none provided
      const profileId = data.id || Math.floor(Date.now() / 1000);
      
      // Convert hourly_rate to string for Decimal type
      const hourlyRateStr = data.hourly_rate !== undefined && data.hourly_rate !== null
        ? data.hourly_rate.toString()
        : null;

      // Create mentor profile
      const mentorProfile = await prisma.mentorProfile.create({
        data: {
          id: profileId,
          user_id: data.user_id,
          expertise: data.expertise || null,
          bio: data.bio || null,
          experience: data.experience || null,
          availability_schedule: data.availability_schedule || null,
          hourly_rate: hourlyRateStr,
          is_verified: data.is_verified === true ? true : false,
          created_at: new Date(),
        },
      });

      console.log('Mentor profile created successfully:', mentorProfile);
      return mentorProfile;
    } catch (error) {
      console.error('Error in createMentorProfile:', error);
      if (error instanceof NotFoundError || error instanceof BadRequestError) {
        throw error;
      }
      throw new InternalServerError('Error creating mentor profile');
    }
  },

  async getMentorProfileById(id: number) {
    try {
      console.log(`Getting mentor profile by ID: ${id}`);
      
      if (isNaN(id) || id <= 0) {
        throw new BadRequestError('Invalid mentor profile ID');
      }

      const mentorProfile = await prisma.mentorProfile.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              full_name: true,
              email: true,
              profile_picture: true,
              city: true,
              province: true,
            },
          },
          mentoring_services: true,
        },
      });

      if (!mentorProfile) {
        throw new NotFoundError('Mentor profile not found');
      }

      return mentorProfile;
    } catch (error) {
      console.error('Error in getMentorProfileById:', error);
      if (error instanceof NotFoundError || error instanceof BadRequestError) {
        throw error;
      }
      throw new InternalServerError('Error fetching mentor profile');
    }
  },

  async getMentorProfileByUserId(userId: number) {
    try {
      console.log(`Getting mentor profile by user ID: ${userId}`);
      
      if (isNaN(userId) || userId <= 0) {
        throw new BadRequestError('Invalid user ID');
      }

      const mentorProfile = await prisma.mentorProfile.findUnique({
        where: { user_id: userId },
        include: {
          user: {
            select: {
              id: true,
              full_name: true,
              email: true,
              profile_picture: true,
              city: true,
              province: true,
            },
          },
          mentoring_services: true,
        },
      });

      if (!mentorProfile) {
        throw new NotFoundError(`Mentor profile not found for user ID: ${userId}`);
      }

      return mentorProfile;
    } catch (error) {
      console.error('Error in getMentorProfileByUserId:', error);
      if (error instanceof NotFoundError || error instanceof BadRequestError) {
        throw error;
      }
      throw new InternalServerError('Error fetching mentor profile');
    }
  },
  
  async getAllMentorProfiles(page: number = 1, limit: number = 10, verified?: boolean) {
    try {
      console.log(`Getting all mentor profiles - page: ${page}, limit: ${limit}, verified: ${verified}`);
      
      // Validate pagination parameters
      if (isNaN(page) || page < 1) page = 1;
      if (isNaN(limit) || limit < 1) limit = 10;
      
      const skip = (page - 1) * limit;
      
      const whereClause: any = {};
      if (verified !== undefined) {
        whereClause.is_verified = verified;
      }

      console.log('Using where clause:', whereClause);

      const [mentorProfiles, total] = await Promise.all([
        prisma.mentorProfile.findMany({
          where: whereClause,
          include: {
            user: {
              select: {
                id: true,
                full_name: true,
                email: true,
                profile_picture: true,
                city: true,
                province: true,
              },
            },
          },
          skip,
          take: limit,
          orderBy: { created_at: 'desc' },
        }),
        prisma.mentorProfile.count({ where: whereClause }),
      ]);

      const result = {
        profiles: mentorProfiles,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };

      console.log(`Found ${mentorProfiles.length} mentor profiles out of ${total} total`);
      return result;
    } catch (error) {
      console.error('Error in getAllMentorProfiles:', error);
      throw new InternalServerError('Error fetching mentor profiles');
    }
  },
  
  async updateMentorProfile(id: number, data: Partial<MentorProfileData>) {
    try {
      console.log(`Updating mentor profile ID ${id} with data:`, JSON.stringify(data));
      
      if (isNaN(id) || id <= 0) {
        throw new BadRequestError('Invalid mentor profile ID');
      }

      // Check if profile exists
      const existingProfile = await prisma.mentorProfile.findUnique({
        where: { id },
      });

      if (!existingProfile) {
        throw new NotFoundError('Mentor profile not found');
      }

      // Convert hourly_rate to string for Decimal type if provided
      const hourlyRateStr = data.hourly_rate !== undefined && data.hourly_rate !== null
        ? data.hourly_rate.toString()
        : undefined;

      // Prepare update data
      const updateData: any = {
        updated_at: new Date(),
      };

      // Only include fields that are provided in the update
      if (data.expertise !== undefined) updateData.expertise = data.expertise;
      if (data.bio !== undefined) updateData.bio = data.bio;
      if (data.experience !== undefined) updateData.experience = data.experience;
      if (data.availability_schedule !== undefined) updateData.availability_schedule = data.availability_schedule;
      if (hourlyRateStr !== undefined) updateData.hourly_rate = hourlyRateStr;
      if (data.is_verified !== undefined) updateData.is_verified = data.is_verified;

      // Update the profile
      const updatedProfile = await prisma.mentorProfile.update({
        where: { id },
        data: updateData,
      });

      console.log('Mentor profile updated successfully:', updatedProfile);
      return updatedProfile;
    } catch (error) {
      console.error('Error in updateMentorProfile:', error);
      if (error instanceof NotFoundError || error instanceof BadRequestError) {
        throw error;
      }
      throw new InternalServerError('Error updating mentor profile');
    }
  },
  
  async toggleVerificationStatus(id: number) {
    try {
      console.log(`Toggling verification status for mentor profile ID: ${id}`);
      
      if (isNaN(id) || id <= 0) {
        throw new BadRequestError('Invalid mentor profile ID');
      }

      const profile = await prisma.mentorProfile.findUnique({
        where: { id },
      });

      if (!profile) {
        throw new NotFoundError('Mentor profile not found');
      }

      const updatedProfile = await prisma.mentorProfile.update({
        where: { id },
        data: {
          is_verified: !profile.is_verified,
          updated_at: new Date(),
        },
      });

      console.log(`Verification status toggled to: ${updatedProfile.is_verified}`);
      return updatedProfile;
    } catch (error) {
      console.error('Error in toggleVerificationStatus:', error);
      if (error instanceof NotFoundError || error instanceof BadRequestError) {
        throw error;
      }
      throw new InternalServerError('Error toggling verification status');
    }
  },
  
  async deleteMentorProfile(id: number) {
    try {
      console.log(`Deleting mentor profile ID: ${id}`);
      
      if (isNaN(id) || id <= 0) {
        throw new BadRequestError('Invalid mentor profile ID');
      }

      // Check if profile exists
      const existingProfile = await prisma.mentorProfile.findUnique({
        where: { id },
      });

      if (!existingProfile) {
        throw new NotFoundError('Mentor profile not found');
      }

      // Delete the profile
      await prisma.mentorProfile.delete({
        where: { id },
      });

      console.log('Mentor profile deleted successfully');
      return { message: 'Mentor profile deleted successfully' };
    } catch (error) {
      console.error('Error in deleteMentorProfile:', error);
      if (error instanceof NotFoundError || error instanceof BadRequestError) {
        throw error;
      }
      throw new InternalServerError('Error deleting mentor profile');
    }
  }
};