import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.scss'],
})
export class MainGameComponent implements OnInit {
  count = Math.random();
  range = { min: 1, max: 15 };
  delta = this.range.max - this.range.min;
  rand = 1;
  giftMessage = '';
  onlineUsers = 0;
  name: any;
  payload = {};
  constructor(private sharedService: SharedService, private socket: Socket) {}

  ngOnInit(): void {
    this.socket.on('connected', (res: any) => {
      this.onlineUsers = res;
    });
    // this.sharedService.subject.subscribe((res) => console.log(res));
  }

  getGift() {
    this.rand = Math.round(this.range.min + Math.random() * this.delta);
    this.name = window.localStorage.getItem('name');
    this.payload = {
      name: this.name,
      id: this.rand,
    };

    this.sharedService.sendMessage(this.payload);
    this.sharedService
      .getMessage()
      .subscribe((res) => (this.giftMessage = res));
  }
}
