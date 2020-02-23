import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

/**
 * 为了处理每个发生的异常（无论异常类型如何），可以将括号留空（@Catch()）
 * 内置的异常层负责处理整个应用程序中的所有抛出的异常。当捕获到未处理的异常时，最终用户将收到友好的响应。
 * @export
 * @class HttpExceptionFilter
 * @implements {ExceptionFilter}
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        console.log('>>>http-exception.filter', exception.message);
        let statusCode = 500;
        const code = 1;
        let message = exception.message;
        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            message = exception.message.message;
        }
        // 处理了异常同时记录日志
        response.status(statusCode).json({
            code,
            message,
            path: request.url,
        });
    }
}
