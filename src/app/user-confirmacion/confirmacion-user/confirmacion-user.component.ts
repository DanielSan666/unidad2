import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListUserComponent } from 'src/app/component/users/list-user/list-user.component';

@Component({
  selector: 'app-confirmacion-user',
  templateUrl: './confirmacion-user.component.html',
  styleUrls: ['./confirmacion-user.component.scss']
})
export class ConfirmacionUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ListUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
