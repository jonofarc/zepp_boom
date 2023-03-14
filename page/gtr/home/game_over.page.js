import * as hmUI from "@zos/ui";
import { getDeviceInfo, SCREEN_SHAPE_ROUND } from "@zos/device";
import { log as Logger } from "@zos/utils";
import {
	YES_BUTTON,
	NO_BUTTON,
	GAME_OVER_TEXT,
	SCORE_TEXT,
} from "./index.style";
import { GameObject } from "../classes/game_object";
import { home, replace, back } from "@zos/router";
import { setScrollLock } from "@zos/page";

/* //how to show a toast 
	hmUI.showToast({
						text: "bomb stopped",
					});
*/

const logger = Logger.getLogger("helloworld");
const deviceWidth = getDeviceInfo().width;
const deviceHeight = getDeviceInfo().height;

let scoreText = hmUI.createWidget(hmUI.widget.TEXT, {
	...SCORE_TEXT,
});
let gameOverText = hmUI.createWidget(hmUI.widget.TEXT, {
	...GAME_OVER_TEXT,
});
let yesButton = hmUI.createWidget(hmUI.widget.BUTTON, {
	...YES_BUTTON,
	click_func: (button_widget) => {
		replace({
			url: "page/gtr/home/game.page",
			params: "type=1",
		});
	},
});
let noButton = hmUI.createWidget(hmUI.widget.BUTTON, {
	...NO_BUTTON,
	click_func: (button_widget) => {
		back();
	},
});

Page({
	build() {
		logger.debug("page build invoked");
		setScrollLock({
			lock: true,
		});
	},
	onInit(params) {
		logger.debug("page onInit invoked");
		scoreText.setProperty(hmUI.prop.MORE, {
			text: params + " Bombs",
		});
	},

	onDestroy() {
		offDigitalCrown();

		logger.debug("page onDestroy invoked");
	},
});
