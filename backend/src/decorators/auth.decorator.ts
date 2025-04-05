// import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
//
// export const Auth(...roles: Role[])=>{
//   return applyDecorators(
//     SetMetadata('roles', roles),
//     UseGuards(JwtAuthGuard, RolesGuard)
//   )
// }