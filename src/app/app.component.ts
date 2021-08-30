import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'client-side-web-frameworks-individual-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'CSWFI';

  constructor() {}

  ngOnInit() {
    console.log('AppComponent geladen');
  }
}
