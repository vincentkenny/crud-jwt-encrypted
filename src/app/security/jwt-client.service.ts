import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private http: HttpClient) { }

  
  public generateToken(request){
        return this.http.post("http://localhost:8080/authenticate",request, {responseType : 'text' as 'json'});
  }
  
  public checkCredentials(token){
    let tokenStr = "Bearer "+token;
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get("http://localhost:8080/authenticate/check",{headers, responseType:'text' as 'json'})
  }
}
