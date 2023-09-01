export class DeferredPromise<T> {
    promise: Promise<T>;
    resolve!: (value?: T | PromiseLike<T>) => void;
    reject!: (reason?: any) => void;

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            // Type assertions here to satisfy TypeScript's strict checks.
            this.resolve = resolve as any;
            this.reject = reject;
        });
    }
}
