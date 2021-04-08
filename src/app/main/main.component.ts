import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../task.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  tasks: Array<Task> = [];
  displayedColumns: string[] = ['id', 'taskName', 'startTime', 'endTime', 'duration'];

  constructor(
    private taskService: TaskService,
    private changeDetectorRdf: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.taskService.getAll()
      .subscribe({
        next: (result: Task[]) => { 
          this.tasks = result;
          this.changeDetectorRdf.detectChanges();
        },
        error: console.error
      });
  }

  onClear() {
    this.taskService.removeAll();
  }

}
