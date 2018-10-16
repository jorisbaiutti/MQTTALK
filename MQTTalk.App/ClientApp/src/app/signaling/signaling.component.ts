import { Component } from '@angular/core';
import { SignalingService } from '../signaling.service';

@Component({
  selector: 'app-signaling',
  templateUrl: './signaling.component.html',
  styleUrls: ['./signaling.component.scss']
})
export class SignalingComponent {

  private signalHub: SignalingService;
  public message: string;

  constructor(signalHub: SignalingService) {
    this.signalHub = signalHub;
  }

  public sendOffer(): void {
    // this.signalHub.sendOffer(this.message);
  }
}
