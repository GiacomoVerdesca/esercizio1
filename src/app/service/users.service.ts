import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class UsersService {
  users: User[];
  URL = 'http://localhost:3000'; /*server LocalHost port 3000 */
  constructor(private http: HttpClient) {}

  /* -----Add Users----- */
  init() {
    this.http.get<User[]>(this.URL + '/users').subscribe((res) => {
      this.users = res;
    });
  }
  /* -----Delete Users----- */
  deleteHandler(userToRemove: User) {
    this.http.delete(`${this.URL}/users/${userToRemove.id}`).subscribe(() => {
      this.users = this.users.filter((u) => u.id != userToRemove.id);
    });
  }
  /* -------Add Users----------*/
  saveHandler(user:User) {
    this.http
      .post<User>(`${this.URL + '/users/'}`, user)
      .subscribe((dbUsers) => {
        this.users = [...this.users, dbUsers];

      });
  }
}
