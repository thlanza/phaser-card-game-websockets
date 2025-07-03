export default class InteractiveHandler {
    constructor(scene) {

        scene.cardPreview = null;

        scene.dealCards.on('pointerdown', () => {
            scene.socket.emit("dealCards", scene.socket.id);
            scene.dealCards.disableInteractive();
        });

        scene.dealCards.on("pointerover", () => {
            scene.dealCards.setColor('#ff69b4');
        });

        scene.dealCards.on("pointerout", () => {
            scene.dealCards.setColor('#00ffff')
        });

        scene.input.on('pointerover', (event, gameObjects) => {
            let pointer = scene.input.activePointer;
            if (gameObjects[0] && gameObjects[0]?.type === "Image" && gameObjects[0].data?.list.name !== "cardBack") {
                scene.cardPreview = scene.add.image(pointer.worldX, pointer.worldY, gameObjects[0].data?.values.sprite).setScale(0.5, 0.5);
            }
        });

        scene.input.on('pointerout', (event, gameObjects) => {
            if (gameObjects[0] && gameObjects[0]?.type === "Image" && gameObjects[0].data?.list.name !== "cardBack") {
                if (scene.cardPreview) {
                    scene.cardPreview.setVisible(false);
                }
            }
        });

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        scene.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setTint(0xff69b4);
            scene.children.bringToTop(gameObject);
            if (scene.cardPreview) {
                scene.cardPreview.setVisible(false);
            }
        });

        scene.input.on('dragend', (pointer, gameObject, dropped) => {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });

        scene.input.on('drop', (pointer, gameObject, dropZone) => {
            console.log("ismyturn: " + scene.GameHandler.isMyTurn);
            if (scene.GameHandler.isMyTurn && scene.GameHandler.gameState === "Ready") {
                gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 50);
                gameObject.y = dropZone.y;
                scene.dropZone.data.values.cards++;

                const index = scene.GameHandler.playerHand.indexOf(gameObject);
                scene.input.setDraggable(gameObject, false);
                scene.socket.emit('cardPlayed', gameObject.data.values.name, scene.socket.id);
                if (index !== -1) {
                    scene.GameHandler.playerHand.splice(index, 1);
                    gameObject.destroy();
                }
                console.log("scene.gamehandler.playerHand length after" + scene.GameHandler.playerHand.length);
                console.log("scene.gamehandler.opponentHand' length after" + scene.GameHandler.opponentHand.length);
            } else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })
    }
}