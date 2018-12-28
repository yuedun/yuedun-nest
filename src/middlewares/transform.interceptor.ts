import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    code: number;
    data: T;
    message: string;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        call$: Observable<T>,
    ): Observable<Response<T>> {
        console.log('>>>trasform.interceptor');

        return call$.pipe(
            map(data => ({
                code: 0,
                data,
                message: '',
            })),
        );
    }
}
