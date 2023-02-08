import * as hmUI from "@zos/ui";
import { getDeviceInfo, SCREEN_SHAPE_ROUND } from "@zos/device";
import { onDigitalCrown, KEY_HOME } from "@zos/interaction";
import { log as Logger } from "@zos/utils";
import { BOMB, PLAYER, SCORE } from "./index.style";
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

let playerX = 42;
let playerY = 350;

let bombSpawnY = 0;

let bomb1Y = bombSpawnY;
let bomb1X = 42;

let scoreTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
	...SCORE,
});

let playerGameObject = new GameObject(
	"player",
	playerX,
	playerY,
	10,
	20,
	hmUI.createWidget(hmUI.widget.TEXT, { ...PLAYER })
);
let bomb1GameObject = new GameObject(
	"bomb1",
	bomb1X,
	bomb1Y,
	10,
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

		this.mainLoop();
	},

	onDestroy() {
		offDigitalCrown();

		logger.debug("page onDestroy invoked");
	},

	mainLoop() {
		logger.log("mainLoop");

		const playerControl = (key, degree) => {
			if (key === KEY_HOME) {
				playerX += degree * 2;
				if (playerX > 200) {
					playerX = 200;
				} else if (playerX < -150) {
					playerX = -150;
				}
				this.updatePlayerPoss(playerX);

				//  logger.debug('playerGameObject.hitbox.x1 = '+playerGameObject.hitbox.x1);
				//  logger.debug('playerGameObject.hitbox.x2 = '+playerGameObject.hitbox.x2);
			}
		};

		onDigitalCrown({
			callback: playerControl,
		});

		const timer1 = timer.createTimer(
			10,
			10,

			//main game loop
			function (option) {
				//check if there is a collision
				const bomb1Collision = utils.collisionChecker(
					playerGameObject,
					bomb1GameObject
				);

				if (bomb1Collision == true) {
					bomb1Y = bombSpawnY;
					playerScore++;
					scoreTextWidget.setProperty(hmUI.prop.MORE, {
						text: playerScore.toString(),
					});

					//update  bomb X possition for new spawn
					bomb1X = utils.randomIntFromInterval(-150, 200);
					bomb1GameObject.widget.setProperty(hmUI.prop.MORE, {
						x: bomb1X,
					});
				}

				//updateBombPoss();
				bomb1GameObject.widget.setProperty(hmUI.prop.MORE, {
					y: bomb1Y,
				});
				bomb1GameObject.hitbox.setPoss(bomb1X, bomb1Y);

				bomb1Y += 2;
				if (bomb1Y > 400) {
					bomb1Y = bombSpawnY;
					playerScore = 0;
					scoreTextWidget.setProperty(hmUI.prop.MORE, {
						text: playerScore.toString(),
					});

					//update  bomb X possition for new spawn
					bomb1X = utils.randomIntFromInterval(-150, 200);
					bomb1GameObject.widget.setProperty(hmUI.prop.MORE, {
						x: bomb1X,
					});
				}
			},
			{ bombY: BOMB.y.toString() }
		);
	},

	updatePlayerPoss(playerX) {
		playerGameObject.widget.setProperty(hmUI.prop.MORE, {
			x: playerX,
		});

		playerGameObject.hitbox.setPoss(playerX, playerGameObject.hitbox.y2);
	},

	updateBombPoss() {
		// bombGameObject.widget.setProperty(hmUI.prop.MORE, {
		//     y: bombY
		//  })
		logger.debug("$$$$$$$$$$$$$$$ got here");
	},
});
