import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import {Request} from 'express';
@Injectable()
export class RolesGuard implements CanActivate{
  constructor(private reflector: Reflector) {}

  matchRoles(rolesNeeded: string[], userRole: string){
    return rolesNeeded.includes(userRole);
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler())
    if(!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(`user has role: ${user.role}, needed role/s for this route is/are: ${roles}`);

    return this.matchRoles(roles, user.role);
  }
}