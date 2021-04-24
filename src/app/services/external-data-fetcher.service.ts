import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalDataFetcherService {

  constructor() { }

  /**
   * A mock function that pretends to fetch externdal data from a webhook and return it as an observable.
   * @returns mock data from the service
   */
  getDataFromExternalApiWebhook(webhook: string): Observable<object> {
    const externalData = {
      dateRetrieved: new Date(),
      helloMessage: 'I am data from an external source!'
    };

    return of(externalData);
  }
}
