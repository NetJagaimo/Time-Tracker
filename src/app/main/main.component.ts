import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Task, TaskService } from '../task.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  tasks: Array<Task> = [];
  displayedColumns: string[] = ['id', 'taskName', 'startTime', 'endTime'];

  @ViewChild(MatTable) table: MatTable<Task>;

  constructor(
    private taskService: TaskService,
    private changeDetectorRdf: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('init');
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
