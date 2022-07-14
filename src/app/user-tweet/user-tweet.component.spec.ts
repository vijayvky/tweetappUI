import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserTweetComponent } from './user-tweet.component';

describe('UserTweetComponent', () => {
  let component: UserTweetComponent;
  let fixture: ComponentFixture<UserTweetComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: '' },
  } as unknown as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTweetComponent],
      providers: [
        HttpClient,
        FormBuilder,
        HttpHandler,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
