import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserSearchComponent } from './user-search.component';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: '' },
  } as unknown as ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSearchComponent],
      providers: [
        HttpClient,
        FormBuilder,
        HttpHandler,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
