// Issue for native TypeScript https://github.com/microsoft/TypeScript/issues/16577
import { Game } from "./game.js";

let game;

window.onload = (ev: Event) => {
    game = new Game();
    game.start();
};
