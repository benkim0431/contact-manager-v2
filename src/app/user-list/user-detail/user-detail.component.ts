import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDetailService } from './user-detail.service';
import { User } from './user.model';

@Component({
  selector: 'cm2-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  isAddMode:boolean = false;
  userNo: number = 0;
  user:User = new User();

  constructor(
    private dialogRef: MatDialogRef<UserDetailComponent>,
    private userDetailService: UserDetailService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(this.userNo !== 0){
        this.getUser(this.userNo);
    }
  }

  getUser(no: number){
      this.userDetailService.findUser(no).subscribe(user => this.user = user as User);
  }

  modifyUser(){
      if(this.isAddMode){
        this.userDetailService.addUser(this.user).subscribe(res => {
          this.snackBar.open('Register User Info','Complete',{
            duration:2000
          });
          this.dialogRef.close();
        });
        return;
      }

      this.userDetailService.modifyUser(this.user).subscribe(res => {
        this.snackBar.open('Update User Info','Complete',{
          duration: 2000
        });
        this.dialogRef.close();
      });

  }

  closeDialog(){
      this.dialogRef.close();
  }

}
