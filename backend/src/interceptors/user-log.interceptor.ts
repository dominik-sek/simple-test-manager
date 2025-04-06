import {
  CallHandler,
  ExecutionContext, HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Request } from 'express';
import { UserLogService } from '../user-log/user-log.service';

@Injectable()
export class UserLogInterceptor implements NestInterceptor {
  constructor(private readonly userLogService: UserLogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    const method = request.method;
    const path = request.route?.path || request.url;
    const start = Date.now();
    const body = request.body;
    const params = request.params;
    const query = request.query;
    const ip = request.headers['x-forwarded-for'] || request.ip;
    const userAgent = request.headers['user-agent']

    const logCommon = {
      body,
      params,
      query,
      ip,
      userAgent,
    };

    const action = `${method} ${path}`;

    return next.handle().pipe(
      tap(async () => {
        const timing = Date.now() - start;
        //@ts-ignore
        await this.userLogService.log(user?.id ?? null, action, 'INFO', {
          ...logCommon,
          timing,
        });
      }),
      catchError( (err) => {
        const timing = Date.now() - start;
        //@ts-ignore
         this.userLogService.log(user?.id ?? null, action, 'ERROR', {
          ...logCommon,
          timing,
          error: {
            message: err.message,
            stack: err.stack,
          },
        });

        return throwError(() => err);

      }),
    );
  }
}
