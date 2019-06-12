import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { MyLine } from '../Models/line';
import { LineToLineMappedSource } from 'webpack-sources';
 
@Injectable({
  providedIn: 'root'
})
export class SignalRService {

public data: MyLine;
public lines: MyLine[];
private hubConnection: signalR.HubConnection
 
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:44397/hub/')
                            .build();
 
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
 
  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferdata', (data) => {
      this.data = data as MyLine;
      this.lines[data.number - 1] = data;
    });
  }
  public getLines()
    {
      this.lines = [
        {number: 1, state: false, craft: null, direction: null},
        {number: 2, state: false, craft: null, direction: null},
        {number: 3, state: false, craft: null, direction: null},
        {number: 4, state: false, craft: null, direction: null},
        {number: 5, state: false, craft: null, direction: null},
        {number: 6, state: false, craft: null, direction: null},
        {number: 7, state: false, craft: null, direction: null},
        {number: 8, state: false, craft: null, direction: null},
      ];
      return this.lines;
    }
}
