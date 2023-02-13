import * as hmUI from "@zos/ui";
import { getDeviceInfo, SCREEN_SHAPE_ROUND } from "@zos/device";
import { onDigitalCrown, KEY_HOME } from "@zos/interaction";
import { log as Logger } from "@zos/utils";
import { BOMB, PLAYER, SCORE, BYNAME } from "./index.style";
import { GameObject } from "../classes/game_object";
import * as utils from "../utils/utils.js";

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

let playerWidth = 42;
let playerX = 12;
let playerY = 350;
let payerMaxX = 200;
let playerMinX = -140;

let bombSpawnY = 40;

let bomb1Y = bombSpawnY;
let bomb1X = 8;

let bomb2Y = bombSpawnY - 100;
let bomb2X = 8;

let bomb3Y = bombSpawnY - 200;
let bomb3X = 8;

let scoreTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
	...SCORE,
});

let byNameTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
	...BYNAME,
});

let playerGameObject = new GameObject(
	"player",
	playerX,
	playerY,
	40 + playerWidth / 2,
	20,
	hmUI.createWidget(hmUI.widget.TEXT, { ...PLAYER })
);
let bomb1GameObject = new GameObject(
	"bomb1",
	bomb1X,
	bomb1Y,
	15,
	10,
	hmUI.createWidget(hmUI.widget.TEXT, {
		...BOMB,
	})
);
let bomb2GameObject = new GameObject(
	"bomb2",
	bomb2X,
	bomb2Y,
	15,
	10,
	hmUI.createWidget(hmUI.widget.TEXT, {
		...BOMB,
	})
);

let bomb3GameObject = new GameObject(
	"bomb3",
	bomb3X,
	bomb3Y,
	15,
	10,
	hmUI.createWidget(hmUI.widget.TEXT, {
		...BOMB,
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
		byNameTextWidget;

		const playerControl = (key, degree) => {
			if (key === KEY_HOME) {
				playerX += degree * 2;
				if (playerX > payerMaxX) {
					playerX = payerMaxX;
				} else if (playerX < playerMinX) {
					playerX = playerMinX;
				}
				logger.debug(playerX.toString());
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
			if (bombY > 400) {
				bombY = bombSpawnY;
				playerScore = 0;
				scoreTextWidget.setProperty(hmUI.prop.MORE, {
					text: playerScore.toString(),
				});

				//update  bomb X possition for new spawn
				bombX = utils.randomIntFromInterval(-150, 200);
				updateBombPoss(bombGameObject, bombX, bombY);
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
				bombX = utils.randomIntFromInterval(-150, 200);
				updateBombPoss(bombGameObject, bombX, bombY);
			}
		}

		//check if there is a collision
		checkBombPlayerCollision(bomb1GameObject, bomb1X, bomb1Y);
		checkBombPlayerCollision(bomb2GameObject, bomb2X, bomb2Y);
		checkBombPlayerCollision(bomb3GameObject, bomb3X, bomb3Y);

		//increase bomb speed with each passing bomb catched
		speedAddition = 0.5 * playerScore;
		bomb1Y += 2 + speedAddition;
		bomb2Y += 2 + speedAddition;
		bomb3Y += 2 + speedAddition;

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

		playerGameObject.hitbox.setPoss(
			playerX - playerWidth / 2,
			playerGameObject.hitbox.y2
		);
	},
});
