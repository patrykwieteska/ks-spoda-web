import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-content-frame',
  templateUrl: './content-frame.component.html',
  styleUrls: ['./content-frame.component.css'],
})
export class ContentFrameComponent {
  tooltipMessage = 'Otwórz w nowym oknie';

  @Output() clickButton = new EventEmitter<void>();
  @Input() headerTitle!: string;
}
