/*File name: app.ts
  Author's Name: Anirudh Babu
  Student no.: 301105250
  File description: Manages the creation and manipulation of objects required and is responsible for the
  functioning of the site
*/
(function () {
    // Function scoped Variables
    let stage;
    let assets;
    let slotMachineBackground;
    let spinButton;
    let bet1Button;
    let bet10Button;
    let bet100Button;
    let betMaxButton;
    let quitButton;
    let resetButton;
    let jackPotLabel;
    let creditLabel;
    let winningsLabel;
    let betLabel;
    let leftReel;
    let middleReel;
    let rightReel;
    let betLine;
    // symbol tallies
    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blanks = 0;
    let manifest = [
        { id: "background1", src: "./Assets/images/background1.png" },
        { id: "banana", src: "./Assets/images/banana.gif" },
        { id: "bar", src: "./Assets/images/bar.gif" },
        { id: "bell", src: "./Assets/images/bell.gif" },
        { id: "bet_line", src: "./Assets/images/bet_line.gif" },
        { id: "bet1Button", src: "./Assets/images/bet1Button.png" },
        { id: "bet10Button", src: "./Assets/images/bet10Button.png" },
        { id: "bet100Button", src: "./Assets/images/bet100Button.png" },
        { id: "betMaxButton", src: "./Assets/images/betMaxButton.png" },
        { id: "blank", src: "./Assets/images/blank.gif" },
        { id: "cherry", src: "./Assets/images/cherry.gif" },
        { id: "grapes", src: "./Assets/images/grapes.gif" },
        { id: "orange", src: "./Assets/images/orange.gif" },
        { id: "seven", src: "./Assets/images/seven.gif" },
        { id: "spinButton", src: "./Assets/images/spinButton.png" },
        { id: "quitButton", src: "./Assets/images/quitButton.png" },
        { id: "resetButton", src: "./Assets/images/resetButton.png" }
    ];
    // This function triggers first and "Preloads" all the assets
    function Preload() {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);
        assets.loadManifest(manifest);
    }
    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start() {
        console.log("App Started...");
        let canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        Config.Globals.AssetManifest = assets;
        Main();
    }
    // called every frame
    function Update() {
        stage.update();
    }
    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    /* When this function is called it determines the betLine results.
    e.g. Bar - Orange - Banana */
    function Reels() {
        let betLine = [" ", " ", " "];
        let outCome = [0, 0, 0];
        for (let spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27): // 41.5% probability
                    betLine[spin] = /* "seven"; */ "blank";
                    /* sevens++; */ blanks++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = /* "seven" */ "grapes";
                    /* sevens++; */ grapes++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = /* "seven"; */ "banana";
                    /* sevens++; */ bananas++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = /* "seven"; */ "orange";
                    /* sevens++; */ oranges++;
                    break;
                case checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = /* "seven"; */ "cherry";
                    /* sevens++; */ cherries++;
                    break;
                case checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = /* "seven"; */ "bar";
                    /* sevens++; */ bars++;
                    break;
                case checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = /* "seven"; */ "bell";
                    /* sevens++; */ bells++;
                    break;
                case checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "seven";
                    sevens++;
                    break;
            }
        }
        return betLine;
    }
    // draws items to the canvas element
    function buildInterface() {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background1", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true);
        stage.addChild(slotMachineBackground);
        // Buttons
        spinButton = new UIObjects.Button("spinButton", Config.Screen.CENTER_X + 130, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(spinButton);
        bet1Button = new UIObjects.Button("bet1Button", Config.Screen.CENTER_X - 130, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet1Button);
        bet10Button = new UIObjects.Button("bet10Button", Config.Screen.CENTER_X - 65, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet10Button);
        bet100Button = new UIObjects.Button("bet100Button", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet100Button);
        betMaxButton = new UIObjects.Button("betMaxButton", Config.Screen.CENTER_X + 65, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(betMaxButton);
        quitButton = new UIObjects.Button("quitButton", Config.Screen.CENTER_X + 195, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(quitButton);
        resetButton = new UIObjects.Button("resetButton", Config.Screen.CENTER_X - 195, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(resetButton);
        // Labels
        jackPotLabel = new UIObjects.Label("10000000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 175, true);
        stage.addChild(jackPotLabel);
        creditLabel = new UIObjects.Label("1000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 119, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(creditLabel);
        winningsLabel = new UIObjects.Label("0", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 54, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(winningsLabel);
        betLabel = new UIObjects.Label("0", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 20, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(betLabel);
        // Reel GameObjects
        leftReel = new Core.GameObject("bell", Config.Screen.CENTER_X - 81, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(leftReel);
        middleReel = new Core.GameObject("banana", Config.Screen.CENTER_X - 3, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(middleReel);
        rightReel = new Core.GameObject("bar", Config.Screen.CENTER_X + 75, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(rightReel);
        // Bet Line
        betLine = new Core.GameObject("bet_line", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(betLine);
    }
    // controls how the interface works in regards to spinning, click events etc.
    function interfaceLogic() {
        //triggers the mouseover event in case of unfavourable circumstances to gray out the spin button
        if (parseInt(betLabel.text) == 0 || parseInt(creditLabel.text) <= 0 || (parseInt(creditLabel.text) - parseInt(betLabel.text)) < 0) {
            const mouseoverEvent = new Event('mouseover');
            spinButton.dispatchEvent(mouseoverEvent);
        }
        //'spins' the reel
        spinButton.on("click", () => {
            blanks = cherries = bananas = sevens = bars = bells = grapes = oranges = 0;
            // reel test
            let reels = Reels();
            if (parseInt(betLabel.text) > 0 && parseInt(creditLabel.text) - parseInt(betLabel.text) >= 0) {
                creditLabel.text = (parseInt(creditLabel.text) - parseInt(betLabel.text)).toString();
                // example of how to replace the images in the reels
                leftReel.image = assets.getResult(reels[0]);
                middleReel.image = assets.getResult(reels[1]);
                rightReel.image = assets.getResult(reels[2]);
                creditLabel.text = (parseInt(creditLabel.text) + determineWinnings(parseInt(betLabel.text))).toString();
            }
        });
        //unhover effects
        spinButton.on("mouseout", () => {
            if (parseInt(betLabel.text) == 0 || parseInt(creditLabel.text) <= 0 || (parseInt(creditLabel.text) - parseInt(betLabel.text)) < 0) {
                spinButton.alpha = 0.7;
            }
            else {
                spinButton.alpha = 1.0;
            }
        });
        //betButtons click events to activate the grayed out spin button and set appropriate text
        bet1Button.on("click", () => {
            console.log("bet1Button Button Clicked");
            betLabel.text = "1";
            spinButtonActivate();
        });
        bet10Button.on("click", () => {
            console.log("bet10Button Button Clicked");
            betLabel.text = "10";
            spinButtonActivate();
        });
        bet100Button.on("click", () => {
            console.log("bet100Button Button Clicked");
            betLabel.text = "100";
            spinButtonActivate();
        });
        betMaxButton.on("click", () => {
            console.log("betMaxButton Button Clicked");
            betLabel.text = creditLabel.text;
            spinButtonActivate();
        });
        //re-adds the elements after removing them from the stage, providing a 'refresh effect'
        resetButton.on("click", () => {
            console.log("resetButton Clicked");
            betLabel.text = "0";
            creditLabel.text = "1000";
            winningsLabel.text = "0";
            // Reel GameObjects
            stage.removeChild(leftReel);
            leftReel = new Core.GameObject("bell", Config.Screen.CENTER_X - 81, Config.Screen.CENTER_Y - 12, true);
            stage.addChild(leftReel);
            stage.removeChild(middleReel);
            middleReel = new Core.GameObject("banana", Config.Screen.CENTER_X - 3, Config.Screen.CENTER_Y - 12, true);
            stage.addChild(middleReel);
            stage.removeChild(rightReel);
            rightReel = new Core.GameObject("bar", Config.Screen.CENTER_X + 75, Config.Screen.CENTER_Y - 12, true);
            stage.addChild(rightReel);
            // Bet Line
            stage.removeChild(betLine);
            betLine = new Core.GameObject("bet_line", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
            stage.addChild(betLine);
            //grays out button as of this position
            spinButtonActivate();
        });
        //displays exit message using bootstrap modal
        quitButton.on("click", () => {
            console.log("quitButton Clicked");
            //adds and displays a modal obtained from BootStrap with appropriate info
            document.getElementById("Modals").innerHTML +=
                `<!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style="display:none;">
                Launch demo modal
            </button>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">GoodBye!</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            We will be sorry to see you go!
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`;
            //triggers click on the invisible button
            (document.body.getElementsByTagName("button")[0]).click();
        });
    }
    //determines what amount is won and the win number
    function determineWinnings(playerBet) {
        let winnings = 0;
        let winNumber = 0;
        if (blanks == 0) {
            if (grapes == 3) {
                winnings = playerBet * 10;
            }
            else if (bananas == 3) {
                winnings = playerBet * 20;
            }
            else if (oranges == 3) {
                winnings = playerBet * 30;
            }
            else if (cherries == 3) {
                winnings = playerBet * 40;
            }
            else if (bars == 3) {
                winnings = playerBet * 50;
            }
            else if (bells == 3) {
                winnings = playerBet * 75;
            }
            else if (sevens == 3) {
                winnings = parseInt(jackPotLabel.text);
                //adds and displays a modal obtained from BootStrap with appropriate info
                document.getElementById("Modals").innerHTML +=
                    `<!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style="display:none;">
                  Launch demo modal
                </button>
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Congratulations!</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    Hurray! You won the JackPot!!!!!
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                    </div>
                </div>`;
                (document.body.getElementsByTagName("button")[0]).click();
            }
            else if (grapes == 2) {
                winnings = playerBet * 2;
            }
            else if (bananas == 2) {
                winnings = playerBet * 2;
            }
            else if (oranges == 2) {
                winnings = playerBet * 3;
            }
            else if (cherries == 2) {
                winnings = playerBet * 4;
            }
            else if (bars == 2) {
                winnings = playerBet * 5;
            }
            else if (bells == 2) {
                winnings = playerBet * 10;
            }
            else if (sevens == 2) {
                winnings = playerBet * 20;
            }
            else if (sevens == 1) {
                winnings = playerBet * 5;
            }
            else {
                winnings = playerBet * 1;
            }
            winNumber++;
        }
        console.log("winNumber = " + winNumber);
        winningsLabel.text = (parseInt(winningsLabel.text) + winNumber).toString();
        return winnings;
    }
    //activates/deactivates the button in case conditions are favourable/unfavourable
    function spinButtonActivate() {
        if (parseInt(betLabel.text) != 0 && parseInt(creditLabel.text) > 0 && (parseInt(creditLabel.text) - parseInt(betLabel.text)) >= 0) {
            const mouseoutEvent = new Event('mouseout');
            spinButton.dispatchEvent(mouseoutEvent);
        }
        else {
            const mouseoverEvent = new Event('mouseover');
            spinButton.dispatchEvent(mouseoverEvent);
        }
    }
    // app logic goes here
    function Main() {
        buildInterface();
        interfaceLogic();
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map