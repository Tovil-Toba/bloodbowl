import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

interface Item {
  id: number;
}

export abstract class Crud<T extends Item> {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  protected constructor(
    private apiUrl: string,
    public http: HttpClient,
    public messageService: MessageService
  ) {
  }

  /** GET items from the server */
  getItems(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl)
      .pipe(
        tap(_ => this.log(`fetched getItems url=${this.apiUrl}`)),
        catchError(this.handleError<T[]>(`getItems url=${this.apiUrl}`, '', []))
      );
  }

  /** GET item by id. Return `undefined` when id not found */
  getItemNo404<Data>(id: number): Observable<T> {
    const url = `${this.apiUrl}/?id=${id}`;
    return this.http.get<T[]>(url)
      .pipe(
        map(items => items[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} getItemNo404 url=${this.apiUrl} id=${id}`);
        }),
        catchError(this.handleError<T>(`getItemNo404 url=${this.apiUrl} id=${id}`))
      );
  }

  /** GET item by id. Will 404 if id not found */
  getItem(id: number): Observable<T> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<T>(url).pipe(
      tap(_ => this.log(`fetched getItem url=${this.apiUrl} id=${id}`)),
      catchError(this.handleError<T>(`getItem url=${this.apiUrl} id=${id}`))
    );
  }

  getItemsByField(field: string, value: string): Observable<T[]> {
    const url = `${this.apiUrl}/?${field}=${value}`;
    return this.http.get<T[]>(url).pipe(
      tap(_ => this.log(`fetched getItemsByField url=${this.apiUrl}/?${field}=${value}`)),
      catchError(this.handleError<T[]>(`getItemsByField url=${this.apiUrl}/?${field}=${value}`))
    );
  }

  /* GET items whose name contains search term */
  searchItems(term: string): Observable<T[]> {
    if (!term.trim()) {
      // if not search term, return empty item array.
      return of([]);
    }
    return this.http.get<T[]>(`${this.apiUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found items matching "${term}" url=${this.apiUrl}/?name=${term}`) :
        this.log(`no items matching "${term}" url=${this.apiUrl}/?name=${term}`)),
      catchError(this.handleError<T[]>(`searchItems url=${this.apiUrl}/?name=${term}`, '', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new item to the server */
  addItem(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item, this.httpOptions).pipe(
      tap((newItem: T) => {
        this.log(`added item w/ url=${this.apiUrl} id=${newItem.id}`);
        this.showSuccessToast('Data is created');
      }),
      catchError(this.handleError<T>(
        `addItem url=${this.apiUrl}`,
        'Data is not created'
      ))
    );
  }

  /** DELETE: delete the item from the server */
  deleteItem(id: number): Observable<T> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<T>(url, this.httpOptions).pipe(
      tap(_ => {
        this.log(`deleted item url=${this.apiUrl} id=${id}`);
        this.showSuccessToast('Data is deleted');
      }),
      catchError(this.handleError<T>(
        `deleteItem url=${this.apiUrl} id=${id}`,
        'Data is not deleted'
      ))
    );
  }

  /** PUT: update the item on the server */
  updateItem(item: T): Observable<any> {
    return this.http.put(this.apiUrl, item, this.httpOptions).pipe(
      tap(_ => {
        this.log(`updated item url=${this.apiUrl} id=${item.id}`);
        this.showSuccessToast('Data is updated');
      }),
      catchError(this.handleError<any>(
        `updateItem url=${this.apiUrl} id=${item.id}`,
        'Data is not updated'
      ))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param detail - detail of the toast
   * @param result - optional value to return as the observable result
   */
  private handleError<U>(operation = 'operation', detail = '', result?: U) {
    return (error: any): Observable<U> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      this.showErrorToast(detail);
      // Let the app keep running by returning an empty result.
      return of(result as U);
    };
  }

  /** Log a TeamService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`TeamService: ${message}`);
    console.log(`CRUD: ${message}`);
  }

  showSuccessToast(detail?: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail
    });
  }

  showErrorToast(detail?: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail
    });
  }
}
