export class MyLine{
    lineNumber: number;
    state: boolean;
    craft: string;
    direction: number;
    constructor( lineNumber: number, craft?: string, direction?: number){
        this.lineNumber = lineNumber;
        this.state = false;
        this.craft = craft;
        this.direction = direction;
    }; 
}