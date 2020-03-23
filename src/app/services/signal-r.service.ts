import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { MyLine } from '../Models/line';
 
@Injectable({
  providedIn: 'root'
})
export class SignalRService {

public data: MyLine;
public lines: MyLine[];
private hubConnection: signalR.HubConnection
 
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:5001/hub/')
                            .configureLogging({
                                log: function(logLevel, message) {
                                    console.log(new Date().toISOString() + ": " + message);
                                }
                            })
                            .build();
   // this.hubConnection.serverTimeoutInMilliseconds = 60000;
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
      
    this.hubConnection.onclose(async () => { 
      this.getLines();
      await this.hubConnection.start(); 
    });
  }
 
  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferdata', (data) => {
      this.data = data as MyLine;
      if (data.craft !== undefined && this.lines.find(line => line.craft == this.data.craft) !== undefined){
        let previousLineIndex = this.lines.indexOf(this.lines.find(line => line.craft == this.data.craft));
        this.lines[previousLineIndex] = {lineNumber: previousLineIndex + 1, state: false, craft: null, direction: null };
      }
      this.lines[data.number - 1] = data;
    });
  }
  public getLines()
    {
      this.lines = [
        {lineNumber: 1, state: false, craft: null, direction: null},
        {lineNumber: 2, state: false, craft: null, direction: null},
        {lineNumber: 3, state: false, craft: null, direction: null},
        {lineNumber: 4, state: false, craft: null, direction: null},
        {lineNumber: 5, state: false, craft: null, direction: null},
        {lineNumber: 6, state: false, craft: null, direction: null},
        {lineNumber: 7, state: false, craft: null, direction: null},
        {lineNumber: 8, state: false, craft: null, direction: null},
      ];
      return this.lines;
    }
}
