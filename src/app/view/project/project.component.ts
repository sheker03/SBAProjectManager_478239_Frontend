import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProjectTable, ProjectDetails } from 'src/app/model/projectTable';
import { ServiceProjectService } from 'src/app/service/service-project.service';
import { FormModelComponent } from 'src/app/form-model/form-model.component';
import { UserTable } from 'src/app/model/userTable';
import { ServiceTaskService } from 'src/app/service/service-task.service';
import { ServiceUserService } from 'src/app/service/service-user.service';
import { Console } from '@angular/core/src/console';
import { FilterPipePipe } from 'src/app/pipe/filter-pipe.pipe';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectForm = new FormGroup({
    Project_ID: new FormControl(),
    Project_Name: new FormControl('', Validators.required),
    Start_Date: new FormControl(),
    End_Date: new FormControl(),
    Priority: new FormControl(),
    NoOfTasks: new FormControl(),
    NoOfTasksCompleted: new FormControl(),
    Manager: new FormControl()
  });

  txtSearchProject: string;
  sortingName: string;
  isDesc: boolean;
  txtSearchTarget : string;

  IsStartEndDateEnabled: boolean;
  newProject: ProjectDetails;
  allProjects: ProjectTable[] = [];
  allProjectDetails: ProjectDetails[] = [];
  selectedManager: UserTable;
  selectedManagerName: string = "";
  allUser: UserTable[];
  constructor(private projectService: ServiceProjectService, private userService: ServiceUserService,
    private taskService: ServiceTaskService)//, private modalService: NgbModal)
  { }

  ngOnInit() {
    this.getAllProjectDetails();
    this.getAllUsers();
  }

  isDatesEnabled(event: any) {
    this.IsStartEndDateEnabled = event.target.checked;
  }



  getAllProjectDetails() {
    this.projectService.getProjectDetails().subscribe(data => { this.allProjectDetails = data });
  }
  getAllProjects() {
    this.projectService.getProjects().subscribe(data => { this.allProjects = data });
  }


  onSubmit() {
    if (this.projectForm.valid) {
      this.newProject = this.projectForm.value;
      if (!this.newProject.Project_ID) {
        //add new project
        this.projectService.addProject(this.newProject).subscribe(data => {

          if (data.Project_ID != "" && data.Project_ID != null) {

            this.allProjectDetails.push(data);
            if (this.selectedManagerName != "") {
              this.selectedManager.Project_ID = data.Project_ID;
              this.userService.updateUser(this.selectedManager).subscribe(userData => { console.log('Manager Updated') });
            }
            this.resetProjectForm();
            alert("Project Added");
          }
          else {
            alert("Project not added");
          }
        });
      }
      else {
        //update existing project
        this.projectService.updateProject(this.newProject).subscribe(data => {

          if (data.Project_ID != "" && data.Project_ID != null) {
            
            this.allProjectDetails.splice(this.allProjects.findIndex(a => a.Project_ID == this.newProject.Project_ID), 1);
            this.allProjectDetails.push(data);
            if (this.selectedManagerName != "") {
              this.selectedManager.Project_ID = data.Project_ID;
              this.userService.updateUser(this.selectedManager).subscribe(userData => { console.log('Manager Updated') });
            }
            this.resetProjectForm();
            alert("Project Updated'");
          }
          else {
            alert("Project not updated");
          }
        });
      }

    }
    else {
      alert('Please enter the valid details.');
    }
  }
 
  resetProjectForm() {
    this.projectForm.reset();
    this.selectedManager = null;
    this.selectedManagerName = "";
    document.getElementById("btnSubmit").innerHTML = "Add Project"
  }

  updateProject(projectToUpdate: ProjectDetails) {

    if (projectToUpdate.Manager) {
      this.selectedManager = projectToUpdate.Manager;
      this.selectedManagerName = projectToUpdate.Manager.First_Name;
    }
    this.projectForm.setValue(projectToUpdate);
    document.getElementById("btnSubmit").innerText = "Update Project"
  }

  suspendProject(projectToSuspend: ProjectDetails) {
    this.projectService.deleteProject(projectToSuspend.Project_ID).subscribe(data => {
      if (data) {
        this.allProjects.splice(this.allProjects.findIndex(a => a.Project_ID == projectToSuspend.Project_ID), 1);
      }
      else {
        alert("Project is not deleted");
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

  getAllUsers() {

    this.userService.getUsers().subscribe(data => {
      this.allUser = data
    });
  }


  SelectData(event: any, selectedData: any) {
    if (event.target.checked) {

      this.selectedManager = selectedData;

    }
  }



  searchUser() {
    
    (<HTMLInputElement>document.getElementById("txtSearchTarget")).value = "";
    this.selectedManager = new UserTable();
    this.selectedManagerName = '';
    this.getAllUsers();

  }

  addManager() {
    this.selectedManagerName = this.selectedManager.First_Name;
  }

}
