import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { MyLine } from 'src/app/Models/line';
import { Flight } from 'src/app/Models/flight';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  state: string[];
  schedule: Flight[];
  airport: MyLine[];
  constructor(public signalRService: SignalRService, private http: HttpClient) { 
      }
 
  ngOnInit() {
    this.airport = this.signalRService.getLines();
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();   
    this.startHttpRequest();
  }
  public startHttpRequest = () => {
    //https://localhost:44397/api/values/schedule'
    this.http.get('https://localhost:5001/api/values/schedule')
      .subscribe(res => {
        this.schedule = res as Flight[];
      }
  )}
}
