import { Injectable } from '@angular/core';
import { Message } from './backend/models/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor() {}
  getMessages(): Message[] {
    return [
      {
        text: 'asdfasdfasdf',
        sent: 'today',
        from: 'Joris',
        to: 'Säschu',
        fromMe: true
      },
      {
        text: 'aöosubdfoasdbn',
        sent: 'today',
        from: 'Säschu',
        to: 'Joris',
        fromMe: false
      }
    ];
  }
}
