import { Component } from '@angular/core';
import { ToastComponent } from '@coreui/angular';

@Component({
  selector: 'app-utils',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './utils.component.html',
  styleUrl: './utils.component.scss',
})
export class UtilsComponent {
  constructor() {}
  refresh(): void {
    window.location.reload();
  }
}
