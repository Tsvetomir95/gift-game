import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  name = '';
  showError: boolean = false;

  constructor(
    public sharedService: SharedService,
    private socket: Socket,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.socket.on('connected', (res: any) => {
      this.sharedService.onlineUsers.next(res);
    });
  }
  setName() {
    if (this.name === '' || this.name === undefined || this.name === null) {
      this.showError = true;
    } else {
      this.showError = false;
      this.router.navigate(['main']);
    }
    window.sessionStorage.setItem('name', this.name);
  }
}
