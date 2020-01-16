import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import{} from 'jasmine';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterPipePipe } from 'src/app/pipe/filter-pipe.pipe';
import { OrderPipePipe } from 'src/app/pipe/order-pipe.pipe';
import {HttpClientModule} from '@angular/common/http';
import { ProjectTable } from 'src/app/model/projectTable';
import { of } from 'rxjs';
import { ServiceProjectService } from 'src/app/service/service-project.service';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let getAllProjectsSpy : any;
  let testAllProjects: ProjectTable[];

  beforeEach(async(() => {
    const projectServiceSpy = jasmine.createSpyObj('ServiceProjectService',['getProjectDetails'] );
    getAllProjectsSpy = projectServiceSpy.getProjectDetails.and.returnValue(of(testAllProjects));
    TestBed.configureTestingModule({
      imports:[FormsModule, ReactiveFormsModule,RouterTestingModule, HttpClientModule],
      declarations: [ ProjectComponent, FilterPipePipe, OrderPipePipe  ],
      providers:[ProjectComponent, {provide:ServiceProjectService, useValue:projectServiceSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test_getProjectDetails', () =>{
    component.ngOnInit();
 expect(getAllProjectsSpy.calls.any()).toBe(true, 'getProjectDetails called');
  });
});
