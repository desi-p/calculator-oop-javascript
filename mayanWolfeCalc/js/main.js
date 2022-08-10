//required abilities of a calculator:
    //accept user inputs (buttons) (number, operator, number)
    //should accept decimals
    //store inputs
    //recognize inputs and perform calculations
    //return the answer

//optional features:
    //should accept longer arithmetic operations
    //display all input as it is being entered
    //store previous total as start of next operation
    //clear button should clear all entries
    //should prevent invalid inputs (operators next to each other, two decimal points)
    //either allow it to trail to the left or limit number of characters allowed for input


const keys = document.querySelector('.calculator-buttons');
// ^fires if you click any button within the class container
keys.addEventListener('click', event => {
    //line below - tells it to go into event object and grab target --> called deconstruction
    const {target} = event;
    const {value} = target;
    if (!target.matches('button')){
        return;
    } else {
        //pass to parse method
        //console.log(value)
        calculator.parseInput(value)
    } 
})

const calculator = {
    displayText: '0',
    prevTotal: null,

    parseInput(value){


        //have any of the 'special buttons' been clicked?
        switch(value){
            case '=': 
                //calculate the answer
                break;
            case 'AC': 
                //clear screen and stored values
                break;
            case '.':
                //decimals (if decimal is first...want 0 to remain before decimal)
                if (this.diplayText == 0){
                    //pass '0.' into add text method 
                } else {
                    //add value to text string
                }
                break;
            default: 
                //add value to text string
                break;

        }
    },

    addText(value){
        //clears the zero from html and allows just value to show instead of '0value' 
        if (this.displayText === '0'){
            this.displayText = ''
        } else if (this.prevTotal !== null){
            this.displayText = this.prevTotal
            this.prevTotal = null
        }

        if () //user has entered an invalid sequence don't proceed) 
        {}

        this.displayText += value
        //output display text to screen
        
    },
}

