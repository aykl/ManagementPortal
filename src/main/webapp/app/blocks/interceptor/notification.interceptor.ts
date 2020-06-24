import { tap } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';

export class NotificationInterceptor implements HttpInterceptor {

    private alertService: JhiAlertService;

    constructor(private injector: Injector) {
        setTimeout(() => this.alertService = injector.get(JhiAlertService));
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                const arr = event.headers.keys();
                let alert = null;
                let alertParams = null;
                arr.forEach((entry) => {
                    if (entry.toLocaleLowerCase().endsWith('app-alert')) {
                        alert = event.headers.get(entry);
                    } else if (entry.toLocaleLowerCase().endsWith('app-params')) {
                        alertParams = event.headers.get(entry);
                    }
                });
                if (alert) {
                    if (typeof alert === 'string') {
                        if (this.alertService) {
                            const alertParam = alertParams;
                            this.alertService.success(alert, { param : alertParam }, null);
                        }
                    }
                }
            }
        }, (err: any) => {}));
    }
}
