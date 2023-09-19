import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IStarship } from 'src/model/IStarship';

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
    url = 'swapi.dev/api/starships';
    constructor(private http: HttpClient) {}

    /** GET starships from the server */
    getStarships(): Observable<HttpResponse<IStarship[]>> {
        return this.http.get<IStarship[]>(this.url, httpOptions).pipe(
            catchError((err, caught) => {
                console.log('getStarships Error', err);
                return caught;
            })
        );
    }
}
