import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/users/user.service';
import { ConfirmacionUserComponent } from 'src/app/user-confirmacion/confirmacion-user/confirmacion-user.component';
import { UserFormComponent } from 'src/app/user-form/user-form.component';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();

  close() {
    this.closeSidenav.emit();
  }

userList!: MatTableDataSource<User>;
columnsHeader=["date","name", "email", "phone", "status", "opciones"]

  constructor(private userService:UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userListMethod();
  }

  userListMethod(){
    try{
      this.userService.getUser()
      .subscribe(item => this.userList= new MatTableDataSource(item))
      
    }catch(error){
      console.log(error);
      
    }
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;

    this.userList.filter=filterValue.trim();
  }

  openDialog(){
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result: any) =>{
      console.log('The dialog was closed');
      if (result){
        this.userListMethod();
      }
      
    });
  }

  deleteDialog(id:string) {
    const dialogRef = this.dialog.open(ConfirmacionUserComponent, {
      data: null,
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
     if(result){
      this.deleteProduct(id)
     }
    });
  }
  
  deleteProduct(id:string){
    try{
    this.userService.delete(id).subscribe(item=>console.log(item))
    this.userListMethod();
  
    }catch(error){
  
    }
  }
  
  editDialog(element:User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: element,
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
     if(result){
      this.userListMethod();
     }
    });
  }
  
  
  }
