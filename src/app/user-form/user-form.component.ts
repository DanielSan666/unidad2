import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListUserComponent } from '../component/users/list-user/list-user.component';
import { User } from '../model/user';
import { UserService } from '../service/users/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ListUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      username: [this.data ? this.data.username : '', Validators.required],
      lastName: [this.data ? this.data.lastName : '', Validators.required],
      email: [this.data ? this.data.email : '', Validators.required],
      phone: [this.data ? this.data.phone : '', Validators.required],
      password: ['']
    });
  }

  onSave() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

  save_user(): void {
    const request = {
      id: this.data ? this.data._id : null,
      username: this.formGroup.value.username,
      lastName: this.formGroup.value.lastName,
      email: this.formGroup.value.email,
      phone: this.formGroup.value.phone,
      password: this.formGroup.value.password || undefined,
    };

    if (!this.data) {
      this.userService.addUser(request).subscribe(
        (item: any) => {
          console.log(item);
          this.dialogRef.close(true);
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      this.userService.editUser(request).subscribe(
        (item: any) => {
          console.log(item);
          this.dialogRef.close(true);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
