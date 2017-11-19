import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-administrator-layout',
  templateUrl: './layout.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  rootPage:string = 'app-administrator-home-page';
  constructor() { }
  ngOnInit() { }
}
