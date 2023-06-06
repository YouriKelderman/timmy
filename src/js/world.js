//Imports   **
//          **
import {Actor, Engine, Vector, Color, Debug, Physics, Input, Axis} from "excalibur";
import {Resources, ResourceLoader} from "./resources.js";
import {Scene} from "excalibur";
import {DVD} from "./dvd";
import {Tree} from "./tree";
import {Zombie} from "./zombie.js";
import {Block} from "./block.js"
import {Pickaxe} from "./pickaxe.js";

//Global variables **
//                 **
let pressedDown = false;
let test = 0;
let grids = 14;
let loadedChunk = [0, 0];
let gridsize;
let player;
let loadedChunkValues = [];
let loadedChunkIDs = [];
let currentTile;
let buildingBlock;
let building = false;
let currentBlock = 1;
let lastPosCaves = [];
let caveOdds = 1;
let cavePattern;
let score = 0;
//Cave Types  **
//            **

let caveTypes = [
    [
        "##    ########",
        "###    #######",
        "###    #######",
        "##      ######",
        "##      ######",
        "###     #####"],
    [
        "#####     ####",
        "###         ##",
        "#            #",
        "####      ####",
        "############",],
    ["##############",
        "##############",
        "#####     ####",
        "###       ####",
        "#        #####",
        "#      #######",
        "##############",],
    ["######  ######",
        "#####    #####",
        "####      ####",
        "###        ###",
        "##          ##",
        "###        ###",
        "####      ####",
        "#####    #####",
        "##############",
    ],
]

export class World extends Scene {

    startWorld() {
        this.chunkLoading(loadedChunk);
        this.chunkLoading([loadedChunk[0], loadedChunk[1] + 1]);
        let zombie = new Zombie();
        this.add(zombie);

    }

    onInitialize(engine) {
        this.game = engine;

        this.startWorld();
        player = new DVD();
        this.add(player);
        buildingBlock = new Block(grids, 0);
        buildingBlock.checkSelf(1)
        this.game.currentScene.camera.strategy.lockToActorAxis(player, Axis.Y)
        this.engine.input.pointers.primary.on("down", () => this.primaryMouse())

    }

    primaryMouse() {
        if (building) {
            let chunkNew = [Math.floor(loadedChunk[0]), (Math.floor(buildingBlock.pos.y / 700))];
            let placedBlock = new Block(grids, 0);
            placedBlock.checkSelf(currentBlock)
            placedBlock.pos = buildingBlock.pos;
            this.add(placedBlock);

            let PlacedBlockIdInList = (((placedBlock.pos.y - (chunkNew[1] * 700)) - 25) / 50) * 14 + (((placedBlock.pos.x - 25) - (chunkNew[0] * 700)) / 50)
            loadedChunkValues[PlacedBlockIdInList] = placedBlock;
            let ChunkToReplace = this.decoder(localStorage.getItem(chunkNew))
            if (ChunkToReplace[PlacedBlockIdInList + 14] === 1) {
                ChunkToReplace[PlacedBlockIdInList + 14] = 1;
            }
            ChunkToReplace[PlacedBlockIdInList] = currentBlock;
            localStorage.setItem(chunkNew, this.encoder(ChunkToReplace));
        } else {
            score += 1;
            localStorage.setItem("score", score);
            let mouse = this.game.input.pointers.primary.lastWorldPos;
            let listId = Math.floor(mouse.y / 50) * 14 + Math.floor(mouse.x / 50);
            let chunkNew = [Math.floor(loadedChunk[0]), Math.floor(mouse.y / 700)];
            let chunk = this.decoder(localStorage.getItem(chunkNew));
            if (chunkNew[1] > 0) {
                chunk[listId - (chunkNew[1] * 196)] = 4;
                loadedChunkValues[listId].checkSelf(4);
            } else {
                if (chunk[listId - (chunkNew[1] * 196)] === 3) {
                    chunk[listId - (chunkNew[1] * 196)] = 4;
                    loadedChunkValues[listId].checkSelf(4);

                } else if (chunk[listId - (chunkNew[1] * 196)] !== 0) {
                    chunk[listId - (chunkNew[1] * 196)] = 0;
                    loadedChunkValues[listId].kill();
                }

            }
            localStorage.setItem(chunkNew, this.encoder(chunk));
        }
    }

