const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


class SnakePart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}

let speed = 7;
let tilecount=20;
let tilesize=canvas.width/tilecount-2;
let headx = 10;
let heady = 10; 
let xvelocity=0;
let yvelocity =0;
let applex=5;
let appley=5;
const snakeParts=[];
let taillength=1;
let score=0;


 
function drawgame(){
    chnagesnakeposition();
    let result = isgameover();
    if(result){
        return;
    }
    clearscreen();
   

    drawsnake(); 
    drawapple(); 
    checkapplecollision();
    drawscore();
    setTimeout(drawgame, 1000/ speed);
}
function isgameover(){
    let gameover=false;
    if(headx<0||heady<0){
    gameover=true;
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
function checkapplecollision(){
    if(applex===headx&&appley==heady){
        applex=Math.floor(Math.random()*tilecount);
        appley=Math.floor(Math.random()*tilecount);
        taillength++;
        score++;
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
