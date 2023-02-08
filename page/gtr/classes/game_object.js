export class GameObject {
  constructor(name ,xPos, yPos, hitboxWidth, hitboxHeight, widget) {
    this.name = name;
    this.hitboxWidth = hitboxWidth;
    this.hitboxHeight = hitboxHeight;
    this.widget = widget; 
    this.hitbox = new hitBox(xPos, yPos,hitboxWidth, hitboxHeight, hitboxWidth)
  }


}

class hitBox {
 

  constructor(x , y, hitboxWidth, hitboxHeight) {
    this.x1 = x;
    this.x2 = x+hitboxWidth;
    this.y1 = y - hitboxHeight;
    this.y2 = y;  
    this.hitboxWidth = hitboxWidth; 
    this.hitboxHeight = hitboxHeight; 
  }  

  setPoss(x,y){
    this.x1 = x;
    this.x2 = x+this.hitboxWidth;
    this.y1 = y - this.hitboxHeight;
    this.y2 = y;    
  }


}
