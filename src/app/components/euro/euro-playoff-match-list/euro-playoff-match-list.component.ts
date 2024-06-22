import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { EuroMatch } from 'src/app/model/euro';

@Component({
  selector: 'app-euro-playoff-match-list',
  templateUrl: './euro-playoff-match-list.component.html',
  styleUrls: ['./euro-playoff-match-list.component.css'],
})
export class EuroPlayoffMatchListComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log('PL:AYOFF CHANGES');
  }
  scrollFlag = true;

  @Input() matches!: EuroMatch[];

  ngAfterViewChecked() {
    if (this.scrollFlag === true) {
    }
  }

  @ViewChild('elementToScroll', { static: true })
  sectionSubscribeDiv!: ElementRef;

  scrollToDiv() {
    this.sectionSubscribeDiv.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    this.scrollFlag = false;
  }
}
