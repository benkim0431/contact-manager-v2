import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  headerInfo:HttpHeaders;

  constructor(public http:HttpClient) {
    this.headerInfo = new HttpHeaders();
    this.headerInfo.set('X-My-Api-token','angular-is-awesome');
   }

   findAllUserSummary(){
     return this.http.get(`/api/v1/users`,
      { headers : this.headerInfo});
   }
}
