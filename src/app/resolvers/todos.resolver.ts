import { ResolveFn } from '@angular/router';
import { Todo } from '../interfaces/todo.model';
import { inject } from '@angular/core';
import { HomePageService } from '../services/homepage.service';

export const todosResolver: ResolveFn<Todo[]> = () => {
  return inject(HomePageService).getTodos();
};
