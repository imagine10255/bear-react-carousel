
class Eventor<T extends Record<string, (...args: any[]) => void>> {
    private events: Map<keyof T, T[keyof T][]> = new Map();

    on<K extends keyof T>(eventName: K, callback: T[K]) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName)!.push(callback);
    }

    off<K extends keyof T>(eventName: K, callback: T[K]) {
        if (this.events.has(eventName)) {
            const callbacks = this.events.get(eventName)!;
            const idx = callbacks.indexOf(callback);
            if (idx >= 0) {
                callbacks.splice(idx, 1);
            }
        }
    }

    emit<K extends keyof T>(eventName: K, ...args: Parameters<T[K]>) {
        if (this.events.has(eventName)) {
            for (const callback of this.events.get(eventName)!) {
                callback(...args);
            }
        }
    }
}

export default Eventor;
