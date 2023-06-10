import { Component, OnInit } from '@angular/core';
import {catchError, throwError} from 'rxjs';
import { User } from '../models/user';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  selectedUser?: User;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe(users => this.users = users);
  }

  getUser(id: string): void {
    this.userService.getUserById(id).subscribe(user => this.selectedUser = user);
  }

  addUser(user: User): void {
    this.userService.createUser(user).subscribe(newUser => {
      this.users.push(newUser);
    });
  }

  updateUser(id: string, user: User): void {
    this.userService.updateUser(id, user).subscribe(updatedUser => {
      const index = this.users.findIndex(u => u.id === updatedUser.id);
      this.users[index] = updatedUser;
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id);
    });
  }

  loginUser(user: User): void {
    this.userService.loginUser(user).pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    ).subscribe((response: any) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/home']);
    });
  }

  registerUser(user: User): void {
    this.userService.registerUser(user).pipe(
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    ).subscribe((response: any) => {
      alert('Rejestracja powiodła się! Możesz się teraz zalogować.');
      this.router.navigate(['/login']);
    });
  }
}
