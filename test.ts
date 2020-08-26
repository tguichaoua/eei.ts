import { EventEmitter } from "events";
import EEI from ".";

interface PlayerEvents {
    damaged: [Player, number];
    death: [Player];
}

class Player {
    private readonly _events = new EventEmitter() as EEI<PlayerEvents>;
    private _hp: number;

    constructor(public readonly name: string, public readonly maxHp: number) {
        this._hp = maxHp;
    }

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
