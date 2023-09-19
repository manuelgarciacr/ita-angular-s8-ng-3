import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError, timer } from 'rxjs';
import { ISwapiResp } from 'src/model/ISwapiResp';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //Authorization: 'my-auth-token',
    }),
    observe: 'response' as const,
    params: {},
    reportProgress: false,
    responseType: 'json' as const,
    withCredentials: false,
};

@Injectable({
    providedIn: 'root',
})
export class SwapiService {
    url = 'https://swapi.dev/api/starships';
    constructor(private http: HttpClient) {}

    /** GET starships from the server */
    getStarships(): Observable<HttpResponse<ISwapiResp>> {
        return this.http.get<ISwapiResp>(this.url, httpOptions).pipe(
            retry({ count: 2, delay: this.shouldRetry }),
            catchError(this.handleError)
        );
    }

    // A custom method to check should retry a request or not
    shouldRetry(error: HttpErrorResponse) {
        if (error.status === 0) {
            return timer(1000); // Adding a timer from RxJS to return observable to delay param.
        }

        throw error;
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `,
                error.error
            );
        }
        // Return an observable with a user-facing error message.
        return throwError(
            () => new Error('Something bad happened; please try again later.')
        );
    }
}
