import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    // Initialize the Reflector to access metadata
  }
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true; // If no roles are required, allow access
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role); // Check if the user's role is included in the required roles
  }
}
