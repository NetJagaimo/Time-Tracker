import { Component, OnInit } from '@angular/core';
import { Time } from '../time.model';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { RxDatabase } from 'rxdb';

@Component({
  selector: 'app-traywindow',
  templateUrl: './traywindow.component.html',
  styleUrls: ['./traywindow.component.css']
})
export class TraywindowComponent implements OnInit {
  doing: string;
  currentTotalSeconds: number = 0;
  startTime: number;
  endTime: number;
  timer: any;
  currentTimePassed: Time = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  isPaused: boolean = false;
  db: RxDatabase;

  doingFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void { 
    
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
    this.databaseService.recordTaskEndTime(this.doing, this.endTime);
  }

  onEnter(value: string): void {
    value = value.trim()
    if(value) {
      this.doing = value;
      this.recordStartTime();
      this.startTimer();
      this.databaseService.addTasks(this.doing, this.startTime);
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
      this.currentTotalSeconds++;
      this.countCurrentTimePassed();
    }, 1000);
  }

  countCurrentTimePassed() {
    this.currentTimePassed = {
      seconds: this.currentTotalSeconds % 60,
      minutes: Math.floor(this.currentTotalSeconds / 60) % 60,
      hours: Math.floor(this.currentTotalSeconds / 3600)
    };
  }

  stopTimer() {
    this.isPaused = true;
    clearInterval(this.timer);
  }
}
