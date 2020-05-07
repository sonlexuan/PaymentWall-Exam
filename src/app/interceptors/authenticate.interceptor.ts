import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticateInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const cloneReq = req.clone({
            params: req.params.set("key", "ea04232883deddd1fa0cdb299e275ba5")
        });
        return next.handle(cloneReq);
    }
}