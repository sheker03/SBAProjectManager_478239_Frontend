import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Console } from '@angular/core/src/console';
import { HttpParams } from '@angular/common/http/src/params';
import { UserTable } from 'src/app/model/userTable';
const httpOptions = {headers : new HttpHeaders({'Content-Type' : 'application/json'})
}; 
@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {

  constructor(private http : HttpClient) { }

  getUsers():Observable<UserTable[]>{
    return this.http.get<UserTable[]>('http://localhost/ProjectManager.API/' + 'GetAllUsers');
    //  .pipe(map((res:Response)=> res.json()));
  }

  getUserByID(userID: string):Observable<UserTable>{
    return this.http.get<UserTable>('http://localhost/ProjectManager.API/' + 'GetUserByID',{params : {id:userID}});
  }


  addUser(userToAdd : UserTable) : Observable<UserTable>{
     console.log(JSON.stringify({ userToAdd }));
     return this.http.post<UserTable>('http://localhost/ProjectManager.API/' + 'PostUser',  userToAdd, httpOptions );
  }

  updateUser(userToUpdate : UserTable):Observable<UserTable>{
    return this.http.put<UserTable>('http://localhost/ProjectManager.API/' + 'UpdateUser',  userToUpdate, httpOptions);
  }

  deleteUser(userID: string):Observable<any>{
      return this.http.delete<any>('http://localhost/ProjectManager.API/' + 'DeleteUser',{params : {id:userID}});
  }
}
