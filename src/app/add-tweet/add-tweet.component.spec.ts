import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AddTweetComponent } from './add-tweet.component';

describe('AddTweetComponent', () => {
  let component: AddTweetComponent;
  let fixture: ComponentFixture<AddTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTweetComponent],
      imports: [RouterTestingModule],
      providers: [HttpClient, FormBuilder, HttpHandler],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
