import { Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";
import * as M from 'materialize-css';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy{
  form: FormGroup
  aSub: Subscription
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
      let elems = document.getElementById('gender');
      let instances = M.FormSelect.init(elems, {});

    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      age: new FormControl(null, [Validators.required, Validators.min(1)]),
      height: new FormControl(null, [Validators.required, Validators.min(1)]),
      weight: new FormControl(null, [Validators.required, Validators.min(1)]),
      gender: new FormControl(null, [Validators.required]),
    })
  }


  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }
  onSubmit(){
    this.form.disable()
    this.aSub = this.auth.register(this.form.value).subscribe(
      response => {
        this.router.navigate(['/login'], {
          queryParams: {
            'registered': true
          }
        })
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }
}
