import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 
  constructor(private http : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('id_token')
   })
  };

  newUser(addedUser : User) : Observable<any>{
    return this.http.post("http://localhost:3000/users/newUser", addedUser);
  }
  
  login(loginUser : User) : Observable<any>{
    return this.http.post<any>("http://localhost:3000/users/login",loginUser);
  }

  updateUser(updatedUser : User) : Observable<any>{
    return this.http.patch<User>("http://localhost:3000/users/update", updatedUser, this.httpOptions);
  }
  deleteUser(id: string) : Observable<User>{
    return this.http.delete<User>("http://localhost:3000/delete/"+id, this.httpOptions);
  }
  getUserByUsername(name: string) : Observable<User>{
    return this.http.get<User>("http://localhost:3000/users/userdetail/" +name, this.httpOptions);
  }
}
