import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../services/login/login-service.service";
import { TweetServiceService } from "../services/tweets/tweet-service.service";

@Component({
  selector: "app-my-tweets",
  templateUrl: "./my-tweets.component.html",
  styleUrls: ["./my-tweets.component.css"],
})
export class MyTweetsComponent implements OnInit {
  othersTweets: any;
  userId: number;
  userName: string;
  tweetId: string;
  updateTweetText: string;
  tweetUpdate: FormGroup;
  tweetsLength: number;
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private tweetService: TweetServiceService
  ) {}

  ngOnInit(): void {
    const loginId =
      localStorage.getItem("loginId") == null
        ? ""
        : localStorage.getItem("loginId");
    if (loginId != null) {
      this.getTweetsByUserName(loginId);
    }
    this.tweetUpdate = this.fb.group({
      tweetText: ["", [Validators.required]],
    });
  }

  private getTweetsByUserName(username: string) {
    this.tweetService.showMyTweets(username).subscribe((data) => {
      this.othersTweets = data;
      this.tweetsLength = this.othersTweets.length;
    });
  }

  likeTweet(tweetId: string) {
    const loginId =
      localStorage.getItem("loginId") == null
        ? ""
        : localStorage.getItem("loginId");

    if (loginId != null) {
      this.tweetService.addLike(loginId, tweetId).subscribe(
        (data) => {
          this.getTweetsByUserName(loginId);
        },
        (err) => {
          alert(err.message);
        }
      );
    }
  }

  editTweet() {
    const loginId =
      localStorage.getItem("loginId") == null
        ? ""
        : localStorage.getItem("loginId");

    if (loginId != null) {
      const newUpdatedTweet = {
        tweetText: this.updateTweetText,
      };
      this.tweetService
        .updateTweet(loginId, this.tweetId, newUpdatedTweet)
        .subscribe((data) => {
          this.getTweetsByUserName(loginId);
        });
    }
  }

  deleteTweet(tweetId: string) {
    const loginId =
      localStorage.getItem("loginId") == null
        ? ""
        : localStorage.getItem("loginId");

    if (loginId != null) {
      this.tweetService.deleteTweet(loginId, tweetId).subscribe(
        (data) => {
          this.getTweetsByUserName(loginId);
        },
        (err) => {
          alert(err.message);
        }
      );
    }
  }

  public onEditTweetModal(tempTweetId: string): void {
    this.tweetService.showMyTweetsById(tempTweetId).subscribe((data: any) => {
      data.forEach((element: any) => {
        console.log(element.tweetText);
        this.updateTweetText = element.tweetText;
      });
    });

    this.tweetId = tempTweetId;
    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#editTweetModal");
    container?.appendChild(button);
    button.click();
  }
}
