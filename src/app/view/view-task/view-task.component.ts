
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '@angular/router/src/config';
import { TaskTable } from 'src/app/model/taskTable';
import { ServiceTaskService } from 'src/app/service/service-task.service';
import { ServiceProjectService } from 'src/app/service/service-project.service';
import { FormModelComponent } from 'src/app/form-model/form-model.component';
import { ProjectTable } from 'src/app/model/projectTable';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  txtSearchTarget : string;
  txtProject: string;
  txtProjectID: string;
  txtParentTask: number;
  txtPrioriyFrom: number;
  txtPrioriyTo: number;
  dtStartDate: Data;
  dtEndDate: Date;
  allProject: ProjectTable[];
  selectedProject: ProjectTable;

  allTask: TaskTable[];
  sortingName: string;
  isDesc: boolean;
  constructor(private taskService: ServiceTaskService, private projectService: ServiceProjectService) { }

  ngOnInit() {
  }

  getAllTasks(projectID: string) {
    this.taskService.getTasksByProjectID(projectID).subscribe(data => {
      this.allTask = data
    });
  }

  endTask(id: any) {
    let taskToEnd: TaskTable;
    if (this.allTask && this.allTask.length > 0) {
      taskToEnd = this.allTask.find(a => a.Task_ID == id);
      if (taskToEnd) {
        taskToEnd.Status = 1;
        this.taskService.updateTask(taskToEnd).subscribe(data => {
          if (data) {
            alert("Task updated");
          }
          else {
            alert("Task is not updated");
          }
        });
      }
    }
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(data => {

      if (data) {
        this.allTask.splice(this.allTask.findIndex(a => a.Task_ID == id), 1);
      }
      else {
        alert("Task is not deleted");
      }
    });
  }


  getAllProjects() {
    this.projectService.getProjects().subscribe(data => { this.allProject = data });
  }

  searchProject() {
    this.getAllProjects();
  }

  searchTask() {
    this.txtProject = this.selectedProject.Project_Name;
    this.txtProjectID = this.selectedProject.Project_ID;
    debugger;
    this.getAllTasks(this.selectedProject.Project_ID);

  }


  SelectData(event: any, selectedData: any) {
    if (event.target.checked) {

      this.selectedProject = selectedData;

    }
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
