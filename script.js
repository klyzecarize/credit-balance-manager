import Table from "./utils/table.js";
import Form from "./utils/form.js";
import LocalStorage from "./utils/localstorage.js";

class CreditBalanceManagerApp {
    constructor () {
        // To cater the line by line for expenses
        this.localStorage = new LocalStorage();

        this.expenseFormElement = document.getElementById("expenseForm");
        this.modalFormSubmit = this.expenseFormElement.querySelector('.modal-footer button[type="submit"]');
        this.formModal = document.getElementById("addExpenseModal");
        this.amountTxt = document.getElementById("remainingBalTxt");
        this.resetBtn = document.getElementById("resetButton");
        this.tableHeaders = [
            "#",
            "Description",
            "Amount",
            "Date"
        ];
        this.expenses = this.loadExpenses();
        this.resetBtn.disabled = this.expenses != 0 && false;
        this.creditLimit = 3000;

        this.table = new Table({
            tableId: "expenseTable", 
            theaderData: this.tableHeaders,
            tableData: this.expenses,
            modalElementId: "addExpenseModal",
            // isActionButtons: true
        });

        this.expenseForm = new Form({
            formModal: this.formModal,
            currentForm: this.expenseFormElement,
        });

        // this.resetBtn.addEventListener('click', this.resetTable.bind(this));
        // this.expenseForm.addEventListener('submit', this.handleSubmit.bind(this));

        this.resetBtn.addEventListener(
            'click',
            () => this.resetTable()
        );
        this.expenseFormElement.addEventListener(
            'submit',
            (event) => this.handleSubmit(event)
        );


        this._init();
    }

    _init () {
        this.table.loadTable();
        this.handleBalanceRemaining();
        this.handleResetButton();
    }

    handleSubmit (event) {
        const expenseFormData = this.expenseForm.handleSubmit(event);

        this.expenses.push(expenseFormData);

        this.localStorage.saveData('expenses', this.expenses);

        this.table.loadTable();
        this.handleBalanceRemaining();

        this.handleResetButton();
    }

    handleBalanceRemaining () {
        let fTotalAmount = 0;
        
        this.expenses.forEach( expense => {
            fTotalAmount += Number(expense.amount);
        });

        this.amountTxt.innerHTML = `₱${this.creditLimit - fTotalAmount}`;
    }

    handleResetButton () {
        this.resetBtn.disabled = this.expenses.length === 0 ? true : false
    }

    loadExpenses () {
        return this.localStorage.loadData('expenses') ? this.localStorage.loadData('expenses') : []
    }

    resetTable () {
        this.table.resetTable();

        this.localStorage.saveData('expenses', this.expenses);

        this.handleResetButton();

        this.handleBalanceRemaining();
    }

}

const credBalManagerApp = new CreditBalanceManagerApp();