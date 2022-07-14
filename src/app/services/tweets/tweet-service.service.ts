import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TweetServiceService {
  constructor(private http: HttpClient) {}
  httpOptions1: any;
  tokenVal =
    localStorage.getItem('token') == null ? '' : localStorage.getItem('token');
  if(tokenVal: any) {
    this.httpOptions1 = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': '',
        token: tokenVal,
      }),
    };
  }

  public getTweetsByUserName(username: string) {
    return this.http
      .get(`http://localhost:8080/api/v1.0/tweets/${username}`)
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public showMyTweets(loginId: string) {
    return this.http.get(`http://localhost:8080/api/v1.0/tweets/${loginId}`);
  }

  public showMyTweetsById(tweetId: string) {
    return this.http.get(
      `http://localhost:8080/api/v1.0/tweets/byTweetId/${tweetId}`
    );
  }

  public addComment(userName: string, tweetId: string, userComment: any) {
    const comment = { comment: userComment };
    const token = this.storeToken();
    return this.http
      .post(
        `http://localhost:8080/api/v1.0/tweets/${userName}/reply/${tweetId}`,
        comment,
        {
          headers: {
            token: token,
          },
        }
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public getAllTweets() {
    return this.http
      .get(
        `http://localhost:8080/api/v1.0/tweets/all`,

        this.httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public searchUserTweet(tweetId: string) {
    return this.http
      .get(
        `http://localhost:8080/api/v1.0/tweets/${tweetId}`,

        this.httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public createTweet(userName: string, tweet: any) {
    const token = this.storeToken();
    console.log('createTweet token ->' + token);
    return this.http
      .post(`http://localhost:8080/api/v1.0/tweets/${userName}/add`, tweet, {
        headers: {
          token: token,
        },
      })
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public getTweetLikesById(tweetId: string) {
    return this.http.get(
      `http://localhost:8080/api/v1.0/tweets/getLike/${tweetId}`
    );
  }

  public getTweetCommentsById(tweetId: any) {
    return this.http
      .post(
        `http://localhost:8080/api/v1.0/tweets/${tweetId.username}/add`,
        tweetId,
        this.httpOptions1
      )
      .pipe(map((data1) => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public addLike(userName: string, tweetId: any) {
    const token = this.storeToken();
    console.log('ADD LIKE token > ' + token);
    return this.http
      .put(
        `http://localhost:8080/api/v1.0/tweets/${userName}/like/${tweetId}`,
        { responseType: 'json' },
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
      `http://localhost:8080/api/v1.0/tweets/${loginId}/update/${tweetId}`,
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
    return this.http.delete(
      `http://localhost:8080/api/v1.0/tweets/${loginId}/delete/${tweetId}`,
      {
        headers: {
          token: token,
        },
      }
    );
  }

  public storeToken() {
    const token =
      localStorage.getItem('token') == null
        ? ''
        : localStorage.getItem('token');

    if (token != null) {
      return token;
    } else {
      return '';
    }
  }
}