    chunkLoading(chunk) {

        let caveOverlay = [];
        if (localStorage.getItem(chunk) === null) {
            this.chunkGeneration(chunk);
        }
        if (localStorage.getItem(`MD${chunk}`) !== null) {
            let caveOverlayTemp = localStorage.getItem(`MD${chunk}`);
            caveOverlayTemp = caveOverlayTemp.split(",")
            for (let i = 0; i < caveOverlayTemp.length; i++) {
                caveOverlay.push(Number(caveOverlayTemp[i]));
            }
            localStorage.setItem(`MD${chunk}`, null)
        }
        let chunkValue = localStorage.getItem(chunk);
        chunkValue = this.decoder(chunkValue);
        for (let i = 0; i < (grids * grids); i++) {
            let value = Number(chunkValue[i]);
            Math.floor(value)
            if (value !== 0) {
                if (value !== 6) {
                    if (caveOverlay[i] !== 4) {
                        currentTile = new Block(grids, i, chunk);
                        if (Number(chunkValue[i - 1]) === 0 && Number(chunkValue[i] === 1)) {
                            currentTile.checkSelf(value, 1)
                            let newTile = new Block(grids, i + 14, chunk);
                        } else if (chunkValue[i - 14] === 1 && chunkValue[i - 15] === 0) {
                            currentTile.checkSelf(value - 1, 2);
                        } else {
                            currentTile.checkSelf(value);
                        }
                    } else {

                        currentTile = new Block(grids, i, chunk);
                        currentTile.checkSelf(4);
                    }
                } else {
                    currentTile = new Tree(i);

                }
                this.add(currentTile);
                loadedChunkValues.push(currentTile);
            } else {
                loadedChunkValues.push(0);
            }
        }
    }
    chunkUnloading(chunkObject, chunkBlockIDs, chunkID) {
        loadedChunkIDs = [];
        loadedChunkValues = [];
        chunkObject.forEach(item => {
            if (item !== 0) {
                item.kill()
            }
        });
    }
    decoder(string) {
        let result = [];
        let items = string.split("+");
        items.forEach(item => {
            if (!item.includes(":")) {
                if (item.includes("$")) {
                    item = item.split("$")
                    for (let i = 0; i < item[0]; i++) {
                        result.push(Number(item[1]))
                    }
                } else {
                    result.push(Number(item));
                }
            } else {
                item = item.split(":");
                let number = Number(item[0]) + Number(item[1] / 10);

            }
        })
        return (result)
    }

    encoder(chunk) {
        let encodedString = "";
        let tempLength = 0;
        let lastItem;
        for (let i = 0; i < chunk.length + 1; i++) {
            if (chunk[i] === lastItem || i === 0) {
                tempLength += 1;
            } else if (chunk[i] % 1 !== 0 && chunk[i] !== undefined) {

                let Text = chunk[i].toString();
                Text.split(".")
                encodedString = encodedString + `+${Text[0]}:${Text[1]}`
            } else {
                if (tempLength > 2) {
                    encodedString = encodedString + `+${tempLength}$${chunk[i - 1]}`;
                } else {
                    for (let y = 0; y < tempLength; y++) {
                        encodedString = encodedString + `+${chunk[i - 1]}`;
                    }
                }
                tempLength = 1;
            }
            lastItem = chunk[i];
        }
        let result = encodedString.slice(1)

        return (result);
    }

    chunkGeneration(chunkToCreate) {
        let newChunk;
        let grassNoise = 0;
        if (Number(chunkToCreate[1]) > 0) {
            newChunk = `196$3`
            localStorage.setItem(chunkToCreate, newChunk)
            this.caveGeneration([0, 0], '196$3');
            newChunk = cavePattern;
        } else {
            let random = Math.floor(Math.random() * 14)
            let random2 = Math.floor(Math.random() * 14)
            let random3 = Math.floor(Math.random() * 14)
            newChunk = `+${105 + random + (14 - random3)}$0`;
            newChunk += `+${random3 - 1}$0`
            newChunk += `+14$1`;
            newChunk += `+${56 - random - random2}$2`;
            newChunk += `+${14 + random2}$3`;
        }
        localStorage.setItem(chunkToCreate, newChunk);
        return (newChunk);
    }

