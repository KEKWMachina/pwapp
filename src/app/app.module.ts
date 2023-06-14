import { NgModule, isDevMode } from '@angular/core';
import { RouteReuseStrategy, TitleStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/homepage/homepage.component';
import { SignalsComponent } from './components/signals/signals.component';
import { ResovlersComponent } from './components/resovlers/resovlers.component';
import { TemplatePageTitleStrategy } from './strategies/title.strategy';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { CustomRouteReuseStrategy } from './strategies/router-reuse.strategy';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignalsComponent,
    ResovlersComponent,
    AlbumsComponent,
    AlbumCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
