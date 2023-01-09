import { browser } from '$app/environment';

const storage = browser ? localStorage : null;

export class LocalStorageUtil {
  static set(key: string, value: unknown): void {
    storage?.setItem(key, JSON.stringify(value));
  }

  static get<T>(key: string): T {
    const storedValue = storage?.getItem(key);

    try {
      return JSON.parse(storedValue || JSON.stringify(null));
    } catch {
      this.clear();
      throw new Error('Invalid storage value');
    }
  }

  static getAll(): { [key: string]: unknown } {
    return storage as { [key: string]: unknown };
  }

  static clear(): void {
    storage?.clear();
  }
}
