import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { webSocket } from 'rxjs/webSocket';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // subject = webSocket('ws://127.0.0.1:3000/');
  constructor(private socket: Socket) {}
  sendMessage(msg: any) {
    this.socket.emit('click_gift', msg);
  }

  getMessage() {
    // console.log(this.socket.)
    return this.socket.fromEvent('click_gift').pipe(map((data: any) => data));
  }
  getConnected() {
    return this.socket.on('connect', (res: any) => {
      console.log(res);
    });
  }
}
