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
import { IPilot } from 'src/model/IPilot';

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
    providedIn: "root",
})
export class SwapiService {
    url = "https://swapi.dev/api".toLowerCase();
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError("SwapiService");
    }

    /** GET starships from the server by URL */
    getStarshipsByUrl(
        urlParm: string | null
    ): Observable<HttpResponse<ISwapiResp>> {
        const emptyResp = new HttpResponse<ISwapiResp>({});
        const endPoint = "starships";

        if (urlParm && !this.checkUrl("getStarshipsByUrl", endPoint, urlParm))
            return of(emptyResp);

        if (urlParm == null) urlParm = this.url + "/" + endPoint;

        return this.http
            .get<ISwapiResp>(urlParm, httpOptions)
            .pipe(
                retry({ count: 2, delay: this.shouldRetry }),
                catchError(
                    this.handleError(
                        "getStarships",
                        new HttpResponse<ISwapiResp>({})
                    )
                )
            );
    }

    /** GET starship from the server by url */
    getStarshipByUrl(urlParm: string): Observable<HttpResponse<IStarship>> {
        const emptyResp = new HttpResponse<IStarship>({});
        const endPoint = "starships";

        if (!this.checkUrl("getStarshipByUrl", endPoint, urlParm)) return of(emptyResp);

        return this.http
            .get<IStarship>(urlParm, httpOptions)
            .pipe(
                retry({ count: 2, delay: this.shouldRetry }),
                catchError(this.handleError("getStarshipByUrl", emptyResp))
            );
    }

    /** GET pilot from the server by url */
    getPilotByUrl(urlParm: string): Observable<HttpResponse<IPilot>> {
        const emptyResp = new HttpResponse<IPilot>({});
        const endPoint = "people";

        if (!this.checkUrl("getPilotByUrl", endPoint, urlParm)) return of(emptyResp);

        return this.http
            .get<IPilot>(urlParm, httpOptions)
            .pipe(
                retry({ count: 2, delay: this.shouldRetry }),
                catchError(this.handleError("getPilotByUrl", emptyResp))
            );
    }

    // A custom method to check should retry a request or not
    shouldRetry(error: HttpErrorResponse) {
        if (error.status === 0) {
            return timer(1000); // Adding a timer from RxJS to return observable to delay param.
        }

        throw error;
    }

    checkUrl(operation: string, endPoint: string, urlParm: string): boolean {
        const isString = typeof urlParm == "string";
        const lowerCase = isString ? urlParm.toLowerCase() : "";

        const isOk = isString && lowerCase.startsWith(this.url + "/" + endPoint);

        if (!isOk)
            console.log(
                `SwapiService: ${operation} failed: Bad URL: "${urlParm}"`
            );

        return isOk;
    }
}
