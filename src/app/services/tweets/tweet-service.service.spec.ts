import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TweetServiceService } from './tweet-service.service';

describe('TweetServiceService', () => {
  let service: TweetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TweetServiceService],
    });
    service = TestBed.inject(TweetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
