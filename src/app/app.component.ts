import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'arbol';
  tipos: any = [
    { value: '0', viewValue: 'Preorden' },
    { value: '1', viewValue: 'Inorden' },
    { value: '2', viewValue: 'Postorden' }
  ];
}
