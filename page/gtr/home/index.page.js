import * as hmUI from '@zos/ui'
import { getDeviceInfo, SCREEN_SHAPE_ROUND } from '@zos/device'
import { onDigitalCrown, KEY_HOME } from '@zos/interaction'
import { log as Logger } from '@zos/utils'
import { BOMB, PLAYER } from './index.style'

const logger = Logger.getLogger('helloworld')
const deviceWidth = getDeviceInfo().width
const deviceHeight = getDeviceInfo().height

let bomb
let player


class GameObject {
  constructor(name, widget, hitboxWidth, hitboxHeight) {
    this.name = name;
    this.widget = widget;
    this.hitboxWidth = hitboxWidth;
    this.hitboxHeight = hitboxHeight;
  }
}


Page({
  build () {
    logger.debug('page build invoked')
  },
  onInit () {
    logger.debug('page onInit invoked')
    
    let playerGameObject = new GameObject("player", PLAYER,10,10);
    let bomb1GameObject = new GameObject("bomb1", BOMB,10,10);

    console.log(playerGameObject.name.toString()) 

    bomb = hmUI.createWidget(hmUI.widget.TEXT, {
      ...bomb1GameObject.widget
    })

    player = hmUI.createWidget(hmUI.widget.TEXT, {
      ...playerGameObject.widget
    })

    this.mainLoop()
  },

  onDestroy () {
    offDigitalCrown()

    logger.debug('page onDestroy invoked')
  },

  mainLoop () {
    logger.log('mainLoop')

    



    var bombHeight = 0
    var playerPossition = 0
    

    const playerControl = (key, degree) => {
      if (key === KEY_HOME) {
        playerPossition += degree * 2
        if (playerPossition > 200) {
          playerPossition = 200
        } else if (playerPossition < -150) {
          playerPossition = -150
        }
        player.setProperty(hmUI.prop.MORE, {
          x: playerPossition
        })
      }
    }

    onDigitalCrown({
      callback: playerControl
    })

    const timer1 = timer.createTimer(
      500,
      10,

      //main game loop
      function (option) {
        bomb.setProperty(hmUI.prop.MORE, {
          y: bombHeight
        })
        bombHeight++
        if (bombHeight > 400) {
          bombHeight = 0
        }
      },
      { bombY: BOMB.y.toString() }
    )
  }
})
