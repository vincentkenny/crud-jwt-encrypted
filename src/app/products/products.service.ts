import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getAllProducts(){
    let tokenStr = "Bearer "+localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get("http://localhost:8080/api/v1/products", {headers, responseType: 'text' as 'json'});
  }

  public getProductById(id){
    let tokenStr = "Bearer "+localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get("http://localhost:8080/api/v1/products/"+id, {headers, responseType: 'text' as 'json'});  
  }

  public registerProduct(product){
    let tokenStr = "Bearer "+localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.post("http://localhost:8080/api/v1/products", product, {headers, responseType: 'text' as 'json'});
  }

  public updateProduct(id, product){
    let tokenStr = "Bearer "+localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.put("http://localhost:8080/api/v1/products/"+id, product, {headers, responseType: 'text' as 'json'});
  }

  public deleteProduct(id){
    let tokenStr = "Bearer "+localStorage.getItem("token");
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.delete("http://localhost:8080/api/v1/products/"+id, {headers, responseType: 'text' as 'json'});
  }
}
