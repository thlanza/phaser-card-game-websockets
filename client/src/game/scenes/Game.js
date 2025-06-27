import { Scene } from 'phaser';
import UIHandler from '../helpers/UIHandler';
import CardHandler from '../helpers/CardHandler';
import DeckHandler from '../helpers/DeckHandler';
import InteractiveHandler from '../helpers/InteractiveHandler';
import SocketHandler from '../helpers/SocketHandler';
import GameHandler from '../helpers/GameHandler';

export class Game extends Scene
{
    constructor () {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('cyanCardBack', 'assets/CyanCardBack.png');
        this.load.image('magentaCardBack', 'assets/MagentaCardBack.png');
        this.load.image('cyanBoolean', 'assets/Cyan_Boolean3x.png');
        this.load.image('magentaBoolean', 'assets/Magenta_Boolean3x.png');
        this.load.image('cyanPing', 'assets/Cyan_Ping3x.png');
        this.load.image('magentaPing', 'assets/Magenta_Ping3x.png');
    }

    create() {
       this.CardHandler = new CardHandler();
       this.DeckHandler = new DeckHandler(this);
       this.GameHandler = new GameHandler(this);
       this.SocketHandler = new SocketHandler(this);
       this.UIHandler = new UIHandler(this);
       this.UIHandler.buildUI();
       this.InteractiveHandler = new InteractiveHandler(this);
    }

    update() {

    }
    
}
