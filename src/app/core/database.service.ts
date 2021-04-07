import { Injectable } from '@angular/core';
import Dexie from 'dexie';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie  {

    constructor() {
      Dexie.delete('TimeTrackerDatabase'); 
      super('TimeTrackerDatabase');
      this.version(1).stores({
        tasks: '++id, taskName, startTime, endTime'
      })
    }
  
}
