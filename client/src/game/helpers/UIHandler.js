import ZoneHandler from "./ZoneHandler";

export default class UIHandler {
    constructor (scene) 
    {
        
        this.zoneHandler = new ZoneHandler(scene);

        this.buildZones = () => {
            scene.dropZone = this.zoneHandler.renderZone(470, 500);
            this.zoneHandler.renderOutline(scene.dropZone);
        }

        this.buidPlayerAreas = () => {
            scene.playerHandArea = scene.add.rectangle(470, 860, 850, 230);
            scene.playerHandArea.setStrokeStyle(4, 0x44);
            scene.playerDeckArea = scene.add.rectangle(100, 860, 155, 215);
            scene.playerDeckArea.setStrokeStyle(3, 0x00ffff);

            scene.opponentHandArea = scene.add.rectangle(470, 135, 850, 230);
            scene.opponentHandArea.setStrokeStyle(4, 0x44);
            scene.opponentDeckArea = scene.add.rectangle(100, 135, 155, 215);
            scene.opponentDeckArea.setStrokeStyle(3, 0x00ffff);


        }

        this.buildGameText = () => {
            scene.dealCards = scene.add.text(960, 445, "Deal Cards").setFontSize(14)
                .setFontFamily("Trebuchet MS");
            }

        this.buildUI = () => {
            this.buildZones();
            this.buidPlayerAreas();
            this.buildGameText();
        }
    }
}