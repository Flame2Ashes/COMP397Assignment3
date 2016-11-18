/// <reference path = "_reference.ts" />
//Filename: game.ts CORE
//Author: Angelina Gutierrez
//Date modified: October 20th, 2016
// Global Variables
var assets;
var canvas;
var stage;
var spriteSheetLoader;
var targetAtlas;
var currentScene;
var scene;
var score = 0;
var ammo = 11;
// Preload Assets required
var assetData = [
    //Backgrounds
    { id: "Game_BG", src: "../../Assets/images/gamebg.png" },
    { id: "Menu_BG", src: "../../Assets/images/menubg.png" },
    { id: "Instructions_BG", src: "../../Assets/images/instructionsbg.png" },
    //Buttons
    { id: "start", src: "../../Assets/images/start.png" },
    { id: "instructions", src: "../Assets/images/instructions.png" },
    { id: "playAgain", src: "../../Assets/images/playAgain.png" },
    { id: "back", src: "../../Assets/images/back.png" },
    //Spritesheet
    { id: "targetAtlas", src: "../../Assets/images/targetAtlas.png" }
];
function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    // assets.installPlugin(createjs.Sound);
    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}
function init() {
    // Reference to canvas element
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);
    //Create AtlasData
    var atlasData = {
        "images": [
            assets.getResult("targetAtlas")
        ],
        "frames": [
            [1, 1, 120, 120, 0, 0, 0],
            [123, 1, 120, 120, 0, 0, 0],
            [1, 123, 58, 135, 0, 0, 0],
            [1, 260, 95, 112, 0, 0, 0],
            [61, 123, 120, 120, 0, 0, 0],
            [98, 245, 42, 120, 0, 0, 0],
            [142, 245, 95, 112, 0, 0, 0],
            [183, 123, 42, 120, 0, 0, 0] //7 - Bottle
        ],
        "animations": {
            "targetBreak": {
                "frames": [0, 1], "speed": 0.1, next: false
            },
            "bottleBreak": {
                "frames": [5, 2], "speed": 0.1, next: false
            },
            "ammoGet": {
                "frames": [6, 3], "speed": 0.1, next: false
            },
            "target": { "frames": [4] },
            "bottle": { "frames": [7] },
            "ammo": { "frames": [6] },
        },
        "texturepacker": [
            "SmartUpdateHash: $TexturePacker:SmartUpdate:3cddc399832ebe0a9a1fd9e5fe9a0a96:836dbe4ba01c1cef370e7cac38a25ec5:01b4a05c7f6807936f8426c41592daed$",
            "Created with TexturePacker (https://www.codeandweb.com/texturepacker) for EaselJS"
        ]
    };
    //Assign to targetAtlas
    targetAtlas = new createjs.SpriteSheet(atlasData);
    scene = config.Scene.MENU;
    changeScene();
}
function gameLoop(event) {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}
function changeScene() {
    // Simple state machine pattern to define scene swapping.
    switch (scene) {
        case config.Scene.MENU:
            stage.removeAllChildren();
            currentScene = new scenes.Menu();
            ;
            console.log("Starting MENU scene");
            break;
        case config.Scene.GAME:
            stage.removeAllChildren();
            currentScene = new scenes.Game();
            console.log("Starting GAME scene");
            break;
        case config.Scene.INSTRUCTIONS:
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Starting INSTRUCTIONS scene");
            break;
        case config.Scene.GAMEOVER:
            stage.removeAllChildren();
            currentScene = new scenes.Gameover();
            console.log("Starting GAMEOVER scene");
            break;
    }
}
//# sourceMappingURL=game.js.map