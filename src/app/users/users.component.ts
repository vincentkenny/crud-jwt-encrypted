import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { CryptographyService } from '../global-services/cryptography.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private service: UsersService, private crypto:CryptographyService) { }

  usersList : any;
  ngOnInit(): void {
    this.getAllUser();
  }

  public getAllUser(){
    let res = this.service.getAllUser();
    res.subscribe((data) => this.usersList = data);
  }

}
