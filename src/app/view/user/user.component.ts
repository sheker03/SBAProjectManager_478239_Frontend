import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserTable } from 'src/app/model/userTable';
import { ServiceUserService } from 'src/app/service/service-user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm = new FormGroup(
    {
      User_ID: new FormControl(),
      First_Name: new FormControl(),
      Last_Name: new FormControl(),
      Employee_ID: new FormControl(),
      Project_ID: new FormControl(),
      Task_ID: new FormControl(),
    }
  )
  txtSearchTarget : string;
  newUser: UserTable;
  allUsers: UserTable[];
  txtSearchUser: string;
  sortingName: string;
  isDesc: boolean;
  constructor(private userService: ServiceUserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(data => { this.allUsers = data });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.newUser = this.userForm.value;
      if (!this.newUser.User_ID) {
        this.userService.addUser(this.newUser).subscribe(data => {
          if (data != null && data.User_ID != null) {
            this.allUsers.push(data);
            this.resetUserForm();
            alert("User Added");
          }
          else {
            alert("User not added");
          }
        });
      }
      else {
        this.userService.updateUser(this.newUser).subscribe(data => {
          if (data != null && data.User_ID != null) {
            this.allUsers.splice(this.allUsers.findIndex(a => a.User_ID == this.newUser.User_ID), 1);
            this.allUsers.push(data);
            this.resetUserForm();
            alert("User Updated");
          }
          else {
            alert("User not updated");
          }

        });

      }
    }
    else {
      alert('Please enter the valid details.');
    }
  }

  resetUserForm() {
    this.userForm.reset();
    document.getElementById("btnSubmit").innerText = "Add User"
  }

  editUser(userToUpdate: UserTable) {    
    this.userForm.setValue(userToUpdate);
    document.getElementById("btnSubmit").innerText = "Update User"
  }

  deleteUser(userToDelete: UserTable) {
    this.userService.deleteUser(userToDelete.User_ID).subscribe(data => {
      if (data) {
        this.allUsers.splice(this.allUsers.findIndex(a => a.User_ID == userToDelete.User_ID), 1);
      }
      else {
        alert("User is not deleted");
      }
    });
  }

  sort(name: string): void {
    if (name && this.sortingName !== name) {
      this.isDesc = false;
    } else {
      this.isDesc = !this.isDesc;
    }
    this.sortingName = name;
  }

}
