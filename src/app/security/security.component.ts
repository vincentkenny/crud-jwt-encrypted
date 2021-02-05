import { Component, OnInit } from '@angular/core';
import { JwtClientService } from './jwt-client.service';
import { Router } from '@angular/router';
import { CryptographyService } from '../global-services/cryptography.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  username : any;
  password : any;
  authRequest : any ={
    "username" : "admin",
    "password" : "admin"
  };
  users : any;
  token : any;

  constructor(private service : JwtClientService, private router: Router, private crypto : CryptographyService) { }

  ngOnInit(): void {
    
    this.checkCredentials();
  }

  public checkCredentials(){
    let res = this.service.checkCredentials(localStorage.getItem("token"));
    res.subscribe(data => this.router.navigate(['/users']));
  }

  public getAccessToken(){
    this.authRequest = {
      "username" : this.username,
      "password" : this.password
    };
    let payLoad = this.crypto.encrypt(this.authRequest);
    let res = this.service.generateToken(payLoad);
    res.subscribe((data) => {
      let decryptedData = this.crypto.decrypt(data);

      localStorage.setItem("token", decryptedData);
      this.checkCredentials();
    });
  }

}
