import { StorageService } from 'src/app/core/services/storageService/storage';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable, switchMap } from "rxjs";



@Injectable({
  providedIn: 'root',
})

export class InterceptorService implements HttpInterceptor {
  constructor(private storage: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.storage.get('token')).pipe(
      switchMap(token => {
        if (!token) {
          return next.handle(req);
        }

        const authReq = req.clone({
          headers: req.headers
            .set('Authorization', `Bearer ${token}`)
            .set('Client', 'app')
        });

        return next.handle(authReq);
      })
    );
  }
}
