import { Injectable, EventEmitter } from '@angular/core';
import { SignalingService } from './signaling.service';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {

  private stream: MediaStream;
  private connection: RTCPeerConnection;
  private calling = false;

  private signal: SignalingService;

  public onReceiveRemoteStream: EventEmitter<MediaStream> = new EventEmitter();

  private config: RTCConfiguration = {
    iceServers: [{
      urls: ['stun:stunturn.mobilegees.com', 'turn:stunturn.mobilegees.com']
    }]
  };

  constructor(signaling: SignalingService) {
    this.signal = signaling;
  }

  public acceptCalls(stream: MediaStream) {
    this.connection = new RTCPeerConnection(this.config);
    this.connection.onicecandidate = e => {
      if (e.candidate) {
        this.signal.sendCandidate(e.candidate);
      }
    };

    this.connection.ontrack = e => {
      console.log('stream received');
      this.onReceiveRemoteStream.emit(e.streams[0]);
    };

    this.stream = stream;
    this.stream.getTracks().forEach(track => this.connection.addTrack(track, this.stream));

    this.signal.onReceiveOffer.subscribe(offer => {
      this.connection.setRemoteDescription(offer);
      this.connection.createAnswer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      }).then((d) => {
        this.connection.setLocalDescription(d);
        this.signal.sendAnswer(d);
      });
    });

    this.signal.onReceiveAnswer.subscribe(answer => {
      this.connection.setRemoteDescription(answer);
    });

    this.signal.onReceiveCandidate.subscribe(candidate => {
      this.connection.addIceCandidate(candidate);
    });
  }

  public invite() {
    if (this.calling) {
      return;
    }

    this.connection.createOffer({
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1
    }).then((offer) => {
      return this.connection.setLocalDescription(offer);
    }).then(() => {
      this.signal.sendOffer(this.connection.localDescription);
      this.calling = true;
    });
  }
}
