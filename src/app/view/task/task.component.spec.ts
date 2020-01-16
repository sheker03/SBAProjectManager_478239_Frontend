import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterPipePipe } from 'src/app/pipe/filter-pipe.pipe';
import { OrderPipePipe } from 'src/app/pipe/order-pipe.pipe';
import {HttpClientModule} from '@angular/common/http';
import { TaskTable } from 'src/app/model/taskTable';
import { of } from 'rxjs';
import { ServiceTaskService } from 'src/app/service/service-task.service';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let getAllTaskSpy : any;
  let testAllTasks: TaskTable[];

  beforeEach(async(() => {
    const taskServiceSpy = jasmine.createSpyObj('ServiceTaskService',['getTaskByID'] );
    getAllTaskSpy = taskServiceSpy.getTaskByID.and.returnValue(of(testAllTasks));
    TestBed.configureTestingModule({
      imports:[FormsModule, ReactiveFormsModule,RouterTestingModule, HttpClientModule],
      declarations: [ TaskComponent, FilterPipePipe, OrderPipePipe  ],
      providers:[TaskComponent, {provide:ServiceTaskService, useValue:taskServiceSpy}]
    })
    .compileComponents();
    component = TestBed.get(TaskComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test_getTaskByID', () =>{
    component.ngOnInit();
 expect(getAllTaskSpy.calls.any()).toBe(false, 'getTaskByID called');
  });
});
