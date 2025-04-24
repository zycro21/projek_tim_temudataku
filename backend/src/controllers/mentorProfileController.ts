// 3. Controller - src/controllers/mentorProfileController.ts
import { Request, Response, NextFunction } from 'express';
import { mentorProfileService, MentorProfileData } from '../services/mentorProfileService';
import { formatResponse } from '../utils/responseFormatter';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    roles: string[];
  };
}

export const mentorProfileController = {
  async createMentorProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: MentorProfileData = {
        user_id: parseInt(req.body.user_id),
        expertise: req.body.expertise,
        bio: req.body.bio,
        experience: req.body.experience,
        availability_schedule: req.body.availability_schedule,
        hourly_rate: req.body.hourly_rate ? parseFloat(req.body.hourly_rate) : undefined,
      };

      const mentorProfile = await mentorProfileService.createMentorProfile(data);
      
      formatResponse(res, 'Mentor profile created successfully', mentorProfile, 201);
    } catch (error) {
      next(error);
    }
  },

  async getMentorProfileById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const mentorProfile = await mentorProfileService.getMentorProfileById(id);
      
      formatResponse(res, 'Mentor profile retrieved successfully', mentorProfile);
    } catch (error) {
      next(error);
    }
  },

  async getMentorProfileByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const mentorProfile = await mentorProfileService.getMentorProfileByUserId(userId);
      
      formatResponse(res, 'Mentor profile retrieved successfully', mentorProfile);
    } catch (error) {
      next(error);
    }
  },

  async getCurrentMentorProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      
      const userId = req.user.id;
      const mentorProfile = await mentorProfileService.getMentorProfileByUserId(userId);
      
      formatResponse(res, 'Current mentor profile retrieved successfully', mentorProfile);
    } catch (error) {
      next(error);
    }
  },

  async getAllMentorProfiles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const verified = req.query.verified ? req.query.verified === 'true' : undefined;
      
      const result = await mentorProfileService.getAllMentorProfiles(page, limit, verified);
      
      formatResponse(res, 'Mentor profiles retrieved successfully', result);
    } catch (error) {
      next(error);
    }
  },

  async updateMentorProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const data: Partial<MentorProfileData> = {
        expertise: req.body.expertise,
        bio: req.body.bio,
        experience: req.body.experience,
        availability_schedule: req.body.availability_schedule,
        hourly_rate: req.body.hourly_rate ? parseFloat(req.body.hourly_rate) : undefined,
        is_verified: req.body.is_verified,
      };

      const updatedProfile = await mentorProfileService.updateMentorProfile(id, data);
      
      formatResponse(res, 'Mentor profile updated successfully', updatedProfile);
    } catch (error) {
      next(error);
    }
  },

  async updateCurrentMentorProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }
      
      const userId = req.user.id;
      
      // First get the mentor profile by user id
      const mentorProfile = await mentorProfileService.getMentorProfileByUserId(userId);
      
      const data: Partial<MentorProfileData> = {
        expertise: req.body.expertise,
        bio: req.body.bio,
        experience: req.body.experience,
        availability_schedule: req.body.availability_schedule,
        hourly_rate: req.body.hourly_rate ? parseFloat(req.body.hourly_rate) : undefined,
      };

      const updatedProfile = await mentorProfileService.updateMentorProfile(mentorProfile.id, data);
      
      formatResponse(res, 'Your mentor profile updated successfully', updatedProfile);
    } catch (error) {
      next(error);
    }
  },

  async toggleVerificationStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const updatedProfile = await mentorProfileService.toggleVerificationStatus(id);
      
      const message = `Mentor verification ${updatedProfile.is_verified ? 'approved' : 'revoked'} successfully`;
      formatResponse(res, message, updatedProfile);
    } catch (error) {
      next(error);
    }
  },

  async deleteMentorProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await mentorProfileService.deleteMentorProfile(id);
      
      formatResponse(res, result.message);
    } catch (error) {
      next(error);
    }
  }
};