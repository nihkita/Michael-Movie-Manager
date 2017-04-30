import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  name: string;
  authNameSub: Subscription;

  constructor(private zone: NgZone, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authNameSub = this.authService.name.subscribe(name => {
      this.zone.run(() => this.name = name);
      if (!name) this.router.navigate(['/login']);
    });
  }

  ngOnDestroy() {
    this.authNameSub.unsubscribe();
  }

  logout() {
    // redirect to login page currently happening through name subscription
    this.authService.logout();
  }

}
