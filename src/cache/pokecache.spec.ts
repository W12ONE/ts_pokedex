import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { Cache } from "./pokecache";

describe("Cache", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(0); // freeze time at start for predictability
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should store and retrieve a value", () => {
    const cache = new Cache(1000);
    cache.add("foo", 123);

    const entry = cache.get<number>("foo");
    expect(entry).toBeDefined();
    expect(entry?.val).toBe(123);
    expect(entry?.createdAt).toBe(0); // since we froze time
  });

  it("should remove expired entries on reap", () => {
    const cache = new Cache(1000);
    cache.add("foo", 123);

    // Fast-forward beyond expiration
    vi.setSystemTime(2000);
    vi.advanceTimersByTime(1000); // triggers reap

    const entry = cache.get("foo");
    expect(entry).toBeUndefined();
  });

  it("should keep non-expired entries on reap", () => {
    const cache = new Cache(5000);
    cache.add("foo", 123);

    vi.setSystemTime(2000);
    vi.advanceTimersByTime(3000); // triggers reap, but entry is still fresh

    const entry = cache.get("foo");
    expect(entry).toBeDefined();
    expect(entry?.val).toBe(123);
  });

  it("should stop reaping when stopReapLoop is called", () => {
    const cache = new Cache(1000);
    cache.add("foo", 123);

    cache.stopReapLoop();

    vi.setSystemTime(5000);
    vi.advanceTimersByTime(5000);

    const entry = cache.get("foo");
    expect(entry).toBeDefined(); // still there because reap stopped
  });
});
