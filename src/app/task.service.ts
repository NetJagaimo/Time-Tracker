import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { DatabaseService } from './core/database.service';

export interface Task {
  id?: number;
  taskName: string;
  startTime: number;
  endTime?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  table: Dexie.Table<Task, number>;

  constructor(private databaseService: DatabaseService) {
    this.table = this.databaseService.table('tasks');
  }

  getAll() {
    return this.table.toArray();
  }

  addTask(data: Task) {
    return this.table.add(data);
  }

  recordTaskEndTime(id: number, endTime: number) {
    return this.table.update(id, {endTime: endTime});
  }

  remove(id: number) {
    return this.table.delete(id);
  }
}
