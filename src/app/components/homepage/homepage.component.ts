import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { map, mergeMap, switchMap } from 'rxjs';

import { HomePageService } from 'src/app/services/homepage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomePageComponent implements OnInit {
  public posts$ = this.homepageService.getPosts();
  public albums$ = this.homepageService.getAlbums();

  public isAuthenticatedUser = toSignal(this.loginService.authStatusObserver);

  public loginFormGroup = this.formBuilder.group({
    name: '',
    password: '',
  });

  constructor(
    private homepageService: HomePageService,
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.posts$
      .pipe(
        mergeMap((post) =>
          this.albums$.pipe(
            map((album) => {
              return post.map((post, index) => ({
                title: album[index].title,
                body: post.body,
              }));
            })
          )
        )
      )
      .subscribe((data) => {
        //console.log('mergeMap', data);
      });

    this.posts$
      .pipe(
        switchMap((post) => {
          return post.map((post) => {
            return {
              ...post,
              title: 'new title',
            };
          });
        })
      )
      .subscribe((post) => {
        //console.log('switchMap', post);
      });
  }

  public onLoginFormSubmit(): void {
    const { name, password } = this.loginFormGroup.value as {
      name: string;
      password: string;
    };

    this.loginService.login({ name, password });
    this.loginFormGroup.reset();
  }

  public goToSignalsExample(): void {
    this.router.navigate(['home/signals']);
  }

  public goToResolvers(): void {
    this.router.navigate(['home/resolver']);
  }

  public goToAlbums(): void {
    this.router.navigate(['home/albums']);
  }
}
