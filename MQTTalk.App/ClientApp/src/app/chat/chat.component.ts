import { Component, OnInit } from '@angular/core';
import { Message } from '../backend/models/message';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: Message[];
  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.messages = this.messageService.getMessages();
  }

}
