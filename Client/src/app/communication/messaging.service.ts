import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private connection: HubConnection;
  public onReceiveMessage: EventEmitter<string> = new EventEmitter<string>();
  constructor() {
    const idToken = localStorage.getItem('id_token');
    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/hub/messageHub`, {
        accessTokenFactory: () => idToken
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.connection.start().catch(this.handleError);

    this.connection.on('ReceiveMessage', (message: string) => {
      console.log('Message received', message);
      this.onReceiveMessage.emit(message);
    });
  }

  public sendMessage(user: string, message: string) {
    console.log('message function called');
    this.connection.send('SendMessage', user, message).catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('Error while signaling: ' + error.toString());
  }
}
