import * as hmUI from '@zos/ui'
import { onDigitalCrown, KEY_HOME } from '@zos/interaction'
import { log as Logger } from '@zos/utils'
import { BOMB, PLAYER } from './index.style'

const logger = Logger.getLogger('helloworld')

var bomb;
var player;





Page({


  
  build() {
    logger.debug('page build invoked')
    bomb = hmUI.createWidget(hmUI.widget.TEXT, {
      ...BOMB,
    });
    
    player = hmUI.createWidget(hmUI.widget.TEXT, {
      ...PLAYER,
    })
    
  },
  onInit() {
    logger.debug('page onInit invoked')
    const deviceInfo = hmSetting.getDeviceInfo();
    console.log(deviceInfo.);
    
    this.mainLoop();

    
  },

  onDestroy() {

    offDigitalCrown()

    logger.debug('page onDestroy invoked')
  },
 

  
  mainLoop() {
    logger.log('mainLoop'); 
    
    var bombHeight = 0;
    var playerPossition = 0;
    
    const playerControl = (key, degree) => {
      if (key === KEY_HOME) {

        playerPossition += degree*2;
        if(playerPossition > 200 ){
          playerPossition = 200;
        }else if(playerPossition < -150 ){
          playerPossition = -150;
        }
        player.setProperty(hmUI.prop.MORE, {
          x: playerPossition,
        })
      }
    }

    onDigitalCrown({
      callback: playerControl,
    });
    

    const timer1 = timer.createTimer(
      500,
      10,

      //main game loop
      function (option) {
        
        //console.log('timer callback')
        //console.log(option.bombY)

        bomb.setProperty(hmUI.prop.MORE, {

          y: bombHeight,
    
        })
        bombHeight++;
        if(bombHeight > 400 ){
          bombHeight = 0;
        }
        
      },
      { bombY: BOMB.y.toString() }
    )

   
    
    
    
     
     
  },



  

})