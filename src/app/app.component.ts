import { Component, Injectable } from '@angular/core';
import { UsersService } from './service/users.service';
import { NgForm } from '@angular/forms';
import { User } from './model/user';
@Component({
  selector: 'app-root',
  template: `
  <h1>Esercizio Demo1</h1>
    <div class="container">
      <!-- -----Form------ -->
      <form
        class="card card-body mt-2"
        #f="ngForm"
        (submit)="saveHandler(f)"
        [ngClass]="{
          male: f.value.gender === 'M',
          female: f.value.gender === 'F'
        }"
      >
        <!-- ----Input Name---- -->
        <input
          type="text"
          [ngModel]
          name="label"
          placeholder="Add user name"
          class="form-control"
          required
          #labelInput="ngModel"
          [ngClass]="{ 'is-invalid': labelInput.invalid && f.dirty }"
        />
        <!-- ----Input Age---- -->
        <input
          type="text"
          [ngModel]
          name="age"
          placeholder="Insert Age"
          class="form-control"
          required
          #ageInput="ngModel"
          [ngClass]="{ 'is-invalid': ageInput.invalid && f.dirty }"
        />
        <!-- ----Input Gender---- -->
        <select
          [ngModel]
          name="gender"
          class="form-control"
          required
          #genderInput="ngModel"
          [ngClass]="{ 'is-invalid': genderInput.invalid && f.dirty }"
        >
          <option [ngValue]="null">Select option</option>
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
        <!-- ----Button Send Data---- -->
        <button
          class="btn"
          [disabled]="f.invalid"
          [ngClass]="{
            'btn-dark': f.valid,
            'btn-warning': f.invalid
          }"
        >
          Save
        </button>
      </form>

      <hr />

      <div
        *ngFor="let u of userService.users"
        class="list-group-item"
        [ngClass]="{
          male: u.gender === 'M',
          female: u.gender === 'F'
        }"
      >
        <i
          class="fa fa-3x"
          [ngClass]="{
            'fa-mars': u.gender === 'M',
            'fa-venus': u.gender === 'F'
          }"
        ></i>
        {{ u.label }}
        {{u.age+" anni"}}

        <i
          class="fa fa-trash fa-2x pull-right"
          (click)="userService.deleteHandler(u)"
        ></i>
      </div>
    </div>
  `,
  styles: [
    `
      .male {
        background-color: #36caff;
      }
      .female {
        background-color: pink;
      }
      .card {
        transition: all 0.5s;
      }
    `,
  ],
})
export class AppComponent {
  constructor(public userService: UsersService) {
    userService.init();
  }

  saveHandler(form: NgForm) {
    this.userService.saveHandler(form.value as User);
    form.reset();
  }
}
