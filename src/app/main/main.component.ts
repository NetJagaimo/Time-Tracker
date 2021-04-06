import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.databaseService.getTasks()
      .subscribe((value) => {
        console.log(value);
      });
  }

}
