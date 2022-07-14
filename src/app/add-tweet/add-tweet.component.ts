import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login-service.service';
import { TweetServiceService } from '../services/tweets/tweet-service.service';

@Component({
  selector: 'app-add-tweet',
  templateUrl: './add-tweet.component.html',
  styleUrls: ['./add-tweet.component.css'],
})
export class AddTweetComponent implements OnInit {
  Tweet: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private tweetService: TweetServiceService
  ) {}

  ngOnInit(): void {
    this.Tweet = this.fb.group({
      tweetDescription: ['', [Validators.required, Validators.maxLength(144)]],
    });
  }

  OnSubmit() {
    this.submitted = true;
    if (this.Tweet.invalid) {
      return;
    }

    const loginId =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');
    console.log('login id ' + loginId);
    const tweet = {
      tweetText: this.Tweet.value.tweetDescription,
    };
    if (loginId != null) {
      this.tweetService.createTweet(loginId, tweet).subscribe((data) => {
        if (data != null) {
          this.router.navigate(['/my-tweets']);
        } else {
          console.log('error');
        }
      });
    }
  }
}
