import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { MyLogger } from '../libs/mylog.service';
import { Response } from 'express';

/**
 * 为了处理每个发生的异常（无论异常类型如何），可以将括号留空（@Catch()）
 * 内置的异常层负责处理整个应用程序中的所有抛出的异常。当捕获到未处理的异常时，最终用户将收到友好的响应。
 * @export
 * @class RouteExceptionFilter
 * @implements {ExceptionFilter}
 */
@Catch()
export class RouteExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const logger = new MyLogger('route-exception.filter.ts');
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        logger.error(JSON.stringify(exception), exception.stack);
        let statusCode = 500;
        let message = exception.message;
        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            message = message || (exception.message as any).e.message;
        }
        // 处理了异常同时记录日志
        response.status(statusCode).render('notfound.njk', {
            title: '页面未找到',
            message: JSON.stringify(message)
        })
    }
}
