import { Component, OnInit } from '@angular/core';
import { User } from './user-detail/user.model';
import { UserListService } from './user-list.service';

@Component({
  selector: 'cm2-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userSummaries?: User[];
  selectedUserNo: number = 0;

  constructor(
    private userListService: UserListService
  ) { }

  ngOnInit(): void {
    this.fetchAllUserSummary().subscribe(res => this.userSummaries = (res as User[]));
  }

  fetchAllUserSummary(){
    return this.userListService.findAllUserSummary();
  }

  getUserDetailDialog(no:number){

  }

  selectUser(no:number){
    this.selectedUserNo = no;
  }

  removeUser(){
     console.log(this.selectedUserNo);
     
  }

  addUser(){

  }

}
