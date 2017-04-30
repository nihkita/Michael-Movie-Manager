import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

declare const gapi: any;

@Injectable()
export class AuthService {

  public name: Subject<string> = new Subject();
  public auth2: BehaviorSubject<any> = new BehaviorSubject(null);
  private _auth2: any;

  constructor(private http: Http) {
    // Intialize google api
    gapi.load('auth2', () => {
      this._auth2 = gapi.auth2.init({
        client_id: '688955737235-o22bf9ejkcl83jg0q7h0lb6dhbfine76.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile'
      });
      // Notify subscribers when initialized (For attaching api handler to login button)
      this.auth2.next(this._auth2);
      // Listen for auth updates from google api and sync to server
      this._auth2.isSignedIn.listen(isAuth => {
        if (isAuth) {
          let googleUser = this._auth2.currentUser.get();
          this.login(googleUser.getAuthResponse().id_token, googleUser.getBasicProfile()).subscribe(() => {});
        } else {
          this.logout();
        }
      });
    });
  }

  login(idToken, profile) {
    console.log('Token || ' + idToken);
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(`/api/googleauth?idtoken=${idToken}`, '', { headers })
      .map(() => this.name.next(profile.getName()));
  }

  isLoggedIn() {
    return this.http.get('/api/googleauth').map(response => response.json());
  }

  logout() {
    this.http.delete('/api/googleauth').subscribe(() => {
      this._auth2.signOut().then(() => this.name.next(undefined));
    }, err => console.log(err)); // TODO: implement error handling
  }

}
