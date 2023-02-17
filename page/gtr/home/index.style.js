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
	text: getText("Jonathan M."),
	x: px(0),
	y: px(20),
	w: DEVICE_WIDTH - px(42) * 2,
	h: px(100),
	color: 0xffffff,
	text_size: px(12),
	align_h: hmUI.align.CENTER_H,
	text_style: hmUI.text_style.WRAP,
};
