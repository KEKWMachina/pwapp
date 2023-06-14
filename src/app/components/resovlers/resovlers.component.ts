import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo.model';

@Component({
  selector: 'app-resovlers',
  templateUrl: './resovlers.component.html',
  styleUrls: ['./resovlers.component.scss'],
})
export class ResovlersComponent {
  @Input() public todos: Todo[];
}
