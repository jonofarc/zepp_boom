import * as hmUI from '@zos/ui'
import { getText } from '@zos/i18n'
import { getDeviceInfo } from '@zos/device'
import { px } from '@zos/utils'

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo()



export const BOMB = {
  text: getText('Ó'),
  x: px(42),
  y: px(-100),
  w: DEVICE_WIDTH - px(42) * 2,
  h: px(100),
  color: 0xffffff,
  text_size: px(24),
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP,
}

export const PLAYER = {
  text: getText('T'),
  x: px(42),
  y: px(350), 
  w: DEVICE_WIDTH - px(42) * 2,
  h: px(100),
  color: 0xffffff,
  text_size: px(24),
  align_h: hmUI.align.CENTER_H,
  text_style: hmUI.text_style.WRAP,
}

