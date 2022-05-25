const theme = document.getElementById("theme");
const themeChangeBtn = document.getElementById("themeChangeBtn");
themeChangeBtn.onclick = function changeTheme() {
	if (theme.getAttribute("href") == "/styles/dark-theme.css") {
		theme.setAttribute("href", `./styles/light-theme.css`);
	} else {
		theme.setAttribute("href", `./styles/dark-theme.css`);
	}
};

class Calculator {
	constructor(previosOperandTextElement, currentOperandTextElement) {
		this.previosOperandTextElement = previosOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
	}

	clear() {
		this.previosOperand = "";
		this.currentOperand = "";
		this.operation = undefined;
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === "") return;
		if (this.previosOperand !== "") {
			this.compute();
		}
		this.operation = operation;
		this.previosOperand = this.currentOperand;
		this.currentOperand = "";
	}

	compute() {
		let computation = 0;
		const prev = parseFloat(this.previosOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;
			case "-":
				computation = prev - current;
				break;
			case "x":
				computation = prev * current;
				break;
			case "÷":
				computation = prev / current;
				break;
			default:
				return;
		}
		this.currentOperand = computation;
		this.operation = undefined;
		this.previosOperand = "";
	}

	updateDisplay() {
		this.currentOperandTextElement.innerText = this.currentOperand;
		if (this.operation != null) {
			this.previosOperandTextElement.innerText = `${this.previosOperand} ${this.operation}`;
		} else {
			this.previosOperandTextElement.innerText = "";
		}
	}
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const resultButton = document.querySelector("[data-result]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previosOperandTextElement = document.querySelector(
	"[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
	"[data-current-operand]"
);

const calculator = new Calculator(
	previosOperandTextElement,
	currentOperandTextElement
);

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});
operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});
resultButton.addEventListener("click", (button) => {
	calculator.compute();
	calculator.updateDisplay();
});
allClearButton.addEventListener("click", (button) => {
	calculator.clear();
	calculator.updateDisplay();
});
deleteButton.addEventListener("click", (button) => {
	calculator.delete();
	calculator.updateDisplay();
});
