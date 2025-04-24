// backend/src/services/roleService.ts
import { PrismaClient } from '@prisma/client';
import { BadRequestError, NotFoundError } from '../utils/errorTypes';

const prisma = new PrismaClient();

/**
 * Get all roles
 */
export const getAllRoles = async () => {
  return await prisma.roles.findMany({
    orderBy: {
      id: 'asc'
    }
  });
};

/**
 * Get role by ID
 */
export const getRoleById = async (roleId: number) => {
  const role = await prisma.roles.findUnique({
    where: { id: roleId }
  });

  if (!role) {
    throw new NotFoundError('Role not found');
  }

  return role;
};

/**
 * Create a new role
 */
export const createRole = async (roleData: { role_name: string; description?: string }) => {
  // Check if role name already exists
  const existingRole = await prisma.roles.findUnique({
    where: { role_name: roleData.role_name }
  });

  if (existingRole) {
    throw new BadRequestError('Role name already exists');
  }

  // Get the max id and increment by 1 for the new role
  const maxId = await prisma.roles.findFirst({
    orderBy: {
      id: 'desc'
    },
    select: {
      id: true
    }
  });

  const newId = maxId ? maxId.id + 1 : 1;

  // Create new role
  return await prisma.roles.create({
    data: {
      id: newId,
      role_name: roleData.role_name,
      description: roleData.description
    }
  });
};

/**
 * Update role
 */
export const updateRole = async (roleId: number, roleData: { role_name: string; description?: string }) => {
  // Check if role exists
  const role = await prisma.roles.findUnique({
    where: { id: roleId }
  });

  if (!role) {
    throw new NotFoundError('Role not found');
  }

  // Check if role name already exists (except for the current role)
  if (roleData.role_name !== role.role_name) {
    const existingRole = await prisma.roles.findUnique({
      where: { role_name: roleData.role_name }
    });

    if (existingRole) {
      throw new BadRequestError('Role name already exists');
    }
  }

  // Update role
  return await prisma.roles.update({
    where: { id: roleId },
    data: {
      role_name: roleData.role_name,
      description: roleData.description
    }
  });
};

/**
 * Delete role
 */
export const deleteRole = async (roleId: number) => {
  // Check if role exists
  const role = await prisma.roles.findUnique({
    where: { id: roleId }
  });

  if (!role) {
    throw new NotFoundError('Role not found');
  }

  // Check if role is assigned to any users
  const userRole = await prisma.user_roles.findFirst({
    where: { role_id: roleId }
  });

  if (userRole) {
    throw new BadRequestError('Cannot delete role that is assigned to users');
  }

  // Delete role
  return await prisma.roles.delete({
    where: { id: roleId }
  });
};