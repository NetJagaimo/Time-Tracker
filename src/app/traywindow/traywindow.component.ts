import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Task, TaskService } from '../task.service';
import { ElectronService } from '../core/electron.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';


@Component({
  selector: 'app-traywindow',
  templateUrl: './traywindow.component.html',
  styleUrls: ['./traywindow.component.css']
})
export class TraywindowComponent implements OnInit {
  doingInput: string = "";
  doing: string = "";
  currentTotalMilliseconds: number = 0;
  startTime: number;
  endTime: number;
  timer: any;
  isPaused: boolean = false;
  taskID: number;
  doingOptions: string[] = [];
  filteredDoingOptions: Observable<string[]>;
  
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  doingFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private taskService: TaskService,
    private electronService: ElectronService
  ) { }

  ngOnInit(): void {
    this.taskService.getAll()
      .subscribe({
        next: (results: Task[]) => {
          const taskNames: string[] = results.map(result => result.taskName);
          this.doingOptions = [...new Set(taskNames)].reverse();
          this.filteredDoingOptions = this.doingFormControl.valueChanges.pipe(
            startWith(""),
            map(value => this._filter(value))
          );
        },
        error: console.error
      });
  }

  getDoingOptions() {
    this.taskService.getAll()
      .subscribe({
        next: (results: Task[]) => {
          const taskNames: string[] = results.map(result => result.taskName);
          this.doingOptions = [...new Set(taskNames)];
        },
        error: console.error
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.doingOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onEnter(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.autocomplete.closePanel();
      this.doingFormControl.disable();
      const value = this.doingInput.trim()
      if(value) {
        this.doing = value;
        this.recordStartTime();
        this.startTimer();
        
        this.taskService.addTask({
          taskName: this.doing, 
          startTime: this.startTime
        }).then((id) => {
          this.taskID = id;
        });
      } else {
        this.doingFormControl.setErrors({'required': true})
      }
    }
  }

  onStart() {
    this.recordStartTime();
    this.startTimer();
    this.taskService.addTask({
      taskName: this.doing, 
      startTime: this.startTime
    }).then((id) => {
      this.taskID = id;
    });
  }

  onPause() {
    this.recordEndTime();
    this.stopTimer();
    this.taskService.recordTaskEndTime(this.taskID, this.endTime);
  }

  onStop() {
    this.recordEndTime();
    this.stopTimer();
    this.taskService.recordTaskEndTime(this.taskID, this.endTime);
    this.reset();
    this.doingFormControl.enable();
  }

  recordStartTime() {
    this.startTime = Date.now();
  }

  recordEndTime() {
    this.endTime = Date.now();
  }

  startTimer() {
    this.isPaused = false;
    this.timer = setInterval(() => {
      this.currentTotalMilliseconds += 1000;
    }, 1000);
  }

  stopTimer() {
    this.isPaused = true;
    clearInterval(this.timer);
  }

  reset() {
    this.doing = '';
    this.currentTotalMilliseconds = 0;
    this.startTime = -1;
    this.endTime = -1;
    this.taskID = -1;
    this.isPaused = false;
  }

  openMainWindow() {
    this.electronService.createMainWindow();
  }

  exitApp() {
    if(this.doing) {
      this.recordEndTime();
      this.stopTimer();
      this.taskService.recordTaskEndTime(this.taskID, this.endTime).then(() => {
        this.electronService.exitApp();
      });
    } else {
      this.electronService.exitApp();
    } 
  }

  showEvent($event) {
    console.dir($event);
  }

}
