import { Injectable, EventEmitter } from '@angular/core';
import { SignalingService } from './signaling.service';
import { ConfigurationService } from './config/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {

  private stream: MediaStream;
  private connection: RTCPeerConnection;
  private calling = false;

  public onReceiveRemoteStream: EventEmitter<MediaStream> = new EventEmitter();

  constructor(private signaling: SignalingService, private config: ConfigurationService) {
  }

  private getRtcConfig(): RTCConfiguration {
    // todo -> Fix it, doesnt work. RtcConfiguration is always empty.....
    const targetConfig = this.config.getConfig();
    const result = {
      iceServers: [{
        urls: [],
        username: '',
        credential: ''
      }]
    };
    result.iceServers[0].urls.push(targetConfig.IceStunUrl);
    result.iceServers[0].urls.push(targetConfig.IceTurnUrl);
    result.iceServers[0].username = targetConfig.IceUsername;
    result.iceServers[0].credential = targetConfig.IceCredential;
    console.log(result);
    return result;
  }

  public acceptCalls(stream: MediaStream) {
    this.connection = new RTCPeerConnection(this.getRtcConfig());
    this.connection.onicecandidate = e => {
      if (e.candidate) {
        this.signaling.sendCandidate(e.candidate);
      }
    };

    this.connection.ontrack = e => {
      console.log('stream received');
      this.onReceiveRemoteStream.emit(e.streams[0]);
    };

    this.stream = stream;
    this.stream.getTracks().forEach(track => this.connection.addTrack(track, this.stream));

    this.signaling.onReceiveOffer.subscribe(offer => {
      this.connection.setRemoteDescription(offer);
      this.connection.createAnswer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      }).then((d) => {
        this.connection.setLocalDescription(d);
        this.signaling.sendAnswer(d);
      });
    });

    this.signaling.onReceiveAnswer.subscribe(answer => {
      this.connection.setRemoteDescription(answer);
    });

    this.signaling.onReceiveCandidate.subscribe(candidate => {
      this.connection.addIceCandidate(candidate);
    });
  }

  public invite() {
    if (this.calling) {
      return;
    }

    this.connection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    }).then((offer) => {
      return this.connection.setLocalDescription(offer);
    }).then(() => {
      this.signaling.sendOffer(this.connection.localDescription);
      this.calling = true;
    });
  }
}
