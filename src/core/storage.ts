import { DWNMessage } from '../interfaces/message'; // Assuming DWNMessage is in interfaces folder

export interface StorageItem {
  id: string; // Unique identifier for the stored message
  message: DWNMessage; // The DWNMessage payload
  timestamp: Date; // Timestamp of when the message was stored
}

export class Storage {
  private store: Map<string, StorageItem>;

  constructor() {
    this.store = new Map<string, StorageItem>();
  }

  /**
   * Save a message to storage.
   * @param id - Unique identifier for the message.
   * @param message - The DWNMessage payload to store.
   */
  save(id: string, message: DWNMessage): void {
    if (this.store.has(id)) {
      throw new Error(`Message with ID ${id} already exists.`);
    }
    this.store.set(id, { id, message, timestamp: new Date() });
  }

  /**
   * Retrieve a message by ID.
   * @param id - Unique identifier for the message.
   * @returns The stored StorageItem, or undefined if not found.
   */
  fetch(id: string): StorageItem | undefined {
    return this.store.get(id);
  }

  /**
   * List all stored messages.
   * @returns An array of all storage items.
   */
  list(): StorageItem[] {
    return Array.from(this.store.values());
  }

  /**
   * Delete a message by ID.
   * @param id - Unique identifier for the message to delete.
   * @returns True if the message was deleted, false if it did not exist.
   */
  delete(id: string): boolean {
    return this.store.delete(id);
  }
}