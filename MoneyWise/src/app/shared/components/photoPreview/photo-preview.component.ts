import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss'],
  standalone: false,
})
export class PhotoPreviewComponent {
  @Input() src!: string;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Output() onClick = new EventEmitter<string>();

  public isModalOpen: boolean = false;

  public openModal() {
    this.isModalOpen = true;
    this.onClick.emit(this.src);
  }

  public closeModal() {
    this.isModalOpen = false;
  }
}
