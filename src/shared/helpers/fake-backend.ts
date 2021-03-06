import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay, dematerialize, materialize, mergeMap } from "rxjs/operators";

let users = [{
    id: 1,
    firstName: 'Deividy',
    surname: 'Henrique',
    emailAddress: 'deividy_henrique@hotmail.com',
    userName: 'Deividy',
    password: '@guest123'
}];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = req;

        //wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) //call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                default:
                    //pass through any requests not handled above 
                    return next.handle(req);
            }
        }

        //route functions 
        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.userName === username && x.password === password);

            if (!user)
                return error('Username or password is incorrect');

            return ok({
                id: user.id,
                firstName: user.firstName,
                surname: user.surname,
                emailAddress: user.emailAddress,
                userName: user.userName,
                token: 'fake-jwt-token'
            });
        }

        //helper functions
        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function error(message) {
            return throwError({ error: { message } });
        }
    }

}

export const fakeBackendProvider = {
    //use fake backend in place of http service for backend-less development 
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};