import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CryptographyService } from '../global-services/cryptography.service';
import { UserModalService } from '../modals/user-modal/user-modal.service';
import { Product } from '../models/Product';
import { JwtClientService } from '../security/jwt-client.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsList : any;
  product = new Product(-1,"",0,0);

  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private service : ProductsService, private crypto : CryptographyService,
     private jwtService : JwtClientService, private router : Router,
     private modalService : UserModalService) { }

  ngOnInit(): void {
    this.checkCredentials();
    this.getAllProducts();
  }

  public checkCredentials(){
    let res = this.jwtService.checkCredentials(localStorage.getItem("token"));
    res.subscribe(data => { }, err => {
      this.router.navigate(['/login'])
    });
  }

  public getAllProducts(){
    let res = this.service.getAllProducts();
    res.subscribe(data => {
      let decrypted = this.crypto.decrypt(data);
      this.productsList = JSON.parse(decrypted);
    });
  }
  
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.product = new Product(-1,"",0,0);
  }

  populateForm(id){
    let res = this.service.getProductById(id);
    res.subscribe(data=>{
      let decrypted = this.crypto.decrypt(data);
      let json = JSON.parse(decrypted);
      this.product = new Product(json.id,json.name,json.quantity,json.price);
      this.openModal("edit-modal");
    });
  }

  public registerProduct() {
    let payLoad = this.crypto.encrypt(this.product);
    let res = this.service.registerProduct(payLoad);
    res.subscribe((data) => {
      this.closeModal("register-modal");
      this.getAllProducts();
    });
  }

  public updateProduct(){
    let payLoad = this.crypto.encrypt(this.product);
    let res = this.service.updateProduct(this.product.id,payLoad);
    res.subscribe(data => {
      this.closeModal("edit-modal");
      this.getAllProducts();
    });
  }

  public deleteProduct(id){
    let res = this.service.deleteProduct(id);
    res.subscribe(data=>{
      this.getAllProducts();
    })
  }



}
