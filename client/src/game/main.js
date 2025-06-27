import { Game as MainGame } from './scenes/Game';
import { AUTO, Game } from 'phaser';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1200,
        height: 1000
    },
    scene: [
        MainGame,
    ]
};

const StartGame = (parent) => {

    return new Game({ ...config, parent });

}

export default StartGame;
