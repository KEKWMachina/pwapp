import {
  Component,
  Injector,
  OnInit,
  WritableSignal,
  computed,
  effect,
  signal,
  untracked,
} from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { HomePageService } from 'src/app/services/homepage.service';
@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss'],
})
export class SignalsComponent implements OnInit {
  private posts$ = this.homepageService.getPosts();

  public user: WritableSignal<string> = signal('User Signal');
  public name: WritableSignal<string> = signal('Name Signal');

  public usersObservable = toObservable(this.user);
  public postsSignal = toSignal(this.posts$);

  public untrackedComputed = computed(
    () => untracked(() => this.user()) + this.name()
  );
  public trackedComputed = computed(() => this.user() + this.name());

  constructor(
    private homepageService: HomePageService,
    private injector: Injector
  ) {}

  public ngOnInit(): void {
    effect(
      () => {
        console.log('Singal Effect Log', this.user());
      },
      { injector: this.injector }
    );
    this.usersObservable.subscribe((users) => {
      console.log('Users Observable log', users);
    });
  }

  public changeName(): void {
    this.name.update((oldName) => `${oldName} Updated Name`);
  }

  public changeUser(): void {
    this.user.update((oldVal) => `${oldVal} Mutaded User`);
  }

  public setName(): void {
    this.name.set('New Name');
  }

  public setUser(): void {
    this.user.set('New User');
  }
}
