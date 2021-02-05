import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getAllUser(){
    let tokenStr = "Bearer "+localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get("http://localhost:8080/api/v1/users", {headers, responseType: 'text' as 'json'});
  }

  public getUserById(id){
    let tokenStr = "Bearer "+localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get("http://localhost:8080/api/v1/users/"+id, {headers, responseType: 'text' as 'json'});  
  }

  public registerUser(user){
    let tokenStr = "Bearer "+localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.post("http://localhost:8080/api/v1/users", user, {headers, responseType: 'text' as 'json'});
  }

  public updateUser(id, user){
    let tokenStr = "Bearer "+localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.put("http://localhost:8080/api/v1/users/"+id, user, {headers, responseType: 'text' as 'json'});
  }

  public deleteUser(id){
    let tokenStr = "Bearer "+localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.delete("http://localhost:8080/api/v1/users/"+id, {headers, responseType: 'text' as 'json'});
  }
  
}
