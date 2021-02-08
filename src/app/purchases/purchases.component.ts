import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CryptographyService } from '../global-services/cryptography.service';
import { UserModalService } from '../modals/user-modal/user-modal.service';
import { Purchase } from '../models/Purchase';
import { JwtClientService } from '../security/jwt-client.service';
import { PurchasesService } from './purchases.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  purchasesList : any;
  purchase = new Purchase(0,0,0,0,0);

  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private service : PurchasesService, private crypto : CryptographyService,
    private router: Router, private jwtService : JwtClientService,
    private modalService: UserModalService) { }

  ngOnInit(): void {
    this.checkCredentials();
    this.getAllPurchases(); 
  }

  public checkCredentials(){
    let res = this.jwtService.checkCredentials(localStorage.getItem("token"));
    res.subscribe(data => { }, err => {
      this.router.navigate(['/login'])
    });
  }

  public getAllPurchases(){
    let res = this.service.getAllPurchases();
    res.subscribe(data => {
      let decrypted = this.crypto.decrypt(data);
      this.purchasesList = JSON.parse(decrypted);
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.purchase = new Purchase(0,0,0,0,0);
  }

  populateForm(id){
    let res = this.service.getPurchaseById(id);
    res.subscribe(data=>{
      let decrypted = this.crypto.decrypt(data);
      let json = JSON.parse(decrypted);
      this.purchase = new Purchase(json.id,json.productId,json.quantity,json.totalPrice,json.userId);
      this.openModal("edit-modal");
    });
  }

  public registerPurchase() {
    let payLoad = this.crypto.encrypt(this.purchase);
    let res = this.service.registerPurchase(payLoad);
    res.subscribe((data) => {
      this.closeModal("register-modal");
      this.getAllPurchases();
    });
  }

  public updatePurchase(){
    let payLoad = this.crypto.encrypt(this.purchase);
    console.log(this.purchase.userId);
    let res = this.service.updatePurchase(this.purchase.id,payLoad);
    res.subscribe(data => {
      this.closeModal("edit-modal");
      this.getAllPurchases();
    });
  }

  public deletePurchase(id){
    let res = this.service.deletePurchase(id);
    res.subscribe(data=>{
      this.getAllPurchases();
    })
  }

}
