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
const snakeParts=[];
var taillength=0;
var score=0;
var value=Math.floor(Math.random()*10);

    
    




 
function drawgame(){
    chnagesnakeposition();
    let result = isgameover();
    if(result){
        return;
    }
    clearscreen();
   
text();
    drawsnake(); 
    drawapple(); 
    checkapplecollision();
    drawscore();
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

 function text(){
     ctx.fillStyle="white";
     ctx.font ="10px Verdana" 
    ctx.fillText("Score" +score,canvas.width-50,10);

 }
function checkapplecollision(){
    if(applex===headx&&appley==heady){
        applex=Math.floor(Math.random()*tilecount);
        appley=Math.floor(Math.random()*tilecount);
        var value=Math.floor(Math.random()*3);
            ctx.fillStyle="white";
            ctx.font ="50px Verdana" 
            ctx.fillText(Math.floor(Math.random()*value),canvas.width-200,50);
            taillength=taillength+value;
            score=score+value;    
        }       
    }


function drawscore(){
    ctx.fillStyle="white";
    ctx.font ="10px Verdana" 
    ctx.fillText("Score"+score,canvas.width-50,10);

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
