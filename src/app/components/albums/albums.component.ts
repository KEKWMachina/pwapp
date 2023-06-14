import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { HomePageService } from 'src/app/services/homepage.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent {
  public albums = toSignal(this.homepageService.getTodos());

  constructor(
    private homepageService: HomePageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public selectAlbum(albumId: number): void {
    this.router.navigate([`${albumId}`], { relativeTo: this.route });
  }
}