    caveGeneration(pos, IDList, chunkMap) {
        let e;
        let OtherChunkMap;
        if (!pos) {
            pos = [0, 0];
            caveOdds = 1;
        }
        if (!IDList) {
            IDList = this.decoder(localStorage.getItem(loadedChunk));

        } else {
            IDList = this.decoder(IDList)
        }
        if (!chunkMap) {
            OtherChunkMap = [0];
            for (let i = 0; i < grids * grids; i++) {
                OtherChunkMap.push(0);
            }
        } else {
            OtherChunkMap = chunkMap;
        }
        let generationType = Math.floor(Math.random() * (caveTypes.length));
        for (let y = 0; y < caveTypes[generationType].length; y++) {
            let characters = caveTypes[generationType][y].split('');
            for (let x = 0; x < characters.length; x++) {
                if (characters[x] === " ") {
                    let position = [x * 50 + (25 + pos[0]), y * 50 + 25 + pos[1]];
                    let PlacedBlockIdInList = (Math.floor((position[1] - 25) / 50) * 14 + Math.floor((position[0] - 25) / 50));
                    if (IDList[PlacedBlockIdInList] !== 4) {
                        if (position[0] < 700 && position[0] > 0 && position[1] < 700 && position[1] > 0) {
                            IDList[PlacedBlockIdInList] = 4;
                            lastPosCaves = [(x - 2) * 50 + pos[0], (y - 2) * 50 + pos[1]];
                        } else {

                            let PlacedBlockIdInList = (((position[1] - (loadedChunk[1] * 700)) - 25) / 50) * 14 + (((position[0] - 25) - (loadedChunk[0] * 700)) / 50)
                            OtherChunkMap[PlacedBlockIdInList] = 4;

                        }
                    }
                }
            }
        }

        let random = Math.floor(Math.random() * caveOdds);
        if (random === 0) {
            caveOdds += 1;
            this.caveGeneration(lastPosCaves, this.encoder(IDList), OtherChunkMap);
        } else {
            cavePattern = this.encoder(IDList);
            localStorage.setItem(`MD${[loadedChunk[0] + 1, loadedChunk[1] + 1]}`, OtherChunkMap);

        }
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.isHeld(Input.Keys.N)) {
            this.game.goToScene('end');
        }
        if (engine.input.keyboard.wasPressed(Input.Keys.L)) {
            localStorage.clear();
        }
        if (engine.input.keyboard.wasPressed(Input.Keys.J)) {
            currentBlock += 1;
            if (currentBlock === 5) {
                buildingBlock.kill();
                buildingBlock = new Tree();
                this.add(buildingBlock)
            } else {
                buildingBlock.checkSelf(currentBlock)
            }
        }
        if (engine.input.keyboard.wasPressed(Input.Keys.K)) {
            currentBlock -= 1;
            if (currentBlock === 4) {
                buildingBlock.kill();
                buildingBlock = new Block();

            }
            buildingBlock.checkSelf(currentBlock)

        }

        if (engine.input.keyboard.wasPressed(Input.Keys.B)) {
            building = !building;
            if (building) {
                this.add(buildingBlock);
            } else {
                buildingBlock.kill();
            }
        }
        if (building) {
            buildingBlock.pos.x = Math.floor(engine.input.pointers.primary.lastWorldPos.x / 50) * 50 + 25;
            buildingBlock.pos.y = Math.floor(engine.input.pointers.primary.lastWorldPos.y / 50) * 50 + 25
        }
        if (player.pos.x < 5) {
            player.pos.x = 650;
            this.chunkUnloading(loadedChunkValues, loadedChunkIDs, loadedChunk);
            this.chunkUnloading(loadedChunkValues, loadedChunkIDs, [loadedChunk[0], loadedChunk[1] - 1]);
            loadedChunk = [loadedChunk[0] -= 1, loadedChunk[1]];
            this.chunkLoading(loadedChunk);
            this.chunkLoading([loadedChunk[0], loadedChunk[1] + 1])
            player.pos.x = 50;
            player.pos.x = 650;
        }
        if (player.pos.x > 690) {
            player.pos.x = 30;
            this.chunkUnloading(loadedChunkValues, loadedChunkIDs, loadedChunk);
            this.chunkUnloading(loadedChunkValues, loadedChunkIDs, [loadedChunk[0], loadedChunk[1] - 1]);
            loadedChunk = [loadedChunk[0] += 1, loadedChunk[1]];
            this.chunkLoading(loadedChunk);
            this.chunkLoading([loadedChunk[0], loadedChunk[1] + 1])
            player.pos.x = 50;
        }
    }
}

