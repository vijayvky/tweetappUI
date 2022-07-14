export interface AllTweets {
  tweets: Array<Tweets>;
}
export interface Tweets {
  tweetId: string;
  username: string;
  tweetText: string;
  firstName: string;
  lastName: string;
  tweetDate: string;
  likes: [];
  comments?: Array<Comments>;
}

export interface Comments {
  username: string;
  comment: string;
}
