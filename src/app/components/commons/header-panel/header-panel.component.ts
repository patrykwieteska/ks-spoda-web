import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HeaderPanelData } from 'src/app/model/league';

@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.css'],
})
export class HeaderPanelComponent implements OnChanges {
  title: string = '';
  imgSrc: string = '';

  @Input() headerPanelData!: HeaderPanelData;

  ngOnChanges(changes: SimpleChanges): void {
    var currentHeadersData = changes['headerPanelData'].currentValue;
    this.title = currentHeadersData.title;
    this.imgSrc = currentHeadersData.imgSrc;
  }
}
