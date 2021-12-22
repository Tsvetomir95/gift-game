import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  subject = webSocket('ws://example.com');
  constructor() {}
}
