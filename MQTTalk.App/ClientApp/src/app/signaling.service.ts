import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalingService {

  private connection: HubConnection;
  public onReceiveOffer: EventEmitter<RTCSessionDescriptionInit> = new EventEmitter<RTCSessionDescriptionInit>();
  public onReceiveAnswer: EventEmitter<RTCSessionDescriptionInit> = new EventEmitter<RTCSessionDescriptionInit>();
  public onReceiveCandidate: EventEmitter<RTCIceCandidate> = new EventEmitter<RTCIceCandidate>();

  constructor() {
    this.connection = new HubConnectionBuilder().withUrl('/webRtcHub').configureLogging(LogLevel.Information).build();
    this.connection.start().catch(this.handleError);

    this.connection.on('ReceiveOffer', (offer: string) => {
      console.log('Offer received', offer);
      this.onReceiveOffer.emit(JSON.parse(offer));
    });

    this.connection.on('ReceiveAnswer', (offer: string) => {
      console.log('Answer received', offer);
      this.onReceiveAnswer.emit(JSON.parse(offer));
    });

    this.connection.on('ReceiveIceCandidate', (candidate: string) => {
      console.log('Candidate received', candidate);
      this.onReceiveCandidate.emit(JSON.parse(candidate));
    });
  }

  public sendOffer(offer: RTCSessionDescriptionInit) {
    this.connection.send('SendOffer', JSON.stringify(offer)).catch(this.handleError);
  }

  public sendAnswer(answer: RTCSessionDescriptionInit) {
    this.connection.send('SendAnswer', JSON.stringify(answer)).catch(this.handleError);
  }

  public sendCandidate(candidate: RTCIceCandidate) {
    this.connection.send('SendIceCandidate', JSON.stringify(candidate)).catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('Error while signaling: ' + error.toString());
  }
}
