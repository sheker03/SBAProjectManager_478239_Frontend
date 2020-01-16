import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';
import { TaskTable } from 'src/app/model/taskTable';
import { ServiceTaskService } from 'src/app/service/service-task.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import{RouterTestingModule} from '@angular/router/testing';
import { FilterPipePipe } from 'src/app/pipe/filter-pipe.pipe';
import { OrderPipePipe } from 'src/app/pipe/order-pipe.pipe'
import {HttpClientModule} from '@angular/common/http';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let getAllTasksSpy : any;
  let testAllTasks: TaskTable[];

  beforeEach(async(() => {
    const taskServiceSpy = jasmine.createSpyObj('ServiceTaskService',['getTasks'] );
    getAllTasksSpy = taskServiceSpy.getTasks.and.returnValue(of(testAllTasks));
    TestBed.configureTestingModule({
      imports:[FormsModule, ReactiveFormsModule,RouterTestingModule, HttpClientModule],
      declarations: [ ViewTaskComponent,FilterPipePipe, OrderPipePipe ],
      providers:[ViewTaskComponent, {provide:ServiceTaskService, useValue:taskServiceSpy}]
    })
    .compileComponents();
    component = TestBed.get(ViewTaskComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test_GetAllTasks', () =>{
    component.ngOnInit();
 expect(getAllTasksSpy.calls.any()).toBe(false, 'GetAllTasks called');
  });
});
