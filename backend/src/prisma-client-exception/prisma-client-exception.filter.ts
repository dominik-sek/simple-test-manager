import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    switch(exception.code){
      case 'P2025':{
        const httpStatus = HttpStatus.NOT_FOUND;
        response.status(httpStatus).json({
          statusCode: httpStatus,
          message: exception.meta?.cause || message,
          errorCode: exception.code
        });
        break;
      }
      case 'P2002':{
        const httpStatus = HttpStatus.CONFLICT;
        response.status(httpStatus).json({
          statusCode: httpStatus,
          message: exception.meta?.cause || message,
          errorCode: exception.code
        });
        break;
      }
      case 'P2003':{
        const httpStatus = HttpStatus.CONFLICT;
        response.status(httpStatus).json({
          statusCode: httpStatus,
          message: exception.meta?.cause || message,
          errorCode: exception.code
        })
      break;
      }

      default:
        super.catch(exception, host)
    }
  }
}
