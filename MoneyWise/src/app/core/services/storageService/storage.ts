import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(private readonly stge: Storage) {
    this.init();
  }


  public async set(key: string, value: any) {
    await this.storage?.set(key, value);
  }

  public async get(key: string) {
    return await this.storage?.get(key);
  }

  public async remove(key: string) {
    return await this.storage?.remove(key);
  }

  public async clear() {
    await this.storage?.clear();
  }

  private async init() {
    const storage = await this.stge?.create();
    this.storage = storage;
  }
}
