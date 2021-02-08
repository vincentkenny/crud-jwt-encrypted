import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(private http: HttpClient) { }

  public getAllPurchases(){
    let tokenStr = "Bearer "+localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get("http://localhost:8080/api/v1/purchases", {headers, responseType: 'text' as 'json'});
  }

  public getPurchaseById(id){
    let tokenStr = "Bearer "+localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get("http://localhost:8080/api/v1/purchases/"+id, {headers, responseType: 'text' as 'json'});  
  }

  public registerPurchase(purchase){
    let tokenStr = "Bearer "+localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.post("http://localhost:8080/api/v1/purchases", purchase, {headers, responseType: 'text' as 'json'});
  }

  public updatePurchase(id, purchase){
    let tokenStr = "Bearer "+localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.put("http://localhost:8080/api/v1/purchases/"+id, purchase, {headers, responseType: 'text' as 'json'});
  }

  public deletePurchase(id){
    let tokenStr = "Bearer "+localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.delete("http://localhost:8080/api/v1/purchases/"+id, {headers, responseType: 'text' as 'json'});
  }
}
