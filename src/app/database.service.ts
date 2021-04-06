import { Injectable } from '@angular/core';
import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import * as adapterIdb from 'pouchdb-adapter-idb';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db: RxDatabase;

  constructor() {
  }

  async initDatabase() {
    addRxPlugin(adapterIdb);

    this.db = await createRxDatabase({
      name: 'time_tracker_db',
      adapter: 'idb',
    })
  
    const taskSchema = {
      version: 0,
      title: 'task schema',
      description: 'schema for task recording',
      type: 'object',
      properties: {
        taskName: {
          type: 'string',
          primary: true
        },
        startTime: {
          type: 'number'
        },
        endTime: {
          type: 'number'
        }
      }
    }
    
    await this.db.addCollections({
      tasks: {
        schema: taskSchema
      }
    })
  }

  getTasks() {
    return this.db.tasks.find().$;
  }

  addTasks(taskName, startTime) {
    this.db.tasks.insert({
      taskName: taskName,
      startTime: startTime
    });
  }

  recordTaskEndTime(taskName, endTime) {
    this.db.tasks.findOne({
      selector: {
        taskName: taskName
      }
    }).update({
      $set: {
        endTime: endTime
      }
    });
  }
}