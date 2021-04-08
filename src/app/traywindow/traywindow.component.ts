import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { RxDatabase } from 'rxdb';
import { ElectronService } from '../core/electron.service';

@Component({
  selector: 'app-traywindow',
  templateUrl: './traywindow.component.html',
  styleUrls: ['./traywindow.component.css']
})
export class TraywindowComponent implements OnInit {
  doing: string;
  currentTotalMilliseconds: number = 0;
  startTime: number;
  endTime: number;
  timer: any;
  isPaused: boolean = false;
  db: RxDatabase;
  taskID: number;

  doingFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private taskService: TaskService,
    private electronService: ElectronService
  ) { }

  ngOnInit(): void { 
    this.electronService.createMainWindow();
    
  }

  onStart() {
    this.recordStartTime();
    this.startTimer();
  }

  onPause() {
    this.recordEndTime();
    this.stopTimer();
  }

  onStop() {
    this.recordEndTime();
    this.stopTimer();
    this.taskService.recordTaskEndTime(this.taskID, this.endTime);
  }

  onEnter(value: string): void {
    value = value.trim()
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

}
