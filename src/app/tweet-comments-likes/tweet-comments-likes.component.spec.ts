import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TweetCommentsLikesComponent } from './tweet-comments-likes.component';

describe('TweetCommentsLikesComponent', () => {
  let component: TweetCommentsLikesComponent;
  let fixture: ComponentFixture<TweetCommentsLikesComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: '' },
  } as unknown as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TweetCommentsLikesComponent],
      providers: [
        HttpClient,
        FormBuilder,
        HttpHandler,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetCommentsLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
