import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: '.userBox',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css']
})
export class UserBoxComponent implements OnInit {
    constructor(
      private router: Router
    ) {}

    public ngOnInit(){

    }

    private Logout = (): void => {
      this.router.navigate(['/']);
    }
}
