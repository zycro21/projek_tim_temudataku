// backend/src/services/userRoleService.ts
import { PrismaClient } from '@prisma/client';
import { BadRequestError, NotFoundError } from '../utils/errorTypes';

const prisma = new PrismaClient();

/**
 * Get user roles
 */
export const getUserRoles = async (userId: number) => {
  // Check if user exists
  const user = await prisma.users.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Get user roles
  const userRoles = await prisma.user_roles.findMany({
    where: { user_id: userId },
    include: {
      role: true
    }
  });

  // Transform data for response
  return userRoles.map(ur => ({
    id: ur.id,
    role_id: ur.role_id,
    role_name: ur.role.role_name,
    description: ur.role.description,
    assigned_date: ur.assigned_date
  }));
};

/**
 * Assign role to user
 */
export const assignRoleToUser = async (userId: number, roleId: number) => {
  // Check if user exists
  const user = await prisma.users.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Check if role exists
  const role = await prisma.roles.findUnique({
    where: { id: roleId }
  });

  if (!role) {
    throw new NotFoundError('Role not found');
  }

  // Check if user already has this role
  const existingUserRole = await prisma.user_roles.findFirst({
    where: {
      user_id: userId,
      role_id: roleId
    }
  });

  if (existingUserRole) {
    throw new BadRequestError('User already has this role');
  }

  // Get the max id and increment by 1 for the new user role
  const maxId = await prisma.user_roles.findFirst({
    orderBy: {
      id: 'desc'
    },
    select: {
      id: true
    }
  });

  const newId = maxId ? maxId.id + 1 : 1;

  // Assign role to user
  const userRole = await prisma.user_roles.create({
    data: {
      id: newId,
      user_id: userId,
      role_id: roleId
    },
    include: {
      role: true
    }
  });

  return {
    id: userRole.id,
    role_id: userRole.role_id,
    role_name: userRole.role.role_name,
    assigned_date: userRole.assigned_date
  };
};

/**
 * Remove role from user
 */
export const removeRoleFromUser = async (userId: number, roleId: number) => {
  // Check if user exists
  const user = await prisma.users.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Check if role exists
  const role = await prisma.roles.findUnique({
    where: { id: roleId }
  });

  if (!role) {
    throw new NotFoundError('Role not found');
  }

  // Check if user has this role
  const userRole = await prisma.user_roles.findFirst({
    where: {
      user_id: userId,
      role_id: roleId
    }
  });

  if (!userRole) {
    throw new NotFoundError('User does not have this role');
  }

  // Check if this is the user's only role
  const userRoleCount = await prisma.user_roles.count({
    where: {
      user_id: userId
    }
  });

  if (userRoleCount <= 1) {
    throw new BadRequestError('Cannot remove the only role from a user');
  }

  // Remove role from user
  return await prisma.user_roles.delete({
    where: { id: userRole.id }
  });
};