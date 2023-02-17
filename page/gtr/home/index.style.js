import * as hmUI from "@zos/ui";
import { getText } from "@zos/i18n";
import { getDeviceInfo } from "@zos/device";
import { px } from "@zos/utils";

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo();

export const PLAYER = {
	src: "gameObjects/player.png",
	x: 200,
	y: 350,
};

export const BOMB = {
	text: getText("Ó"),
	x: px(42),
	y: px(-100),
	w: DEVICE_WIDTH - px(42) * 2,
	h: px(100),
	color: 0xffffff,
	text_size: px(24),
	align_h: hmUI.align.CENTER_H,
	text_style: hmUI.text_style.WRAP,
};

export const BOMB1 = {
	src: "gameObjects/bomb1.png",
	x: 200,
	y: 40,
	w: DEVICE_WIDTH - px(42) * 2,
	h: px(100),
	color: 0xffffff,
	text_size: px(24),
	align_h: hmUI.align.CENTER_H,
	text_style: hmUI.text_style.WRAP,
};
export const BOMB2 = {
	src: "gameObjects/bomb2.png",
	x: 200,
	y: 40,
	w: DEVICE_WIDTH - px(42) * 2,
	h: px(100),
	color: 0xffffff,
	text_size: px(24),
	align_h: hmUI.align.CENTER_H,
	text_style: hmUI.text_style.WRAP,
};
export const BOMB3 = {
	src: "gameObjects/bomb3.png",
	x: 200,
	y: 40,
	w: DEVICE_WIDTH - px(42) * 2,
	h: px(100),
	color: 0xffffff,
	text_size: px(24),
	align_h: hmUI.align.CENTER_H,
	text_style: hmUI.text_style.WRAP,
};

export const SCORE = {
	text: getText("0"),
	x: px(100),
	y: px(20),
	w: DEVICE_WIDTH - px(42) * 2,
	h: px(100),
	color: 0xffffff,
	text_size: px(24),
	align_h: hmUI.align.CENTER_H,
	text_style: hmUI.text_style.WRAP,
};

export const BYNAME = {
	text: getText("Made By Jonathan M."),
	x: (DEVICE_WIDTH - (DEVICE_WIDTH - px(42) * 2)) / 2,
	y: DEVICE_HEIGHT - px(30),
	w: DEVICE_WIDTH - px(42) * 2,
	h: px(100),
	color: 0xffffff,
	text_size: px(12),
	align_h: hmUI.align.CENTER_H,
	text_style: hmUI.text_style.WRAP,
};

export const START_BUTTON = {
	x: (DEVICE_WIDTH - 200) / 2,
	y: 350,
	w: 200,
	h: 50,
	radius: 12,
	normal_color: 0x7c37c4,
	press_color: 0xfeb4a8,
	text: "Start",
};

export const YES_BUTTON = {
	x: (DEVICE_WIDTH - 200) / 2,
	y: 280,
	w: 200,
	h: 50,
	radius: 12,
	normal_color: 0x7c37c4,
	press_color: 0xfeb4a8,
	text: "Yes",
};
export const NO_BUTTON = {
	x: (DEVICE_WIDTH - 200) / 2,
	y: 350,
	w: 200,
	h: 50,
	radius: 12,
	normal_color: 0x7c37c4,
	press_color: 0xfeb4a8,
	text: "No",
};

export const TITLE_SCREEN = {
	src: "gameObjects/title_screen.png",
	x: 50,
	y: 20,
	w: DEVICE_WIDTH,
	h: DEVICE_HEIGHT,
};
export const GAME_OVER_TEXT = {
	text: getText("Game Over \n Try Again?"),
	x: px(0),
	y: px(180),
	w: DEVICE_WIDTH,
	h: px(300),
	color: 0xffffff,
	text_size: px(24),
	align_h: hmUI.align.CENTER_H,
};
