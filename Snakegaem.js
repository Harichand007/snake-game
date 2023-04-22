const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


class SnakePart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

var speed = 5;
var tilecount=20;
var tilesize=canvas.width/tilecount-2;
var headx = 10;
var heady = 10; 
var xvelocity=0;
var yvelocity =0;
var applex=5;
var appley=5;
var whitex=7;
var whitey=7;
var yellowx=1;
var yellowy=2;
var pinkx=10;
var pinky=10;
var valuea;
var valuep;
var valuew;
var valuey;
const snakeParts=[];
var taillength=1;
var score=0;
//var score=int(score1);
var value=Math.floor(Math.random()*10);

    

function drawgame(){
    chnagesnakeposition();
    let result = isgameover();
    if(result){
        return;
    }
    clearscreen();
  
    // text();
    drawsnake(); 
    drawapple(); 
    drawwhite(); 
    drawpink();
    drawyellow();
    checkapplecollision();
    checkwhitecollision();
    checkyellowcollision();
    checkpinkcollision();
    drawscore();
    drawvalue();
    valueapple();
    valuepink();
    valueyellow();
    valuewhite();
    setTimeout(drawgame, 1000/ speed);
}
function isgameover(){

    let gameover=false;
    if (yvelocity===0&&xvelocity===0)
    return false;
    if(headx<0||heady<0){
    gameover=true;
}
else if (headx>=tilecount||heady>=tilecount){
    gameover=true;
} 
else if (taillength<=0||taillength>999){
    gameover=true;
}  
for(let i=0;i<snakeParts.length;i++){
    let part =snakeParts[i];
    if(part.x===headx&& part.y===heady){
        gameover=true;
        break;
    }
}
if (gameover){
    ctx.fillStyle='white';
    ctx.font ='50px Verdana';
   
    ctx.fillText("Game Over!",canvas.width/6.5,canvas.height/2)
}
return gameover;
    }
function clearscreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
    function drawsnake(){ 
        ctx.fillStyle='green';
        for(let i=0;i<snakeParts.length;i++){
        let part =snakeParts[i];
        ctx.fillRect(part.x*tilecount,part.y*tilecount,tilesize,tilesize)
        }
        snakeParts.push(new SnakePart(headx,heady))
        while(snakeParts.length>taillength){
            snakeParts.shift();
        }
        ctx.fillStyle ='blue';
        ctx.fillRect(headx*tilecount,heady*tilecount,tilesize,tilesize)

} 
function chnagesnakeposition(){
    headx=headx+xvelocity;
    heady=heady+yvelocity;
}
function drawapple(){ 
    ctx.fillStyle ='red';
        ctx.fillRect(applex*tilecount,appley*tilecount,tilesize,tilesize)
}
function drawyellow(){
    ctx.fillStyle ='yellow';
    ctx.fillRect(yellowx*tilecount,yellowy*tilecount,tilesize,tilesize) 
}
function drawwhite(){
    ctx.fillStyle ='white';
    ctx.fillRect(whitex*tilecount,whitey*tilecount,tilesize,tilesize) 
}
function drawpink(){
    ctx.fillStyle ='pink';
    ctx.fillRect(pinkx*tilecount,pinky*tilecount,tilesize,tilesize) 
}
function drawvalue(){

}
function valueapple(){
    ctx.fillStyle="red";
    ctx.font ="30px Verdana" 
   ctx.fillText("+",canvas.width-375,30); 
//    ctx.fillText(value,canvas.width-355,40);   
}
function valueyellow(){
ctx.fillStyle="yellow";
ctx.font ="30px Verdana" 
ctx.fillText("*",canvas.width-275,37);
}
function valuewhite(){
ctx.fillStyle="white";
ctx.font ="30px Verdana" 
ctx.fillText("-",canvas.width-175,30);
}
function valuepink(){
ctx.fillStyle="pink";
ctx.font ="30px Verdana" 
ctx.fillText("/",canvas.width-90,30);
}

//  function text(){
//      ctx.fillStyle="white";
//      ctx.font ="10px Verdana" 
//     ctx.fillText("Score" +score,canvas.width-50,10);

 //}
function checkapplecollision(){
    if(applex===headx&&appley==heady){
        applex=Math.floor(Math.random()*tilecount);
        appley=Math.floor(Math.random()*tilecount);
        var value=Math.floor(Math.random()*5);
        ctx.fillStyle="red";
        ctx.font ="50px Verdana"    
        ctx.fillText(value,canvas.width-355,40);
            taillength=taillength+value;
            score=score+value; 
                  
        } 
        return value;     
    }
function checkwhitecollision(){
    if(whitex===headx&&whitey==heady){
        whitex=Math.floor(Math.random()*tilecount);
        whitey=Math.floor(Math.random()*tilecount);
        var value=Math.floor(Math.random()*5);
            ctx.fillStyle="white";
            ctx.font ="50px Verdana" 
            ctx.fillText(value,canvas.width-160,40);
            taillength=taillength-value;
            score=score-value;    
        } 
        return value;      
    }
function checkyellowcollision(){
    if(yellowx===headx&&yellowy==heady){
        yellowx=Math.floor(Math.random()*tilecount);
        yellowy=Math.floor(Math.random()*tilecount);
        var value=Math.floor(Math.random()*5);
            ctx.fillStyle="yellow";
            ctx.font ="50px Verdana" 
            ctx.fillText(value,canvas.width-250,40);
            taillength=taillength*value;
            score=score*value;    
        }     
        return value;  
    }
function checkpinkcollision(){
    if(pinkx===headx&&pinky==heady){
        pinkx=Math.floor(Math.random()*tilecount);
        pinky=Math.floor(Math.random()*tilecount);
        var value=Math.floor(Math.random()*5);
            ctx.fillStyle="pink";
            ctx.font ="50px Verdana" 
            ctx.fillText(value,canvas.width-80,40);
            taillength=taillength/value;
            score=score/value;    
        }     
        return value;  
    }


function drawscore(){
    ctx.fillStyle="white";
    ctx.font ="15px Verdana" 
    ctx.fillText("Score"+score,canvas.width-60,canvas.height-10);

}



document.body.addEventListener('keydown', keyDown);
function keyDown(event){
    if(event.keyCode==38){
        if(yvelocity==1)
        return;
        yvelocity=-1;
        xvelocity=0;

    }
    if(event.keyCode==40){
        if(yvelocity==-1)
        return;
        yvelocity=1;
        xvelocity=0;

    }
    if(event.keyCode==37){
        if(xvelocity==1)
        return;
        yvelocity=0;
        xvelocity=-1;

    }
    if(event.keyCode==39){
        if(xvelocity==-1)
        return;
        yvelocity=0;
        xvelocity=1;

    }
 
}

drawgame();
