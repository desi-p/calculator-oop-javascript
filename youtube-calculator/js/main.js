//grab screen display from html
//event listener for buttons only
//functions for the special buttons
//display solutions
//continue to change solution until cleared

//setting initial constructors for places for our variables to go
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear() //clears display as soon as new calculator created
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        //this resets current and previous operands to empty string and the operation to undefined as no operation has been entered
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    //need to convert to string so it's concatenated and not "added"
    }
    
    chooseOperation(operation) {
        //add check so a value has to be added before transitioning to previousOperand
        if (this.currentOperand === '') return
        //if using multiple values - this computes and shows answer as previousOperand
        if (this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        //moves currentOperand to previousOperand
        this.currentOperand = ''
        //clears and allows a new value as currentOperand
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        //checks to ensure a previousOperand and currentOperand are available before computing
        if (isNaN(prev) || isNaN(current)) return
        //use switch to determine operation
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }
    
    getDisplayNumber(number){
    //adding commas
    //ensures number is a string
    const stringNumber = number.toString()
    //takes string turns to array
    //integer is digits before decimal
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    //integers after decimal
    const decimalDigits = stringNumber.split('.')[1]

    let integerDisplay 
    if (isNaN(integerDigits)){
        integerDisplay = ''
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0
        })
    }
    if (decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        //this.previousOperandTextElement.innerText = this.previousOperand
        if (this.operation!=null){
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    
    }

}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

