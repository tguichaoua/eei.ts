<h1 align="center">Welcome to EventEmitter Interface 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/eei.ts" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/EventEmitter Interface.svg">
  </a>
  <a href="https://github.com/tguichaoua/eei.ts#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/tguichaoua/eei.ts/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/tguichaoua/eei.ts/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/tguichaoua/eei.ts" />
  </a>
</p>

> Provide an interface for NodeJs EventEmitter with event name and event argument type checking.

## Install

```sh
npm i eei.ts
```

## Usage

```ts
import { EventEmitter } from "events"; // import EventEmitter from `@type/node`.
import EEI from "eei.ts"; // import EEI interface.

// define events
interface PlayerEvents {
    damaged: [Player, number];
    death: [Player];
}

class Player {
    // Store private EventEmitter with full interface.
    private readonly _events = new EventEmitter() as EEI<PlayerEvents>;
    // private readonly _events: EEI<PlayerEvents> = new EventEmitter(); // is not working : EventEmitter must be cast with `as` keyword.
    private _hp: number;

    constructor(public readonly name: string, public readonly maxHp: number) {
        this._hp = maxHp;
    }

    // Expose the EventEmitter with limited interface. (subscribe and unsubscribe methods only).
    get events() {
        return this._events as EEI<PlayerEvents, "_subscription">;
    }

    get hp() {
        return this._hp;
    }

    dealDamage(amount: number) {
        this._hp = this._hp < amount ? 0 : this._hp - amount;
        this._events.emit("damaged", this, amount);
        if (this._hp <= 0) this._events.emit("death", this);
    }
}

const bob = new Player("Bob", 100);
bob.events
    .on("damaged", (player, amount) => {
        console.log(
            `${player.name} took ${amount} damage. [${player.hp}/${player.maxHp}]`
        );
    })
    .once("death", (player) => {
        console.log(`${player.name} is dead.`);
        player.events.removeAllListeners();
    });

bob.dealDamage(40);
bob.dealDamage(70);
bob.dealDamage(10);
```

## API

### The interface

The interface take two generic type:
- the event definition
- the EventEmitter methods or presset

#### examples

```ts

type EventEmitterWithAllMethods = EEI<MyEvents>;
type EventEmitterWithSubscriptionMethods = EEI<MyEvents, "on" | "once" | "off">;
type EventEmitterWithSubscriptionMethodsWithPresset = EEI<MyEvents, "_subscription">;
```

### Presset
All presset start with `_`.

- `_subscribe` = `"on" | "once" | "addListener" | "prependListener" | "prependOnceListener"`
- `_unsubscribe` = `"off" | "removeListener" | "removeAllListeners"`
- `_subscription` = `"_subscribe" | "_unsubscribe"`


### Define events
Create an interface:
  - key: event name, must be a string or a symbol.
  - type: a tuple with event's argument types

```ts
interface MyEvents {
   eventName: [string, number];
   anotherEvent: [];
}
```

## Author

👤 **Tristan Guichaoua**

* Website: tguichaoua.github.io
* Github: [@tguichaoua](https://github.com/tguichaoua)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/tguichaoua/eei.ts/issues). You can also take a look at the [contributing guide](https://github.com/tguichaoua/eei.ts/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Tristan Guichaoua](https://github.com/tguichaoua).<br />
This project is [MIT](https://github.com/tguichaoua/eei.ts/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
