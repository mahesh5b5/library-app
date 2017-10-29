import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  sessionExists: {};
  constructor(private router: Router, private authService: AuthService) {

    this.router = router;
    this.router.events.subscribe((changed) => {
      this.sessionExists = this.authService.isLoggedIn();
    });
  }

  ngOnInit() {
    this.sessionExists = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.closeSession();
  }
}
