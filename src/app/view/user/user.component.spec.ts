import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterPipePipe } from 'src/app/pipe/filter-pipe.pipe';
import { OrderPipePipe } from 'src/app/pipe/order-pipe.pipe';
import { HttpClientModule } from '@angular/common/http';
import { UserTable } from 'src/app/model/userTable';
import { ServiceTaskService } from 'src/app/service/service-task.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ServiceUserService } from 'src/app/service/service-user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let getAllUsersSpy : any;
  let testAllUsers: UserTable[];

  beforeEach(async(() => {
    const userServiceSpy = jasmine.createSpyObj('ServiceUserService',['getUsers'] );
    getAllUsersSpy = userServiceSpy.getUsers.and.returnValue(of(testAllUsers));
    TestBed.configureTestingModule({
      imports:[FormsModule, ReactiveFormsModule,RouterTestingModule, HttpClientModule],
      declarations: [ UserComponent,FilterPipePipe, OrderPipePipe  ],
      providers:[UserComponent, {provide:ServiceUserService, useValue:userServiceSpy}]
    })
    .compileComponents();
    component = TestBed.get(UserComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test_getAllUsers', () =>{
    component.ngOnInit();
 expect(getAllUsersSpy.calls.any()).toBe(true, 'getAllUsers called');
  });
});
