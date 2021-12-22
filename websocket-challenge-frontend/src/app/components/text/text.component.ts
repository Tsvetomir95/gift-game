import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  @Input() textToShow = '';

  range = { min: 100, max: 700 };
  delta = this.range.max - this.range.min;
  rand = 1;
  constructor() {}

  ngOnInit(): void {
    this.rand = Math.round(this.range.min + Math.random() * this.delta);
    console.log(this.rand);
  }
}
