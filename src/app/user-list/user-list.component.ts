import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailService } from './user-detail/user-detail.service';
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
    private userListService: UserListService,
    private userDetailService: UserDetailService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchAllUserSummary().subscribe(res => this.userSummaries = (res as User[]));
  }

  fetchAllUserSummary(){
    return this.userListService.findAllUserSummary();
  }

  getUserDetailDialog(no:number){
    const dialogRef = this.dialog.open(UserDetailComponent,{ width :'20%'});
    dialogRef.componentInstance.isAddMode = false;
    dialogRef.componentInstance.userNo = no;
  }

  selectUser(no:number){
    this.selectedUserNo = no;
  }

  removeUser(){
     console.log(this.selectedUserNo);
     this.userDetailService.removeUser(this.selectedUserNo)
      .pipe(switchMap(()=>this.fetchAllUserSummary()))
      .subscribe(res => this.userSummaries = res as User[]);
  }

  addUser(){
      const dialogRef = this.dialog.open(UserDetailComponent,{width:'20%'});
      dialogRef.componentInstance.isAddMode = true;
      dialogRef.componentInstance.userNo = 0;
      dialogRef.afterClosed().pipe(switchMap(()=> this.fetchAllUserSummary()))
      .subscribe(res => this.userSummaries = res as User[]);
  }

}
