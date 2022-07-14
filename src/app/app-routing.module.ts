import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTweetComponent } from './add-tweet/add-tweet.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { MyTweetsComponent } from './my-tweets/my-tweets.component';
import { RegisterComponent } from './register/register.component';
import { TweetsComponent } from './tweets/tweets.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserTweetComponent } from './user-tweet/user-tweet.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: UserDashboardComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'all-tweets',
    component: TweetsComponent,
    canActivate: [AuthGuardGuard],
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'my-tweets',
    component: MyTweetsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'all-users',
    component: AllUsersComponent,
    canActivate: [AuthGuardGuard],
  },
  { path: 'search/:userName', component: UserSearchComponent },
  {
    path: 'add-tweet',
    component: AddTweetComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'tweet/:tweetId',
    component: UserTweetComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
