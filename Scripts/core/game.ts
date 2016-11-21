/// <reference path = "_reference.ts" />

//Filename: game.ts CORE
//Author: Angelina Gutierrez
//Date modified: November 20th, 2016

// Global Variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;

var spriteSheetLoader : createjs.SpriteSheetLoader;
var snailAtlas : createjs.SpriteSheet;


var currentScene : objects.Scene;
var scene: number;

var life : number = 100;


// Preload Assets required
var assetData:objects.Asset[] = [
    //Backgro1unds
    {id: "Game_BG", src: "../../Assets/images/gamebg.png"},
    {id: "Menu_BG", src: "../../Assets/images/menubg.png"},
    {id: "Instructions_BG", src: "../../Assets/images/instructionsbg.png"},
    //Buttons
    {id: "start", src: "../../Assets/images/start.png"},
    {id: "instructions", src: "../Assets/images/instructions.png"},
    {id: "playAgain", src: "../../Assets/images/playAgain.png"},
    {id: "back", src: "../../Assets/images/back.png"},
    //Spritesheet
    {id: "snailAtlas", src: "../../Assets/images/snailAtlas.png"},
    //Other
    {id: "floor", src: "../../Assets/images/ground.png"}
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

    let atlasData = {
        "images": [
            assets.getResult("snailAtlas")
        ],

      "frames": [
        [0, 285, 300, 55, 0, 0, 0], //0 - Leaf
        [150, 150, 200, 75, 0, 0, 0], //1 - Salt
        [250, 0, 150, 110, 0, 0, 0], //2 - Snail (idle)
        [100, 0, 150, 110, 0, 0, 0], //3 - Snail (moving 1)
        [0, 150, 150, 110, 0, 0, 0], //4 - Snail (moving 2)
        [0, 0, 100, 150, 0, 0, 0] //5 - Sign
    ],
        "animations": {

            "moving": {
                "frames": [3, 4], "speed": 0.1, next: true
            },
            
            "leaf": {"frames": [0]},
            "salt": {"frames": [1]},
            "idle": {"frames": [2]},
            "sign": {"frames": [5]}
            
        }
    }

    //Assign to snailAtlas

    snailAtlas = new createjs.SpriteSheet(atlasData);

    scene = config.Scene.MENU;
    changeScene();
}

function gameLoop(event: createjs.Event): void {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}

function changeScene() : void {
    
    // Simple state machine pattern to define scene swapping.
    switch(scene)
    {
        case config.Scene.MENU :
            stage.removeAllChildren();
            currentScene = new scenes.Menu();;
            console.log("Starting MENU scene");
            break;
     case config.Scene.PLAY :
            stage.removeAllChildren();
            currentScene = new scenes.Play();
            console.log("Starting GAME scene");
            break;

        case config.Scene.INSTRUCTIONS :
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Starting INSTRUCTIONS scene");
            break;

        case config.Scene.GAMEOVER :
            stage.removeAllChildren();
            currentScene = new scenes.Gameover();
            console.log("Starting GAMEOVER scene");
            break;
        case config.Scene.GAMEOVERWIN :
            stage.removeAllChildren();
            currentScene = new scenes.Gameoverwin();
            console.log("Starting GAMEOVERWIN scene");
    }
    
}