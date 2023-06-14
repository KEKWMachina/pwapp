import { ActivatedRoute } from '@angular/router';
import { Component, Input, WritableSignal, signal } from '@angular/core';

import { combineLatest } from 'rxjs';

import { HomePageService } from 'src/app/services/homepage.service';
import { Album } from 'src/app/interfaces/albums.model';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss'],
})
export class AlbumCardComponent {
  @Input() id: string;

  public selectedAlbum: WritableSignal<Album> = signal({} as any);

  constructor(
    private route: ActivatedRoute,
    private homepageService: HomePageService
  ) {}

  ngOnInit() {
    combineLatest({
      params: this.route.params,
      albums: this.homepageService.getAlbums(),
    }).subscribe((res) => {
      const album = res.albums.find(
        (album) => album.id === Number(res.params['id'])
      ) as Album;

      this.selectedAlbum.set(album);
    });
  }
}
