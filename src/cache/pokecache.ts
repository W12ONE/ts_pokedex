export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<unknown>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(reapInterval: number) {
    this.#interval = reapInterval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    this.#cache.set(key, { createdAt: Date.now(), val });
  }

  get<T>(key: string): CacheEntry<T> | undefined {
    return this.#cache.get(key) as CacheEntry<T> | undefined;
  }

  #reap() {
    this.#cache.forEach((entry, key) => {
      if (entry.createdAt < Date.now() - this.#interval) {
        this.#cache.delete(key);
      }
    });
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
  }
}
