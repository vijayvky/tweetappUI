import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { MyTweetsComponent } from './my-tweets.component';

describe('MyTweetsComponent', () => {
  let component: MyTweetsComponent;
  let fixture: ComponentFixture<MyTweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyTweetsComponent],
      providers: [HttpClient, FormBuilder, HttpHandler],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
