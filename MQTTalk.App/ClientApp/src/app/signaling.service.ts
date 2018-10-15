import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalingService {

  private connection: HubConnection;

  constructor() {
    this.connection = new HubConnectionBuilder().withUrl('https://localhost:5001/webRtcHub').configureLogging(LogLevel.Information).build();
    this.connection.start().catch(this.handleError);

    this.connection.on('ReceiveOffer', (user: string, offer: string) => {
      console.log('Offer received from: ' + user, offer);
    });
  }

  public sendOffer(user: string, offer: string) {
    this.connection.send('SendOffer', user, offer).catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('Error while signaling: ' + error.toString());
  }
}
