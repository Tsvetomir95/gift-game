import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

interface Position {
  left: string;
  top: string;
}
@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.scss'],
})
export class MainGameComponent implements OnInit {
  count = Math.random();
  range = { min: 1, max: 15 };
  range2 = { min: 1, max: 100 };
  delta = this.range.max - this.range.min;
  delta2 = this.range2.max - this.range2.min;
  rand = 1;
  giftMessage = '';
  onlineUsers: any;
  name: any;
  payload = {};
  response: Array<any> = [];
  top: any;
  left: any;
  position: Position;
  clicked = false;
  constructor(public sharedService: SharedService, private socket: Socket) {
    // this.position.left = '0'
    // this.position = {}
  }

  ngOnInit(): void {
    this.socket.on('connected', (res: any) => {
      this.sharedService.onlineUsers.next(res);
    });
    // this.sharedService.subject.subscribe((res) => console.log(res));
    // this.position = this.sharedService.getPosition()
  }

  getGift() {
    if (!this.clicked) {
      // Set clicked to true
      this.clicked = true;

      // Do your processing here
      // alert('Something is done!');

      // Re-enable after processing if you want
      // clicked = false;

      // console.log(this.response);
      this.rand = Math.round(this.range.min + Math.random() * this.delta);
      this.top = Math.round(this.range2.min + Math.random() * this.delta2);
      // this.left = Math.round(this.range2.min + Math.random() * this.delta2);
      this.name = window.sessionStorage.getItem('name');
      this.payload = {
        name: this.name,
        id: this.rand,
      };

      this.sharedService.sendMessage(this.payload);
      this.sharedService.getMessage().subscribe((res) => {
        this.giftMessage = res;
        this.response.push(this.giftMessage);
      });

      console.log(this.response);
      // this.sharedService
      //   .getPosition()
      //   .subscribe((res) => (this.position = res));
    }
  }
}
