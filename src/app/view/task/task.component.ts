import { Component, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TaskTable } from 'src/app/model/taskTable';
import { ServiceTaskService } from 'src/app/service/service-task.service';
import { FormModelComponent } from 'src/app/form-model/form-model.component';
import { UserTable } from 'src/app/model/userTable';
import { ServiceUserService } from 'src/app/service/service-user.service';
import { ActivatedRoute } from '@angular/router';
import { ServiceProjectService } from 'src/app/service/service-project.service';
import { ProjectTable } from 'src/app/model/projectTable';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskForm = new FormGroup(
    {
      Task_ID: new FormControl(''),
      Parent_ID: new FormControl(''),
      Project_ID: new FormControl('', Validators.required),
      Task_Name: new FormControl('', Validators.required),
      Start_Date: new FormControl(''),
      End_Date: new FormControl(''),
      Priority: new FormControl(''),
      Status: new FormControl('')
    }
  )

  txtSearchTarget : string;
  newTask: TaskTable;
  isParentTask: boolean;

  selectedProjectName: string = "";
  allProject: ProjectTable[] = [];
  selectedProject: ProjectTable;

  selectedManager: UserTable;
  selectedManagerName: string = "";
  allUser: UserTable[];

  allTask: TaskTable[];
  selectedTask: TaskTable;
  selectedParentName: string = "";

  constructor(private taskService: ServiceTaskService, private userService: ServiceUserService,
    private projectService: ServiceProjectService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadTask();
  }

  loadTask() {
    if (this.route.snapshot.paramMap.get('Task_ID')) {
      this.taskService.getTaskByID(this.route.snapshot.paramMap.get('Task_ID')).subscribe(data => {
        if (data) {
          data.Start_Date = data.Start_Date.toString().split('T')[0];
          data.End_Date = data.End_Date.toString().split('T')[0];

          this.taskForm.setValue(data);
          if (data.Project_ID) {
            this.projectService.getProjectByID(data.Project_ID).subscribe(proData => {
              if (proData) {
                this.selectedProjectName = proData.Project_Name;
              }
            });
          }

          if (data.Parent_ID) {
            this.taskService.getTaskByID(data.Parent_ID).subscribe(tData => {
              if (tData) {
                this.selectedParentName = tData.Task_Name;
              }
            });
          }

          document.getElementById("btnSubmit").innerText = "Update Task";
        }
        else {
          console.log("Edit Task ID not found");
        }
      }
      );
    }
    else {
      console.log("Task ID not found");
    }
  }
  onSubmit() {
    if (this.taskForm.valid) {
      this.newTask = this.taskForm.value;
      if (!this.newTask.Task_ID) {
        //add Task
        this.taskService.addTask(this.newTask).subscribe(data => {
          if (data.Project_ID != "" && data.Project_ID != null &&
            data.Task_ID != "" && data.Task_ID != null) {
            
            if (this.selectedManagerName != "") {
              this.selectedManager.Project_ID = data.Project_ID;
              this.selectedManager.Task_ID = data.Task_ID;
              this.userService.updateUser(this.selectedManager).subscribe(userData => { console.log('Manager Updated') });
            }
            this.resetTaskForm();
            alert("Task added");
          }
          else {
            alert("Task not added");
          }
        });
      }
      else {
        //update Task
        this.taskService.updateTask(this.newTask).subscribe(data => {
          if (data.Task_ID != "" && data.Task_ID != null) {
            
            if (this.selectedManagerName != "") {
              this.selectedManager.Project_ID = this.newTask.Project_ID;
              this.selectedManager.Task_ID = this.newTask.Task_ID;
              this.userService.updateUser(this.selectedManager).subscribe(userData => { console.log('Manager Updated') });
            }

            this.resetTaskForm();
            alert("Task Updated");
          }
          else {
            alert("Task not added");
          }
        });
      }

    }
    else {
      alert('Please enter the valid details.');
    }
  }

  resetTaskForm() {
    this.taskForm.reset();
    this.selectedManager = null;
    this.selectedManagerName = "";
    this.selectedProjectName = "";
    this.selectedParentName = "";
    document.getElementById("btnSubmit").innerText = "Add Task";
  }




  isParentTaskChecked(event: any) {
    this.isParentTask = event.target.checked;

  }


  getAllProjects() {
    this.projectService.getProjects().subscribe(data => { this.allProject = data });
  }


  addProject() {
    debugger;
    this.selectedProjectName = this.selectedProject.Project_Name;
    this.taskForm.patchValue({ Project_ID: this.selectedProject.Project_ID });
  }


  selectProjectData(event: any, selectedData: any) {
    debugger;
    if (event.target.checked) {
      this.selectedProject = selectedData;

    }
  }

  searchProject() {
    this.getAllProjects();
  }

  getAllUsers() {

    this.userService.getUsers().subscribe(data => {
      this.allUser = data
    });
  }


  SelectUserData(event: any, selectedData: any) {
    if (event.target.checked) {
      this.selectedManager = selectedData;

    }
  }

  searchUser() {
    debugger;
    (<HTMLInputElement>document.getElementById("txtSearchTarget")).value = "";
    this.selectedManager = new UserTable();
    this.selectedManagerName = '';
    this.getAllUsers();

  }

  addUser() {
    this.selectedManagerName = this.selectedManager.First_Name;
  }

  getAllTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.allTask = data
    });
  }


  selectTaskData(event: any, selectedData: any) {
    if (event.target.checked) {
      this.selectedTask = selectedData;

    }
  }

  searchParent() {

    (<HTMLInputElement>document.getElementById("txtSearchTarget")).value = "";
    this.getAllTasks();

  }

  addTask() {
    this.selectedParentName = this.selectedTask.Task_Name;
    this.taskForm.patchValue({ Parent_ID: this.selectedTask.Task_ID });
  }


}
