class Calculator {
    constructor(previousElement, currentElement) {
        this.previousElement = previousElement;
        this.currentElement = currentElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else if (number === '.' && this.currentOperand.includes('.')) {
            return;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(current)) return;
        
        if (this.operation && !isNaN(prev)) {
            switch (this.operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        alert('No se puede dividir entre cero');
                        this.clear();
                        return;
                    }
                    computation = prev / current;
                    break;
                default:
                    return;
            }
            
            this.currentOperand = computation.toString();
            this.operation = undefined;
            this.previousOperand = '';
        }
        
        this.updateDisplay();
    }

    scientific(func) {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        let result;
        
        switch (func) {
            case 'sin':
                result = Math.sin(current * Math.PI / 180);
                break;
            case 'cos':
                result = Math.cos(current * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan(current * Math.PI / 180);
                break;
            case 'log':
                if (current <= 0) {
                    alert('Logaritmo solo para números positivos');
                    return;
                }
                result = Math.log10(current);
                break;
            case 'ln':
                if (current <= 0) {
                    alert('Logaritmo natural solo para números positivos');
                    return;
                }
                result = Math.log(current);
                break;
            case 'sqrt':
                if (current < 0) {
                    alert('No se puede calcular raíz cuadrada de números negativos');
                    return;
                }
                result = Math.sqrt(current);
                break;
            case 'pow':
                result = Math.pow(current, 2);
                break;
            default:
                return;
        }
        
        this.currentOperand = result.toString();
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentElement.textContent = this.currentOperand;
        
        if (this.operation != null) {
            let operationSymbol = this.operation;
            if (this.operation === '*') operationSymbol = '×';
            if (this.operation === '/') operationSymbol = '÷';
            this.previousElement.textContent = `${this.previousOperand} ${operationSymbol}`;
        } else {
            this.previousElement.textContent = '';
        }
    }
}

const previousElement = document.getElementById('previous');
const currentElement = document.getElementById('current');

const calc = new Calculator(previousElement, currentElement);