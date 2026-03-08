import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {

  constructor() { }


  public async takePhoto(): Promise<string | null> {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        promptLabelHeader: 'Tomar foto',
        promptLabelCancel: 'Cancelar'
      });
      return photo.dataUrl || null;
    } catch {
      return null;
    }
  }

  public async pickFromGallery(): Promise<string | null> {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
        promptLabelHeader: 'Seleccionar foto',
        promptLabelCancel: 'Cancelar'
      });
      return photo.dataUrl || null;
    } catch {
      return null;
    }
  }



  public dataUrlToFile(dataUrl: string, filename: string): File {
    console.log("[DATA URL] ", dataUrl);

    const [header, base64] = dataUrl.split(',');
    const mimeType = header.split(':')[1].split(';')[0]; // we get the image/jpeg

    const byteString = atob(base64); // decode base64
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new File([arrayBuffer], filename, { type: mimeType });
  }


}
