import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Msg = { from: 'me' | 'system'; text: string; ts: Date };

@Component({
  selector: 'app-dialer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dialer.html',
  styleUrl: './dialer.css'
})
export class DialerComponent {
  display = '';
  calling = false;

  // sliders
  volume = 50;
  mic = 50;

  // chat
  chatOpen = false;
  newMessage = '';
  messages: Msg[] = [];

  keys = [
    { main: '1', sub: '' }, { main: '2', sub: 'ABC' }, { main: '3', sub: 'DEF' },
    { main: '4', sub: 'GHI' }, { main: '5', sub: 'JKL' }, { main: '6', sub: 'MNO' },
    { main: '7', sub: 'PQRS' }, { main: '8', sub: 'TUV' }, { main: '9', sub: 'WXYZ' },
    { main: '*', sub: '' }, { main: '0', sub: '+' }, { main: '#', sub: '' },
  ];

  press(key: string) {
    if (this.calling) console.log('DTMF:', key);
    else this.display += key;
  }

  backspace() { if (!this.calling) this.display = this.display.slice(0, -1); }

  isValid() { return /^[0-9*#+]+$/.test(this.display) && this.display.length > 0; }

  call() {
    if (!this.isValid() || this.calling) return;
    this.calling = true;
    console.log('CALL START ->', this.display);
    setTimeout(() => this.hangup(), 10000);
  }

  hangup() {
    if (!this.calling) return;
    console.log('HANGUP ->', this.display);
    this.calling = false;
    this.display = '';
  }

  // CHAT
  toggleChat() { this.chatOpen = !this.chatOpen; }

  sendMessage() {
    const t = this.newMessage.trim();
    if (!t) return;
    this.messages.push({ from: 'me', text: t, ts: new Date() });
    this.newMessage = '';
  }
}
