import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/shared/services/authentication.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {

  currentUser: any;

  constructor(
    private _authenticationService: AuthenticateService
  ) {
    this._authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  ngOnInit() {
  }

}
