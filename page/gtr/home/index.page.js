import * as hmUI from '@zos/ui'
import { getDeviceInfo, SCREEN_SHAPE_ROUND } from '@zos/device'
import { onDigitalCrown, KEY_HOME } from '@zos/interaction'
import { log as Logger } from '@zos/utils'
import { BOMB, PLAYER } from './index.style'
import { GameObject } from '../classes/game_object'
import * as utils from '../utils/utils.js'

const logger = Logger.getLogger('helloworld')
const deviceWidth = getDeviceInfo().width
const deviceHeight = getDeviceInfo().height

var bombSpawnY = 0
var bomb1Y = bombSpawnY 
var bomb1X = 42

var playerX = 42
var playerY = 350




let playerGameObject = new GameObject('player',  playerX, playerY,10,20, hmUI.createWidget(hmUI.widget.TEXT, { 
  ...PLAYER
}))
let bomb1GameObject = new GameObject('bomb1', bomb1X, bomb1Y,10,10, hmUI.createWidget(hmUI.widget.TEXT, { 
  ...BOMB
})
) 

Page({
  build () {
    logger.debug('page build invoked') 
  },
  onInit () {
    logger.debug('page onInit invoked')

    

    console.log(playerGameObject.name.toString())

    playerGameObject.widget
    bomb1GameObject.widget
   

    this.mainLoop()
  },

  onDestroy () {
    offDigitalCrown()

    logger.debug('page onDestroy invoked')
  },


  
 

  mainLoop () {
    logger.log('mainLoop')

    
    

    const playerControl = (key, degree) => {
      if (key === KEY_HOME) {
        playerX += degree * 2
        if (playerX > 200) {
          playerX = 200
        } else if (playerX < -150) {
          playerX = -150
        }
        this.updatePlayerPoss(playerX);
        

      //  logger.debug('playerGameObject.hitbox.x1 = '+playerGameObject.hitbox.x1);   
      //  logger.debug('playerGameObject.hitbox.x2 = '+playerGameObject.hitbox.x2);  

      }
    }

    onDigitalCrown({
      callback: playerControl
    })

    const timer1 = timer.createTimer(
      10,
      10,

      //main game loop
      function (option) {

        


        //check if there is a collision
        const bomb1Collision = utils.collisionChecker(playerGameObject, bomb1GameObject);

       if(bomb1Collision == true){
        hmUI.showToast({
          text: "bomb stopped"
        })
        bomb1Y = bombSpawnY
       }

       
       //updateBombPoss(); 
        bomb1GameObject.widget.setProperty(hmUI.prop.MORE, { 
          y: bomb1Y
        })
        bomb1GameObject.hitbox.setPoss(bomb1GameObject.hitbox.x1, bomb1Y);

        
        bomb1Y++
        if (bomb1Y > 400 ) {
          hmUI.showToast({
            text: "bomb crashed"
          })
          bomb1Y = bombSpawnY
          
        }
       
      }, 
      { bombY: BOMB.y.toString() }
    )


    
  },

  updatePlayerPoss (playerX) {
    playerGameObject.widget.setProperty(hmUI.prop.MORE, {
      x: playerX
    })
  
    playerGameObject.hitbox.setPoss(playerX, playerGameObject.hitbox.y2);
  },

  updateBombPoss () { 
   // bombGameObject.widget.setProperty(hmUI.prop.MORE, {
 //     y: bombY
  //  })
  logger.debug('$$$$$$$$$$$$$$$ got here'); 
  },


})
