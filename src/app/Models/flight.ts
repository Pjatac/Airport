export class Flight{
    time: Date;
    number: string;
    direction: number;
    constructor( time: Date, number: string, direction: number){
        this.number = number;
        this.time = time;
        this.direction = direction;
    }; 
}