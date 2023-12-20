// auth.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  // template: `
  //   <div *ngIf="!authService.auth.currentUser; else signedIn">
  //     <input [(ngModel)]="email" placeholder="Email" />
  //     <input [(ngModel)]="password" type="password" placeholder="Password" />
  //     <button (click)="signIn()">Sign In</button>
  //     <button (click)="signUp()">Sign Up</button>
  //     <button (click)="signInWithGoogle()">Sign In with Google</button>
  //   </div>
  //   <ng-template #signedIn>
  //     <div>
  //       <button (click)="signOut()">Sign Out</button>
  //     </div>
  //   </ng-template>
  // `,

  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email: string = '';
  password: string = '';

  constructor(public authService: AuthService) {}

  signIn() {
    this.authService.signIn(this.email, this.password).then(() => {
      console.log('User signed in successfully');
      this.email = '';
      this.password = '';
    });
  }

  signUp() {
    this.authService.signUp(this.email, this.password).then(() => {
      console.log('User signed up successfully');
      this.email = '';
      this.password = '';
    });
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle().then(() => {
      console.log('User signed in with Google successfully');
    });
  }

  signOut() {
    this.authService.signOut().then(() => {
      console.log('User signed out successfully');
    });
  }
}
