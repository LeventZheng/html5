/**
 * Created by Administrator on 2016/5/3.
 */
///<reference path="animal.ts"/>

class Bird extends Animal{
    name:string;
    constructor(name:string){
        super(name);
    }
    do(){
        alert(this.name + 'fly...');
    }
}