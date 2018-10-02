import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-webrtc',
  templateUrl: './webrtc.component.html',
  styleUrls: ['./webrtc.component.scss']
})
export class WebrtcComponent implements OnInit {

  public started = false;
  public called = false;

  private localStream: MediaStream;
  private remoteStream: MediaStream;

  private peerConnection1: RTCPeerConnection;
  private peerConnection2: RTCPeerConnection;

  constructor() {  }

  ngOnInit() {
  }

  private start(): void {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true
      })
      .then((stream) => {
        this.localStream = stream;
        (document.getElementById('localVideo') as HTMLMediaElement).srcObject = this.localStream;
        this.started = true;
      })
      .catch(e => alert(`getUserMedia() error: ${e.name}`));
  }

  private call(): void {
    this.peerConnection1 = new RTCPeerConnection({});
    this.peerConnection1.onicecandidate = e => this.onIceCandidate(this.peerConnection1, e);

    this.peerConnection2 = new RTCPeerConnection({});
    this.peerConnection2.onicecandidate = e => this.onIceCandidate(this.peerConnection2, e);
    this.peerConnection1.onaddstream = e => this.gotRemoteStream(e);

    this.peerConnection1.addStream(this.localStream);

    this.peerConnection1.createOffer({
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1
    }).then((desc) => {
      console.log(this);
      this.peerConnection1.setLocalDescription(desc);
      this.peerConnection2.setRemoteDescription(desc);
      this.peerConnection2.createAnswer().then((d) => {
        console.log(this);
        this.peerConnection2.setLocalDescription(d);
        this.peerConnection1.setRemoteDescription(d);
      });
    });

    this.called = true;
  }

  private gotRemoteStream(ev): void {
    const remoteVideo = document.getElementById('remoteVideo') as HTMLMediaElement;
    if (remoteVideo.srcObject !== ev.streams[0]) {
      remoteVideo.srcObject = ev.streams[0];
    }
  }

  private onIceCandidate(peerConnection: RTCPeerConnection, ev: RTCPeerConnectionIceEvent): void {
    const otherPc = peerConnection === this.peerConnection1 ? this.peerConnection1 : this.peerConnection2;
    otherPc.addIceCandidate(ev.candidate);
  }

  private hangUp(): void {
    console.log('Ending call');
    this.peerConnection1.close();
    this.peerConnection2.close();
    this.peerConnection1 = null;
    this.peerConnection2 = null;
    this.called = false;
  }

}
