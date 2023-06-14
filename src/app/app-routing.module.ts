import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/homepage/homepage.component';
import { loginGuardFunction } from './guards/login.guard';
import { todosResolver } from './resolvers/todos.resolver';
import { SignalsComponent } from './components/signals/signals.component';
import { ResovlersComponent } from './components/resovlers/resovlers.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';

const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    component: HomePageComponent,
    //canActivateChild: [loginGuardFunction],
    children: [
      {
        path: 'signals',
        title: 'Signals',
        component: SignalsComponent,
      },
      {
        path: 'resolver',
        title: 'Resovler',
        component: ResovlersComponent,
        resolve: { todos: todosResolver },
      },
      {
        path: 'albums',
        title: 'Albums',
        component: AlbumsComponent,
      },
      { path: 'albums/:id', component: AlbumCardComponent },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomePageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
