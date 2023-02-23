import * as hmUI from "@zos/ui";
import { getDeviceInfo, SCREEN_SHAPE_ROUND } from "@zos/device";
import { onDigitalCrown, KEY_HOME } from "@zos/interaction";
import { log as Logger } from "@zos/utils";
import { BOMB1, BOMB2, BOMB3, PLAYER, SCORE } from "./index.style";
import { GameObject } from "../classes/game_object";
import * as utils from "../utils/utils.js";
import { replace } from "@zos/router";

/* //how to show a toast
	hmUI.showToast({
						text: "bomb stopped",
					});
*/

const logger = Logger.getLogger("helloworld");
const deviceWidth = getDeviceInfo().width;
const deviceHeight = getDeviceInfo().height;

let playerScore = 0;

//value to increase bomb speed after a set amount are cacthed
speedAddition = 0;

let playerWidth = 90;
let playerX = 200;
let playerY = 350;
let payerMaxX = deviceWidth - playerWidth;
let playerMinX = 0;

let speedIncrement = 0.02;

let bombSpawnY = 40;
let bombSpawnMargin = 25; // MArgin where bombs will not spawn on the side to acount for poor visibility on the edges of the watch

let bombWidth = 25;
let bombHeight = 25;
let bombSpacing = 100; //distance between bombs

let bomb1Y = bombSpawnY;
let bomb1X = utils.randomIntFromInterval(
	0 + bombWidth,
	deviceWidth - bombWidth
);

let bomb2Y = bomb1Y - 100;
let bomb2X = utils.randomIntFromInterval(
	0 + bombWidth,
	deviceWidth - bombWidth
);

let bomb3Y = bomb2Y - 100;
let bomb3X = utils.randomIntFromInterval(
	0 + bombWidth,
	deviceWidth - bombWidth
);

let scoreTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
	...SCORE,
});

let playerGameObject = new GameObject(
	"player",
	playerX,
	playerY,
	playerWidth,
	20,
	hmUI.createWidget(hmUI.widget.IMG, { ...PLAYER })
);
let bomb1GameObject = new GameObject(
	"bomb1",
	bomb1X,
	bomb1Y,
	bombWidth,
	bombHeight,
	hmUI.createWidget(hmUI.widget.IMG, {
		...BOMB1,
	})
);
let bomb2GameObject = new GameObject(
	"bomb2",
	bomb2X,
	bomb2Y,
	bombWidth,
	bombHeight,
	hmUI.createWidget(hmUI.widget.IMG, {
		...BOMB2,
	})
);

let bomb3GameObject = new GameObject(
	"bomb3",
	bomb3X,
	bomb3Y,
	bombWidth,
	bombHeight,
	hmUI.createWidget(hmUI.widget.IMG, {
		...BOMB3,
	})
);

Page({
	build() {
		logger.debug("page build invoked");
	},
	onInit() {
		logger.debug("page onInit invoked");

		console.log(playerGameObject.name.toString());

		playerGameObject.widget;
		bomb1GameObject.widget;
		bomb2GameObject.widget;
		bomb3GameObject.widget;
		scoreTextWidget;

		const playerControl = (key, degree) => {
			if (key === KEY_HOME) {
				playerX += degree * 2;
				if (playerX > payerMaxX) {
					playerX = payerMaxX;
				} else if (playerX < playerMinX) {
					playerX = playerMinX;
				}

				this.updatePlayerPoss(playerX);
			}
		};

		onDigitalCrown({
			callback: playerControl,
		});

		var counter = setInterval(this.mainLoop, 10);
	},

	onDestroy() {
		offDigitalCrown();

		logger.debug("page onDestroy invoked");
	},

	//Main game loop
	mainLoop() {
		function updateBombPoss(bombGameObject, bombX, bombY) {
			bombGameObject.widget.setProperty(hmUI.prop.MORE, {
				x: bombX,
				y: bombY,
			});
			bombGameObject.hitbox.setPoss(bombX, bombY);

			if (bombGameObject.name == bomb1GameObject.name) {
				bomb1Y = bombY;
				bomb1X = bombX;
			} else if (bombGameObject.name == bomb2GameObject.name) {
				bomb2Y = bombY;
				bomb2X = bombX;
			} else if (bombGameObject.name == bomb3GameObject.name) {
				bomb3Y = bombY;
				bomb3X = bombX;
			}
		}

		function checkBombReachedEnd(bombGameObject, bombX, bombY) {
			if (bombY > 450) {
				bombY = bombSpawnY;

				scoreTextWidget.setProperty(hmUI.prop.MORE, {
					text: playerScore.toString(),
				});

				//update  bomb X possition for new spawn
				bombX = utils.randomIntFromInterval(
					0 + bombWidth + bombSpawnMargin,
					deviceWidth - bombWidth - bombSpawnMargin
				);
				updateBombPoss(bombGameObject, bombX, bombY);
				replace({
					url: "page/gtr/home/game_over.page",
					params: playerScore.toString(),
				});
			}
		}

		function checkBombPlayerCollision(bombGameObject, bombX, bombY) {
			const bombCollision = utils.collisionChecker(
				playerGameObject,
				bombGameObject
			);

			if (bombCollision == true) {
				bombY = bombSpawnY;
				playerScore++;
				scoreTextWidget.setProperty(hmUI.prop.MORE, {
					text: playerScore.toString(),
				});

				//update  bomb X possition for new spawn
				bombX = utils.randomIntFromInterval(
					0 + bombWidth + bombSpawnMargin,
					deviceWidth - bombWidth - bombSpawnMargin
				);
				updateBombPoss(bombGameObject, bombX, bombY);
			}
		}

		//check if there is a collision
		checkBombPlayerCollision(bomb1GameObject, bomb1X, bomb1Y);
		checkBombPlayerCollision(bomb2GameObject, bomb2X, bomb2Y);
		checkBombPlayerCollision(bomb3GameObject, bomb3X, bomb3Y);

		//increase bomb speed with each passing bomb catched
		speedAddition = speedIncrement * playerScore;
		bomb1Y += 2 + speedAddition;
		bomb2Y += 2 + speedAddition;
		bomb3Y += 2 + speedAddition;

		//make sure there is a minuimun px spacing between bombs if the previous bomb is below
		if (bomb1Y > bomb2Y && bomb2Y + bombSpacing > bomb1Y) {
			bomb2Y = bomb1Y - bombSpacing;
		}
		if (bomb2Y > bomb3Y && bomb3Y + bombSpacing > bomb2Y) {
			bomb3Y = bomb2Y - bombSpacing;
		}

		updateBombPoss(bomb1GameObject, bomb1X, bomb1Y);
		updateBombPoss(bomb2GameObject, bomb2X, bomb2Y);
		updateBombPoss(bomb3GameObject, bomb3X, bomb3Y);

		checkBombReachedEnd(bomb1GameObject, bomb1X, bomb1Y);
		checkBombReachedEnd(bomb2GameObject, bomb2X, bomb2Y);
		checkBombReachedEnd(bomb3GameObject, bomb3X, bomb3Y);
	},

	updatePlayerPoss(playerX) {
		playerGameObject.widget.setProperty(hmUI.prop.MORE, {
			x: playerX,
		});

		playerGameObject.hitbox.setPoss(playerX, playerGameObject.hitbox.y2);
	},
});
