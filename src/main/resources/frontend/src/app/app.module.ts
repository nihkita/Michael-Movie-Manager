import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthGuard } from './guards/authenticated';
import { AuthService } from './services/auth.service';

const ROUTES = [
  { path: 'login', canActivate: [AuthGuard], loadChildren: './login/login.module#LoginModule' },
  { path: '', canActivate: [AuthGuard], loadChildren: './home/home.module#HomeModule' },
  { path: 'movies', canActivate: [AuthGuard], loadChildren: './movies/movies.module#MoviesModule' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  bootstrap: [AppComponent],
  providers: [AuthService, AuthGuard]
})
export class AppModule { }
