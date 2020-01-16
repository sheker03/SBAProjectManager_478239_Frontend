
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskTable } from 'src/app/model/taskTable';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Console } from '@angular/core/src/console';
import { HttpParams } from '@angular/common/http/src/params';
const httpOptions = {headers : new HttpHeaders({'Content-Type' : 'application/json'})
}; 
@Injectable({
  providedIn: 'root'
})
export class ServiceTaskService {

  constructor(private http: HttpClient) { }

  getTasks():Observable<TaskTable[]>{
    return this.http.get<TaskTable[]>('http://localhost/ProjectManager.API/' + 'GetAllTasks');
    //  .pipe(map((res:Response)=> res.json()));
  }

  getTaskByID(taskID: string):Observable<TaskTable>{
    return this.http.get<TaskTable>('http://localhost/ProjectManager.API/' + 'GetTaskByID',{params : {id:taskID}});
  }

  getTasksByProjectID(projectID: string):Observable<TaskTable[]>{
    return this.http.get<TaskTable[]>('http://localhost/ProjectManager.API/' + 'GetAllTasksByProjectID',{params : {id:projectID}});
  }


  addTask(taskToAdd : TaskTable) : Observable<TaskTable>{
     console.log(JSON.stringify({ taskToAdd }));
     return this.http.post<TaskTable>('http://localhost/ProjectManager.API/' + 'PostTask',  taskToAdd, httpOptions );
  }

  updateTask(taskToUpdate : TaskTable):Observable<TaskTable>{
    return this.http.put<TaskTable>('http://localhost/ProjectManager.API/' + 'UpdateTask',  taskToUpdate, httpOptions);
  }

  deleteTask(taskID: string):Observable<any>{
      return this.http.delete<any>('http://localhost/ProjectManager.API/' + 'DeleteTask',{params : {id:taskID}});
  }
}
