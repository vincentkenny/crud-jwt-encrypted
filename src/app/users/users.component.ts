import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { CryptographyService } from '../global-services/cryptography.service';
import { JwtClientService } from '../security/jwt-client.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserModalService } from '../modals/user-modal/user-modal.service';
import { faEdit, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private service: UsersService, private router: Router,
    private jwtService: JwtClientService, private crypto: CryptographyService,
    private modalService: UserModalService) { }

  usersList: any;
  user: User = new User(-1,"", "", "");

  faEdit = faEdit;
  faTrash = faTrash;

  ngOnInit(): void {
    this.checkCredentials();
    this.getAllUser();
  }

  public checkCredentials() {
    let res = this.jwtService.checkCredentials(localStorage.getItem("token"));
    res.subscribe(data => { }, err => {
      this.router.navigate(['/login'])
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.user = new User(-1,"","","");
  }

  populateForm(id){
    let res = this.service.getUserById(id);
    res.subscribe(data=>{
      let decrypted = this.crypto.decrypt(data);
      let json = JSON.parse(decrypted);
      this.user = new User(json.id,json.username,json.password,json.email);
      this.openModal("edit-modal");
    });
  }

  public getAllUser() {
    let res = this.service.getAllUser();
    res.subscribe((data) => {
      let decrypted = this.crypto.decrypt(data);
      this.usersList = JSON.parse(decrypted);
    });
  }

  public registerUser() {
    let payLoad = this.crypto.encrypt(this.user);
    let res = this.service.registerUser(payLoad);
    res.subscribe((data) => {
      this.closeModal("register-modal");
      this.getAllUser();
    });
  }

  public updateUser(){
    let payLoad = this.crypto.encrypt(this.user);
    let res = this.service.updateUser(this.user.id,payLoad);
    res.subscribe(data => {
      this.closeModal("edit-modal");
      this.getAllUser();
    });
  }

  public deleteUser(id){
    let res = this.service.deleteUser(id);
    res.subscribe(data=>{
      this.getAllUser();
    })
  }

}