import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../task.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  tasks: Array<Task>;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskService.getAll()
      .subscribe({
        next: result => this.tasks = result,
        error: console.error
      });
  }

}
