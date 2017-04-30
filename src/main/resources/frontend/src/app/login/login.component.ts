import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements AfterViewInit, OnDestroy {

  auth2Sub: Subscription;

  constructor(private router: Router, private authService: AuthService) { }

  ngAfterViewInit() {
    this.auth2Sub = this.authService.auth2.subscribe(auth2 => {
      if (!auth2) return;
      auth2.attachClickHandler(document.getElementById('googleBtn'), {}, googleUser => {
        this.authService.login(googleUser.getAuthResponse().id_token, googleUser.getBasicProfile())
          .subscribe(() => this.router.navigate(['']));
      }, err => console.log(err)); // TODO: implement error handling
    });
  }

  ngOnDestroy() {
    if (this.auth2Sub) this.auth2Sub.unsubscribe();
  }

}
