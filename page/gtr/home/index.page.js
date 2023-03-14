import * as hmUI from "@zos/ui";
import { getDeviceInfo, SCREEN_SHAPE_ROUND } from "@zos/device";
import { log as Logger } from "@zos/utils";
import { push } from "@zos/router";
import { START_BUTTON, TITLE_SCREEN, BYNAME } from "./index.style";
import { setScrollLock } from "@zos/page";

/* //how to show a toast
	hmUI.showToast({
						text: "bomb stopped",
					});
*/

const logger = Logger.getLogger("helloworld");
const deviceWidth = getDeviceInfo().width;
const deviceHeight = getDeviceInfo().height;

let titleScreen = hmUI.createWidget(hmUI.widget.IMG, {
	...TITLE_SCREEN,
});

let menuButton = hmUI.createWidget(hmUI.widget.BUTTON, {
	...START_BUTTON,
	click_func: (button_widget) => {
		push({
			url: "page/gtr/home/game.page",
			params: "type=1",
		});
	},
});

let byNameTextWidget = hmUI.createWidget(hmUI.widget.TEXT, {
	...BYNAME,
});

Page({
	build() {
		logger.debug("page build invoked");
		setScrollLock({
			lock: true,
		});
	},
	onInit() {
		logger.debug("page onInit invoked");
	},

	onDestroy() {
		offDigitalCrown();

		logger.debug("page onDestroy invoked");
	},
});
