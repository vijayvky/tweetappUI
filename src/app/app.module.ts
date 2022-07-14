import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TweetsComponent } from './tweets/tweets.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MyTweetsComponent } from './my-tweets/my-tweets.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { AddTweetComponent } from './add-tweet/add-tweet.component';
import { TweetCommentsLikesComponent } from './tweet-comments-likes/tweet-comments-likes.component';
import { UserTweetComponent } from './user-tweet/user-tweet.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavBarComponent,
    TweetsComponent,
    UserDashboardComponent,
    ForgotPasswordComponent,
    MyTweetsComponent,
    AllUsersComponent,
    UserSearchComponent,
    AddTweetComponent,
    TweetCommentsLikesComponent,
    UserTweetComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
