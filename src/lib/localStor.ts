export type Preferences = {
  mode: "dark" | "light";
  lang: "en" | "ua";
};

export const PREFKEY = "preferences";

export class CustomStorage<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public getItems(): "" | T | null {
    try {
      if (global?.window === undefined) {
        return null;
      }
      const data = localStorage.getItem(this.key);
      return data && (JSON.parse(data) as T);
    } catch (error) {
      throw new Error("Failed to retrieve items from storage");
    }
  }

  public setItems(items: T): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(items));
    } catch (error) {
      throw new Error("Failed to set items in storage");
    }
  }

  public clearItems(): void {
    try {
      localStorage.removeItem(this.key);
    } catch (error) {
      throw new Error("Failed to clear items from storage");
    }
  }
}

export const storage = new CustomStorage<Preferences>(PREFKEY);
