import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users: User[] = [
    new User(1, "Jan", "Kowalski", "jkowalski@gmail.com", "user", "1234",[]),
    new User(2, "Anna", "Nowak", "anowak@gmail.com", "user", "1234",[]),
    new User(3, "Piotr", "Wiśniewski", "pwisniewski@gmail.com", "admin", "1234",[]),
    new User(4, "Ewa", "Zielińska", "ezielinska@gmail.com", "user", "1234",[]),
    new User(5, "Tomasz", "Kamiński", "tkaminski@gmail.com", "user", "1234",[])
  ]

  getUsers(): User[]{
    return this.users
  }
  
  constructor() { }
}
