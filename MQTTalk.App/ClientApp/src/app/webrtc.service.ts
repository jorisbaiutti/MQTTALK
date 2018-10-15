import { Injectable } from '@angular/core';
import { SignalingService } from './signaling.service';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {

  private stream: MediaStream;
  private connection: RTCPeerConnection;
  private calling: boolean = false;

  private signal: SignalingService;

  constructor(signaling: SignalingService) {
    this.signal = signaling;
  }

  public invite(): void {
    if (this.calling)
      return;

    this.connection = new RTCPeerConnection({});

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true
      })
      .then((stream) => {
        this.stream = stream;
        this.stream.getTracks().forEach(track => this.connection.addTrack(track, this.stream));
      }).catch(e => alert(`getUserMedia() error: ${e.name}`));

    // this.connection.createOffer({
    //   offerToReceiveAudio: 1,
    //   offerToReceiveVideo: 1
    // }).then((offer) => {
    //   return this.connection.setLocalDescription(offer);
    // }).then(() => {
    //   // this.signal.sendOffer("FooBar", this.connection.localDescription);
    // })
  }
}
