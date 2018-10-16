import { Component, OnInit } from '@angular/core';
import { WebrtcService } from '../webrtc.service';

@Component({
  selector: 'app-webrtc',
  templateUrl: './webrtc.component.html',
  styleUrls: ['./webrtc.component.scss']
})
export class WebrtcComponent implements OnInit {

  public started = false;
  public called = false;

  public localStream: MediaStream;
  public localStreamUrl: string;
  private remoteStream: MediaStream;

  private peerConnection1: RTCPeerConnection;
  private peerConnection2: RTCPeerConnection;

  private wrService: WebrtcService;

  constructor(webRtc: WebrtcService) {
    this.wrService = webRtc;
  }

  ngOnInit() {
  }

  public start(): void {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true
      })
      .then((stream) => {
        this.localStream = stream;
        (document.getElementById('localVideo') as HTMLMediaElement).srcObject = this.localStream;
        this.wrService.acceptCalls(stream);
        this.wrService.onReceiveRemoteStream.subscribe(s => {
          const remoteVideo = (document.getElementById('remoteVideo') as HTMLMediaElement);
          if (remoteVideo.srcObject !== s) {
            remoteVideo.srcObject = s;
          }
        });
        this.started = true;
      })
      .catch(e => alert(`getUserMedia() error: ${e.name}`));
  }

  public call(): void {
    this.wrService.invite();
    // this.peerConnection1 = new RTCPeerConnection({

    // });
    // this.peerConnection1.ontrack = () => {

    // };
    // this.peerConnection1.onicecandidate = e => {
    //   this.peerConnection2.addIceCandidate(e.candidate);
    // };

    // this.peerConnection2 = new RTCPeerConnection({});
    // this.peerConnection2.onicecandidate = e => {
    //   this.peerConnection1.addIceCandidate(e.candidate);
    // };
    // const self = this;
    // this.peerConnection2.ontrack = e => {
    //   const remoteVideo = (document.getElementById('remoteVideo') as HTMLMediaElement);
    //   if (remoteVideo.srcObject !== e.streams[0]) {
    //     self.remoteStream = e.streams[0];
    //     remoteVideo.srcObject = e.streams[0];
    //   }
    // };

    // this.localStream.getTracks().forEach(track => this.peerConnection1.addTrack(track, this.localStream));

    // const me = this;
    // this.peerConnection1.createOffer({
    //   offerToReceiveAudio: 1,
    //   offerToReceiveVideo: 1
    // }).then((desc) => {
    //   me.peerConnection1.setLocalDescription(desc);
    //   me.peerConnection2.setRemoteDescription(desc);
    //   me.peerConnection2.createAnswer({
    //     offerToReceiveAudio: 1,
    //     offerToReceiveVideo: 1
    //   }).then((d) => {
    //     me.peerConnection2.setLocalDescription(d);
    //     me.peerConnection1.setRemoteDescription(d);
    //   });
    // });

    // this.called = true;
  }

  public hangUp(): void {
    // console.log('Ending call');
    // this.peerConnection1.close();
    // this.peerConnection2.close();
    // this.peerConnection1 = null;
    // this.peerConnection2 = null;
    // this.called = false;
  }

}
