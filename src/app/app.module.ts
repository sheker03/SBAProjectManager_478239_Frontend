import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProjectComponent } from './view/project/project.component';
import { UserComponent } from './view/user/user.component';
import { TaskComponent } from './view/task/task.component';
import { ViewTaskComponent } from './view/view-task/view-task.component';
import {ServiceProjectService} from './service/service-project.service'
import {ServiceTaskService} from './service/service-task.service'
import {ServiceUserService} from './service/service-user.service';
import { FormModelComponent } from './form-model/form-model.component';
import { FilterPipePipe } from './pipe/filter-pipe.pipe';
import { OrderPipePipe } from './pipe/order-pipe.pipe';
import { Component } from '@angular/core/src/metadata/directives';
import {DatePipe} from '@angular/common';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const appRoutes:Routes= [
  {path:'', redirectTo:'/Project', pathMatch:'full'},
  {path:'Project', component:ProjectComponent},
  {path:'Task/:Task_ID', component:TaskComponent},
  {path:'User', component:UserComponent},
  {path:'ViewTask', component:ViewTaskComponent}

];

@NgModule({
  declarations: [
    AppComponent,    
    ProjectComponent,
    UserComponent,
    TaskComponent,
    ViewTaskComponent,
    FilterPipePipe,
    OrderPipePipe,
    FormModelComponent,
  ],
  imports: [
    BrowserModule,    
    RouterModule.forRoot(appRoutes, {enableTracing:true}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule//,
    //NgbModule
  ],
  providers: [ServiceProjectService, ServiceTaskService, ServiceUserService],
  bootstrap: [AppComponent],
  entryComponents : [FormModelComponent]
})
export class AppModule { }
