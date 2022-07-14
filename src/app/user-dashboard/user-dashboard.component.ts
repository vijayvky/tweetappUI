import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login-service.service';
import { TweetServiceService } from '../services/tweets/tweet-service.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  @ViewChild('addform')
  addform: ElementRef;
  userName: string;
  lastTweet: any;
  tweetCreate: FormGroup;
  user: any;
  comment: string;
  searchUser: string;
  name: string;
  tweetText: string;
  updateTweetText: string;
  showcomments: boolean = false;
  tweetId: string;
  tweetUpdate: FormGroup;
  allUsers: any;
  constructor(
    private tweetService: TweetServiceService,
    public loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLatestTweet();

    this.getWelcomeUserName();
    this.tweetCreate = this.fb.group({
      tweetText: ['', [Validators.required]],
    });
    this.tweetUpdate = this.fb.group({
      tweetText: ['', [Validators.required]],
    });
  }

  getWelcomeUserName() {
    const fullName =
      localStorage.getItem('firstName') == null
        ? ''
        : localStorage.getItem('firstName');
    if (fullName != null) {
      this.userName = fullName;
    }
  }

  getLastUpdatedTweet() {
    this.getLatestTweet();
  }

  getLatestTweet() {
    this.tweetService.getAllTweets().subscribe((data) => {
      this.lastTweet = data;
      console.log('nbh >' + JSON.stringify(this.lastTweet));
    });
    console.log(this.lastTweet);

    const loginId =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');
    if (loginId != null) {
      this.loginService.getUserByUserName(loginId).subscribe((data) => {
        this.user = data;
      });
    }
  }
  likeTweet(tweetId: string) {
    const loginId =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');
    if (loginId != null) {
      this.tweetService.addLike(loginId, tweetId).subscribe((data) => {
        this.getLatestTweet();
      });
    }
  }

  reply() {
    const loginId =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');
    if (loginId != null) {
      this.tweetService
        .addComment(loginId, this.tweetId, this.comment)
        .subscribe(
          (data) => {
            this.getLatestTweet();
            location.reload();
          },
          (err) => {
            alert(err.message);
          }
        );
    }
  }

  search() {
    this.loginService.getUserByUserName(this.searchUser).subscribe((data) => {
      this.router.navigate(['/search', this.searchUser]);
    });
  }

  addTweet() {
    const loginId =
      localStorage.getItem('loginId') == null
        ? ''
        : localStorage.getItem('loginId');
    if (loginId != null) {
      const newTweet = {
        tweetText: this.tweetText,
      };
      this.tweetService.createTweet(loginId, newTweet).subscribe((data) => {
        this.getLatestTweet();
      });
    }
  }

  public onOpenModal(): void {
    console.log('in modal');
    this.tweetText = '';
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addTweetModal');
    container?.appendChild(button);
    button.click();
  }

  public onOpenCommentModal(tempTweetId: string): void {
    this.comment = '';
    this.tweetId = tempTweetId;
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addCommentModal');
    container?.appendChild(button);
    button.click();
  }

  onLogoutClick() {
    console.log('in logout');
    this.loginService.logout();
    this.router.navigate(['/login']);
    return false;
  }

  // onKeyPress(event: any) {
  //   this.loginService.getAllUsers().subscribe((data) => {
  //     this.allUsers = data.filter((sectors: any) => {
  //       return sectors.loginId
  //         .toLowerCase()
  //         .includes(event.target.value.toLowerCase());
  //     });
  //     console.log(this.allUsers);
  //   });
  // }
}
