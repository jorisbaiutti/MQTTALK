import { Component, OnInit } from '@angular/core';
import { Message } from '../backend/models/message';
import { MessagesService } from '../messages.service';
import { MessagingService } from '../communication/messaging.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: Message[];
  constructor(
    private messageService: MessagesService,
    private messagingService: MessagingService
  ) {}

  message = new FormControl('', Validators.required);
  receipent = new FormControl('', Validators.required);

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messagingService.onReceiveMessage.subscribe(m => {
      this.messages.push({
        text: m,
        sent: 'blal',
        from: 'sdf',
        to: 'sf',
        fromMe: false
      });
    });
  }

  send(): void {
    this.messages.push({
      text: this.message.value,
      sent: 'blal',
      from: 'sdf',
      to: this.receipent.value,
      fromMe: true
    });
    this.messagingService.sendMessage(this.receipent.value, this.message.value);
  }
}
