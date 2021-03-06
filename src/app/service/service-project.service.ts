import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Console } from '@angular/core/src/console';
import { HttpParams } from '@angular/common/http/src/params';
import { ProjectTable, ProjectDetails } from 'src/app/model/projectTable';
const httpOptions = {headers : new HttpHeaders({'Content-Type' : 'application/json'})
}; 


@Injectable({
  providedIn: 'root'
})
export class ServiceProjectService {

  constructor(private http:HttpClient) { }

  getProjects():Observable<ProjectTable[]>{
    return this.http.get<ProjectTable[]>('http://localhost/ProjectManagerService/' + 'GetAllProjects');  
  }

  getProjectByID(projectID: string):Observable<ProjectTable>{
    return this.http.get<ProjectTable>('http://localhost/ProjectManagerService/' + 'GetProjectByID',{params : {id:projectID}});
  }

  getProjectDetails():Observable<ProjectDetails[]>{
    return this.http.get<ProjectDetails[]>('http://localhost/ProjectManagerService/' + 'GetAllProjectDetails');
  }


  addProject(projectToAdd : ProjectDetails) : Observable<ProjectDetails>{
     console.log(JSON.stringify({ projectToAdd }));
     return this.http.post<ProjectDetails>('http://localhost/ProjectManagerService/' + 'PostProject',  projectToAdd, httpOptions );
  }

  updateProject(projectToUpdate : ProjectDetails):Observable<ProjectDetails>{
    return this.http.put<ProjectDetails>('http://localhost/ProjectManagerService/' + 'UpdateProject',  projectToUpdate, httpOptions);
  }

  deleteProject(projectID: string):Observable<any>{
      return this.http.delete<any>('http://localhost/ProjectManagerService/' + 'DeleteProject',{params : {id:projectID}});
  }
}
