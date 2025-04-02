import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    switch(exception.code){
      case 'P2025':{
        const status = HttpStatus.NOT_FOUND;
        //@ts-ignore
        response.status(status).json({
          statusCode: status,
          message: exception.meta?.cause || exception.message,
          errorCode: exception.code
        });
        break;
      }
      default:
        super.catch(exception, host)
    }

  }
}
