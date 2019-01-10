import {
    HttpClient,
    HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
    Observable,
    throwError
} from "rxjs";
import {
    catchError,
    map,
    tap
} from "rxjs/operators";
import { Beer } from "../state/beer/beer.model";
import { ApiEndpointService } from "./api-endpoint.service";

@Injectable({
    providedIn: "root"
})
export class BeerService {
    /**
     * Constructor.
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Requests a list of yummy beers from the API.
     */
    public getAll(): Observable<Beer[]> {
        const url = ApiEndpointService.getEndpoint(ApiEndpointService.ENDPOINT.BEER);

        return this.http.get(url).pipe(
            map((response: any) => response),
            catchError((fault: HttpErrorResponse) => {
                console.warn(`getAllFault( ${fault.message} )`);
                return throwError(fault);
            })
        );
    }
}
