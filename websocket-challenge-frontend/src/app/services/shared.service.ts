import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { webSocket } from 'rxjs/webSocket';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  onlineUsers = new BehaviorSubject(0);
  // subject = webSocket('ws://127.0.0.1:3000/');
  constructor(private socket: Socket) {}
  sendMessage(msg: any) {
    this.socket.emit('click_gift', msg);
  }

  getMessage() {
    // console.log(this.socket.)
    return this.socket.fromEvent('gift').pipe(map((data: any) => data));
  }
  getPosition() {
    // console.log(this.socket.)
    return this.socket.fromEvent('position').pipe(map((data: any) => data));
  }
  getConnected() {
    return this.socket.on('connect', (res: any) => {
      console.log(res);
    });
  }
}
