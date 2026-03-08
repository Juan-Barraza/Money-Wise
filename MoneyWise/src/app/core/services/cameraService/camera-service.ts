import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  public photoPreview?: string = '';

  constructor() { }

  private async requestPermissions(source: CameraSource) {
    try {
      const permissions = await Camera.requestPermissions({
        permissions: source === CameraSource.Camera ? ['camera'] : ['photos']
      });

      if (source == CameraSource.Camera) {
        return permissions.camera === "granted";
      }
      return permissions.photos === "granted";

    } catch {
      return true;
    }
  }

  public async takePhoto() {
    const hashPermission = await this.requestPermissions(CameraSource.Camera);
    if (!hashPermission) return null;

    const photo = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    })

    this.photoPreview = photo.dataUrl;

    return photo.dataUrl || null;
  }

  public async pickFromGallery() {
    const hashPermission = await this.requestPermissions(CameraSource.Photos);
    if (!hashPermission) return null;
    const photo = await Camera.getPhoto(
      {
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      }
    )
    this.photoPreview = photo.dataUrl;


    return photo.dataUrl || null;
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
