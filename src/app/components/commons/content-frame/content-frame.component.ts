import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-content-frame',
  templateUrl: './content-frame.component.html',
  styleUrls: ['./content-frame.component.css'],
})
export class ContentFrameComponent {
  @Output() clickButton = new EventEmitter<void>();
  @Input() headerTitle!: string;
  @Input() icon!: string;
  @Input() tooltipMessage: string = '';
  @Input() buttonDisabled: boolean = false;
  @Input() backgroundColor: string = 'var(--primary-color)';
  @Input() fontColor!: string;
  @Input() buttonText!: string;
}
