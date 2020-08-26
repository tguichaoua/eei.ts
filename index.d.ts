export declare type EventsDef<E> = keyof E extends string | symbol
    ? {
          [x in keyof E]: [...any[]];
      }
    : never;

interface EventEmitterFull<E extends EventsDef<E>> {
    addListener<K extends keyof E>(
        event: K,
        listener: (...args: E[K]) => void
    ): this;
    on<K extends keyof E>(event: K, listener: (...args: E[K]) => void): this;
    once<K extends keyof E>(event: K, listener: (...args: E[K]) => void): this;
    prependListener<K extends keyof E>(
        event: K,
        listener: (...args: E[K]) => void
    ): this;
    prependOnceListener<K extends keyof E>(
        event: K,
        listener: (...args: E[K]) => void
    ): this;
    removeListener<K extends keyof E>(
        event: K,
        listener: (...args: E[K]) => void
    ): this;
    off<K extends keyof E>(event: K, listener: (...args: E[K]) => void): this;
    removeAllListeners<K extends keyof E>(event?: K): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners<K extends keyof E>(event: K): Function[];
    rawListeners<K extends keyof E>(event: K): Function[];
    emit<K extends keyof E>(event: K, ...args: E[K]): boolean;
    eventNames<K extends keyof E>(): Array<K>;
    listenerCount<K extends keyof E>(type: K): number;
}

interface Presset {
    _subscribe:
        | "on"
        | "once"
        | "addListener"
        | "prependListener"
        | "prependOnceListener";
    _unsubscribe: "off" | "removeListener" | "removeAllListeners";
    _subscription: Presset["_subscribe"] | Presset["_unsubscribe"];
}

declare type EEI<
    E extends EventsDef<E>,
    K extends
        | keyof EventEmitterFull<never>
        | keyof Presset = keyof EventEmitterFull<never>
> = Pick<EventEmitterFull<E>, K extends keyof Presset ? Presset[K] : K>;

export default EEI;
