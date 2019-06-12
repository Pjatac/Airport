export class MyLine{
    number: number;
    state: boolean;
    craft: string;
    direction: number;
    constructor( number: number, craft?: string, direction?: number){
        this.number = number;
        this.state = false;
        this.craft = craft;
        this.direction = direction;
    }; 
}