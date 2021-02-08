'use strict';

import { amap } from './map.js';




class game{

    state = false;

    constructor(size){
        this.size = size;
        this.rw = Math.round(amap.w/size);
        this.rh = Math.round(amap.h/size);
        this.len = this.rw*this.rh;
        this.cells = new Array(Math.round(this.rw*this.rh));
    
        this.tempcells = new Array(Math.round(this.rw*this.rh));
    }


    checkState = (i)=>{
        let alivecount = this.tempcells[i-1]+this.tempcells[i+1]+this.tempcells[i-this.rw]+this.tempcells[i-this.rw-1]+this.tempcells[i-this.rw+1]+this.tempcells[i+this.rw-1]+this.tempcells[i+this.rw+1]+this.tempcells[i+this.rw];
        if(alivecount == 3){
            if(this.cells[i]==0){
                this.cells[i]=1; 
            }    
        }
        else if(alivecount != 2){
            this.cells[i]=0;
        }
    }

    nextStep = ()=>{
        this.tempcells = this.cells.slice();
        for (let i = 0; i < this.len; i++) {
            this.checkState(i);
        }
    }

    generateCells = ()=>{
        for(let i = 0; i < this.len; i++){
            this.cells[i] = Math.round(random(0,1));
        }
    }


    drawCells = ()=>{
        for (let x = 0; x < this.rw; x++) {
            for (let y = 0; y < this.rh; y++) {
                if(this.cells[x + this.rw*y] == 1){
                    fill('rgb(255,0,0)');
                    strokeWeight(0);
                    square(x * this.size, y * this.size, this.size);    
                }
                else{
                    fill(8);
                    strokeWeight(0);
                    square(x * this.size, y * this.size, this.size);    
                }
            }
        }
    }

    clearCells = () => {
        for (let i = 0; i < this.rw*this.rh; i++) {
            this.cells[i] = 0;
        }
    }
}



let g = new game(10);

window.setup = () => {
    createCanvas(amap.w, amap.h);
}


function mdraw() {
    if(mouseIsPressed){
        g.cells[Math.floor(mouseX/g.size)+g.rw * Math.floor(mouseY/g.size)] = 1;
    }
}


addEventListener('keydown', (event) => {
    if(event.key == 'q'){
        g.generateCells();
    }
})

addEventListener('keydown', (event) => {
    if(event.key == 'w'){
        g.state = !g.state;
    }
})




addEventListener('keydown', (event) => {
    if(event.key == 'e'){
        g.clearCells();
    }
})

window.draw = () => {
    mdraw();
    g.drawCells();
    if(g.state){
        g.nextStep();
    }
}
