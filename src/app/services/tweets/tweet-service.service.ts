import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TweetServiceService {
  constructor(private http: HttpClient) {}
  httpOptions1: any;
  tokenVal =
    localStorage.getItem("token") == null ? "" : localStorage.getItem("token");
  if(tokenVal: any) {
    this.httpOptions1 = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "",
        token: tokenVal,
      }),
    };
  }
  baseUrl =
    "http://tweetapp-env.eba-wscbspw4.us-east-1.elasticbeanstalk.com/api/v1.0/tweets";

  public getTweetsByUserName(username: string) {
    return this.http
      .get(this.baseUrl + `/${username}`)
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public showMyTweets(loginId: string) {
    return this.http.get(this.baseUrl + `/${loginId}`);
  }

  public showMyTweetsById(tweetId: string) {
    return this.http.get(this.baseUrl + `/${tweetId}`);
  }

  public addComment(userName: string, tweetId: string, userComment: any) {
    const comment = { comment: userComment };
    const token = this.storeToken();
    return this.http
      .post(this.baseUrl + `/${userName}/reply/${tweetId}`, comment, {
        headers: {
          token: token,
        },
      })
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public getAllTweets() {
    return this.http
      .get(
        this.baseUrl + `/all`,

        this.httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public searchUserTweet(tweetId: string) {
    return this.http
      .get(
        this.baseUrl + `/${tweetId}`,

        this.httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public createTweet(userName: string, tweet: any) {
    const token = this.storeToken();
    console.log("createTweet token ->" + token);
    return this.http
      .post(this.baseUrl + `/${userName}/add`, tweet, {
        headers: {
          token: token,
        },
      })
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public getTweetLikesById(tweetId: string) {
    return this.http.get(this.baseUrl + `/getLike/${tweetId}`);
  }

  public getTweetCommentsById(tweetId: any) {
    return this.http
      .post(
        this.baseUrl + `/${tweetId.username}/add`,
        tweetId,
        this.httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public addLike(userName: string, tweetId: any) {
    const token = this.storeToken();
    console.log("ADD LIKE token > " + token);
    return this.http
      .put(
        this.baseUrl + `/${userName}/like/${tweetId}`,
        { responseType: "json" },
        {
          headers: {
            token: token,
          },
        }
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public updateTweet(loginId: string, tweetId: string, value: any) {
    const token = this.storeToken();
    return this.http.put(
      this.baseUrl + `/${loginId}/update/${tweetId}`,
      value,
      {
        headers: {
          token: token,
        },
      }
    );
  }

  public deleteTweet(loginId: string, tweetId: string) {
    const token = this.storeToken();
    return this.http.delete(this.baseUrl + `/${loginId}/delete/${tweetId}`, {
      headers: {
        token: token,
      },
    });
  }

  public storeToken() {
    const token =
      localStorage.getItem("token") == null
        ? ""
        : localStorage.getItem("token");

    if (token != null) {
      return token;
    } else {
      return "";
    }
  }
}
