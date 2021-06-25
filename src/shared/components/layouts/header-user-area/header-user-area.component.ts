import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/shared/services/authentication.service';

@Component({
  selector: 'app-header-user-area',
  templateUrl: './header-user-area.component.html',
  styleUrls: ['./header-user-area.component.css']
})
export class HeaderUserAreaComponent implements OnInit {

  currentUser: any;

  constructor(
    private router: Router,
    private _authenticationService: AuthenticateService
  ) {
    this._authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  logout() {
    this._authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
