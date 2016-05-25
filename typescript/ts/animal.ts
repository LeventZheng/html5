/**
 * Created by Administrator on 2016/5/3.
 */

class Animal{
    color:string;
    canFly:boolean;
    name:string;
    constructor(name){
        this.name = name;
    }
    do(){}
    getColor():string{
        return this.color;
    }
    setColor(color):void{
        return this.color = color;
    }
}

