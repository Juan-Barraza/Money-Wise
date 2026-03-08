import { TransactionResponse } from 'src/app/core/models/types/transaction.type';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CameraService } from 'src/app/core/services/cameraService/camera-service';
import { ToastService } from 'src/app/core/services/toast/toast';

@Component({
  selector: 'app-photo-selector',
  templateUrl: './photo-selector.component.html',
  styleUrls: ['./photo-selector.component.scss'],
  standalone: false,
})
export class PhotoSelectorComponent implements OnInit {
  @Input() transaction :TransactionResponse | null = null;
  @Input() currentPhoto: string  | null = null;
  @Output() onSelectedPhoto = new EventEmitter<{ dataUrl: string, file: File }>();
  @Output() onRemovePhoto = new EventEmitter<void>();

  constructor(
    private readonly cameraService: CameraService,
    private readonly toast: ToastService,
  ) { }

  ngOnInit() { }

  public async takePhoto() {
    const dataUrl = await this.cameraService.takePhoto();
    if (!dataUrl) {
      await this.toast.error('No es posible acceder a la camara');
      return;
    }

    const file = this.cameraService.dataUrlToFile(dataUrl, 'receipt.jpg');
    this.onSelectedPhoto.emit({dataUrl, file});
  }

  public async pickFromGallery() {
    const dataUrl = await this.cameraService.pickFromGallery();
    if (!dataUrl) {
      await this.toast.error('No es posible acceder a la galeria');
      return;
    }
    const file = this.cameraService.dataUrlToFile(dataUrl, 'receipt.jpg');
    this.onSelectedPhoto.emit({dataUrl, file});
  }

  public removePhoto() {
    this.onRemovePhoto.emit();
  }

}
