export class VersionMap {
    private map: Map<string, string>;
    private dirty: boolean = false;
    
    constructor() {
        this.map = new Map();
    }
    
    set(key: string, value: string): void {
        if (this.map.has(key) && this.map.get(key) === value) {
            return; // No change, do not mark as dirty
        }
        this.dirty = true; // Mark as dirty if value changes
        this.map.set(key, value);
    }
    
    get(key: string): string | undefined {
        return this.map.get(key);
    }
    
    has(key: string): boolean {
        return this.map.has(key);
    }
    
    delete(key: string): boolean {
        return this.map.delete(key);
    }
    
    entries(): IterableIterator<[string, string]> {
        return this.map.entries();
    }

    setClean(): void {
        this.dirty = false; // Reset dirty flag
    }

    isDirty(): boolean {
        return this.dirty; // Check if the map is dirty
    }
}