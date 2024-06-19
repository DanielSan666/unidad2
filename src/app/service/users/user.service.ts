import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url= "http://localhost:5000/api/user"

  constructor(private http:HttpClient) { 

  }

  getUser():Observable<User[]>{
    return this.http.get<User[]>(this.url)
  }

  addUser(user:any):Observable<User>{
    return this.http.post<User>(this.url,user)
  }

  editUser(user:any):Observable<User>{
    return this.http.patch<User>(this.url,user)
  }
  delete(id:string):Observable<User>{
    return this.http.delete<User>(this.url+"/"+id)
  }
}
