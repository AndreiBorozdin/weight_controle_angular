import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
   constructor(public auth: AuthService, private router: Router) {
   }
   ngOnInit() {
     const potentialToken = localStorage.getItem('token')
     if (potentialToken !== null) {
       this.auth.setToken(potentialToken);
       this.router.navigate(['/site', 'site-face'])
     }
     else if(potentialToken == null){
       this.router.navigate(['/login'])
     }
   }


  logout = () => {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
