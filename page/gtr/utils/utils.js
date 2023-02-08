import { GameObject } from '../classes/game_object'
import { log as Logger } from '@zos/utils'


const logger = Logger.getLogger('helloworld')

export function collisionChecker( gameObject1, gameObject2 ) {
    let collision = false
    let collisionX = false
    let collisionY = false
    


    if((gameObject1.hitbox.x1 <= gameObject2.hitbox.x1  
        && gameObject1.hitbox.x2 >= gameObject2.hitbox.x1) ||
        (gameObject1.hitbox.x2 >= gameObject2.hitbox.x2   
            && gameObject1.hitbox.x1 <= gameObject2.hitbox.x2)  ){
                

               
                collisionX = true;
                logger.debug('collisionX'+collisionX);  

    } 

   // logger.debug('^^^ '+gameObject1.hitbox.x1+ " : ", gameObject1.hitbox.x2+ " : ", gameObject2.hitbox.x1+ " : ", gameObject2.hitbox.x2+ " : ");  


    if((gameObject1.hitbox.y1 <= gameObject2.hitbox.y1  
      && gameObject1.hitbox.y1 >= gameObject2.hitbox.y2) ||
      (gameObject1.hitbox.y2 >= gameObject2.hitbox.y1  
          && gameObject1.hitbox.y1 <= gameObject2.hitbox.y2)  ){  
              
            
             
              collisionY = true;
            //  logger.debug('collisionY'+collisionY); 

  }


  
    if(collisionX && collisionY){
      collision = true;
      logger.debug('collision'+collision); 
    }
    
    return collision;
  }