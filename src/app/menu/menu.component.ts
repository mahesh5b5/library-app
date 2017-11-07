import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  sessionExists: {};
  constructor(private router: Router, private userService: UserService) {
    this.router = router;
    this.router.events.subscribe((changed) => {
      this.sessionExists = this.userService.isLoggedIn();
    });
  }

  ngOnInit() {
    this.sessionExists = this.userService.isLoggedIn();
  }

  logout() {
    this.userService.closeSession();
  }
}
