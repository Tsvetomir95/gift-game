import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  name = '';
  onlineUsers = 0;
  constructor(private sharedService: SharedService, private socket: Socket) {}

  ngOnInit(): void {
    this.socket.on('connected', (res: any) => {
      this.onlineUsers = res;
    });
  }
  setName() {
    window.localStorage.setItem('name', this.name);
  }
}
