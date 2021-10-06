import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  private authURL: string;
  constructor(private httpclient: HttpClient) {
    this.authURL = 'http://localhost:3000/auth/v1';
  }

  authenticateUser(data) {
    return this.httpclient.post(this.authURL, data);
  }

  setBearerToken(token) {
    localStorage.setItem('Bearer', token);
  }

  getBearerToken() {
    return localStorage.getItem('Bearer');
  }

  isUserAuthenticated(token): Promise<boolean> {
    return this.httpclient
      .post(
        `${this.authURL}/isAuthenticated`,
        {},
        {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
        }
      )
      .pipe(map((res) => res['isAuthenticated']))
      .toPromise();
  }
}
