import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, retry, timer } from 'rxjs';
import { IStarship } from 'src/model/IStarship';
import { ISwapiResp } from 'src/model/ISwapiResp';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';

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
const emptyResp = new HttpResponse<IStarship>({});

@Injectable({
    providedIn: 'root',
})
export class SwapiService {
    url = 'https://swapi.dev/api/starships'.toLowerCase();
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('SwapiService');
    }

    /** GET starships from the server */
    getStarships(): Observable<HttpResponse<ISwapiResp>> {
        return this.http
            .get<ISwapiResp>(this.url, httpOptions)
            .pipe(
                retry({ count: 2, delay: this.shouldRetry }),
                catchError(this.handleError('getStarships', new HttpResponse<ISwapiResp>({})))
            );
    }

    /** GET starship by url */
    getStarshipByUrl(urlParm: string): Observable<HttpResponse<IStarship>> {
        if (!this.checkUrl('getStarshipByUrl', urlParm))
            return of(emptyResp);

        return this.http
            .get<IStarship>(urlParm, httpOptions)
            .pipe(
                retry({ count: 2, delay: this.shouldRetry }),
                catchError(this.handleError("getStarshipByUrl", emptyResp))
            );
    }

    // A custom method to check should retry a request or not
    shouldRetry(error: HttpErrorResponse) {
        if (error.status === 0) {
            return timer(1000); // Adding a timer from RxJS to return observable to delay param.
        }

        throw error;
    }

    checkUrl(operation: string, urlParm: string): boolean {
        const isString = typeof urlParm == 'string';
        const lowerCase = isString ? urlParm.toLowerCase() : "";

        const isOk = isString && lowerCase.startsWith(this.url);

        if (!isOk)
            console.log(`SwapiService: ${operation} failed: Bad URL: "${urlParm}"`);

        return isOk
    }
}
