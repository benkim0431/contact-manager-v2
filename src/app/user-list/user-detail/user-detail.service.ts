import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  headerInfo: HttpHeaders;
  constructor(public http:HttpClient) {
    this.headerInfo = new HttpHeaders();
    this.headerInfo.set('X-My-Api-token','angular-is-awesome');
   }

   findUser(no: number){
      return this.http.get(`/api/v1/users/${no}`,
        { headers: this.headerInfo });
   }

   addUser(user:any){
      return this.http.post(`/api/v1/users`,user,
        {headers: this.headerInfo});
   }

   modifyUser(user:User){
      return this.http.put(`/api/v1/users/${user.no}`, user,
        {headers: this.headerInfo});
   }

   removeUser(userNo:any){
      return this.http.delete(`/api/v1/users/${userNo}`,
        {headers:this.headerInfo});
   }
}
