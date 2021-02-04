import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptographyService {

  constructor() { }

  public encrypt(toBeEncrypted){
    let secretKey = "i913S8UEyDSuIfkv";
    return crypto.AES.encrypt(JSON.stringify(toBeEncrypted), secretKey).toString();
  }

  public decrypt(encryptedValue){
    let base64EncodedKeyFromJava = "bXVzdGJlMTZieXRlc2tleQ==";
    let keyForCryptoJS = crypto.enc.Base64.parse(base64EncodedKeyFromJava);
  
    let decryptedData = crypto.AES.decrypt(
      encryptedValue,
      keyForCryptoJS,
      {mode: crypto.mode.ECB,
      padding : crypto.pad.Pkcs7}
      );
    return decryptedData.toString(crypto.enc.Utf8);
  }
}
