export class LocalStorageUtil {
  static set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get<T>(key: string): T {
    const storedValue = localStorage.getItem(key);

    try {
      return JSON.parse(storedValue || JSON.stringify(null));
    } catch {
      this.clear();
      throw new Error('Invalid storage value');
    }
  }

  static getAll(): { [key: string]: unknown } {
    return localStorage as { [key: string]: unknown };
  }

  static clear(): void {
    localStorage.clear();
  }
}
