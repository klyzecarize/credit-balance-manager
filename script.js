import Table from "./utils/table.js";
import Form from "./utils/form.js";

class CreditBalanceManagerApp {
    constructor () {
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
        this.expenses = [];
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
    }

    handleSubmit (event) {
        const expenseFormData = this.expenseForm.handleSubmit(event);

        this.expenses.push(expenseFormData);

        this.table.loadTable();
        this.handleBalanceRemaining();

        this.resetBtn.disabled = false;
    }

    handleBalanceRemaining () {
        let fTotalAmount = 0;
        
        this.expenses.forEach( expense => {
            fTotalAmount += Number(expense.amount);
        });

        this.amountTxt.innerHTML = `₱${this.creditLimit - fTotalAmount}`;
    }

    resetTable() {
        this.table.resetTable();

        this.resetBtn.disabled = true;

        this.handleBalanceRemaining();
    }
}

const credBalManagerApp = new CreditBalanceManagerApp();