import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../services/login/login-service.service';
import { TweetServiceService } from '../services/tweets/tweet-service.service';

@Component({
  selector: 'app-user-tweet',
  templateUrl: './user-tweet.component.html',
  styleUrls: ['./user-tweet.component.css'],
})
export class UserTweetComponent implements OnInit {
  tweet: any;
  comments: any = [];
  likes: any = [];
  liked: boolean;
  user: any;
  firstName: string;
  lastName: string;
  userId: string;
  tweetId: string;
  addCommentForm: FormGroup;
  addLikeForm: FormGroup;
  submitted = false;
  displayNoCommentsData: string;

  constructor(
    private authorizedService: LoginService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tweetService: TweetServiceService
  ) {}

  ngOnInit(): void {
    this.addCommentForm = this.fb.group({
      comments: ['', Validators.required],
    });
    this.addLikeForm = this.fb.group({
      like: [''],
    });
    this.route.params?.subscribe((params: Params) => {
      this.tweetId = params['tweetId'];
      this.getTweetById(this.tweetId);
    });
    this.liked = false;
  }

  private getTweetById(tweetId: string) {
    const userId =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');
    console.log('loginId ' + userId);
    if (userId != null) {
      this.authorizedService.getUserByUserName(userId).subscribe((data) => {
        this.tweet = data;
        console.log(this.tweet);
        this.tweetService.getTweetsByUserName(userId).subscribe((data) => {
          console.log(data);
          this.user = data;
          this.firstName = this.user.firstName;
          this.lastName = this.user.lastName;
        });
        this.tweetService.getTweetLikesById(tweetId).subscribe((data) => {
          this.likes = data;

          var isPresent = this.likes.some(function (el: any) {
            return el.userId === userId;
          });
          if (isPresent == true) {
            this.liked = true;
          } else {
            this.liked = false;
          }
          console.log(isPresent);
        });

        // this.authorizedService
        //   .getTweetCommentsById(tweetId)
        //   .subscribe((data) => {
        //     this.comments = data;
        //     console.log(this.comments.length);
        //     if (this.comments.length > 0) {
        //       this.displayNoCommentsData = 'true';
        //     } else {
        //       this.displayNoCommentsData = 'false';
        //     }
        //   });
      });
    }
  }

  toggle(tweetId: string) {
    const loginId =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');

    if (loginId != null) {
      this.tweetService.addLike(loginId, tweetId).subscribe((data) => {
        console.log(data);
        this.getTweetById(tweetId);
      });
    }
  }

  addComments(tweetId: string) {
    const loginId =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');

    this.submitted = true;
    console.log(this.addCommentForm.invalid);
    if (this.addCommentForm.invalid) {
      return;
    }

    const userComment = {
      comment: this.addCommentForm.value.comments,
    };
    if (loginId != null) {
      this.tweetService
        .addComment(loginId, tweetId, userComment)
        ?.subscribe((data) => {
          console.log(data);
          this.getTweetById(tweetId);
        });
    }
  }
}
