class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.currentInput = '0';
        this.previousInput = null;
        this.operation = null;
        this.initialize();
    }

    initialize() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', () => this.handleButtonClick(button.dataset.value));
        });
    }

    handleButtonClick(value) {
        if (value === 'AC') {
            this.clearAll();
        } else if (value === '+/-') {
            this.toggleSign();
        } else if (value === '%') {
            this.calculatePercentage();
        } else if (value === '=') {
            this.calculateResult();
        } else if (value === '⌫') {
            this.backspace();
        } else if (['+', '-', '*', '/'].includes(value)) {
            this.setOperation(value);
        } else if (value === '.') {
            this.addDecimal();
        } else {
            this.appendNumber(value);
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (this.currentInput === '0' && number !== '.') {
            this.currentInput = number;
        } else {
            this.currentInput += number;
        }
    }

    addDecimal() {
        if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
    }

    backspace() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
    }

    clearAll() {
        this.currentInput = '0';
        this.previousInput = null;
        this.operation = null;
    }

    toggleSign() {
        this.currentInput = (parseFloat(this.currentInput) * -1).toString();
    }

    calculatePercentage() {
        this.currentInput = (parseFloat(this.currentInput) / 100).toString();
    }

    setOperation(operation) {
        if (this.currentInput === '0') return;
        
        if (this.previousInput !== null && this.operation !== null) {
            this.calculateResult();
        }
        
        this.operation = operation;
        this.previousInput = this.currentInput;
        this.currentInput = '';
    }

    calculateResult() {
        if (this.operation === null || this.previousInput === null) return;
        
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        let result;
        
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        
        this.currentInput = result.toString();
        this.operation = null;
        this.previousInput = null;
    }

    updateDisplay() {
        if (this.operation !== null && this.previousInput !== null) {
            if (this.currentInput === '') {
                this.display.textContent = `${this.previousInput} ${this.operation}`;
            } else {
                this.display.textContent = `${this.previousInput} ${this.operation} ${this.currentInput}`;
            }
        } else {
            this.display.textContent = this.currentInput;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
