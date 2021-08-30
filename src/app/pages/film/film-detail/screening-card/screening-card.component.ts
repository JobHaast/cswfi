import { Component, Input, OnInit } from '@angular/core';
import { Screening } from 'src/app/pages/screening/screening.model';

@Component({
  selector: 'app-screening-card',
  template: `
    <div class="pl-1 pr-1">
      <div class="card">
        <div class="card-body">
          <p class="card-text">
            {{ screening.start | date: 'dd-MM-yyyy hh:mm' }} /
            {{ screening.end | date: 'dd-MM-yyyy hh:mm' }}
          </p>
          <p class="card-text">{{ screening.hall?.name }}</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./screening-card.component.css'],
})
export class ScreeningCardComponent implements OnInit {
  @Input() screening: Screening;

  constructor() {}

  ngOnInit(): void {}
}
