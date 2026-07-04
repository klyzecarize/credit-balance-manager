import Table from "./utils/table.js";

class CreditBalanceManagerApp {
    constructor () {
        this.expenseForm = document.getElementById("expenseForm");
        this.modalFormSubmit = this.expenseForm.querySelector('.modal-footer button[type="submit"]');
        this.formModal = document.getElementById("addExpenseModal");
        this.amountTxt = document.getElementById("remainingBalTxt");
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
            colspanSize: 4
        });

        this.expenseForm.addEventListener('submit', this.handleSubmit.bind(this));

        this._init();
    }

    _init () {
        this.table.loadTable();
        this.handleBalanceRemaining();
    }

    handleSubmit (event) {
        const form = event.target;
        const today = new Date();
        
        // Get the modalInstance
        const modalInstance = bootstrap.Modal.getOrCreateInstance(this.formModal);

        // Prevents reloading the page
        event.preventDefault();

        // FormData relies on input "name" tags
        // Gather form data dynamically
        let formData = new FormData(this.expenseForm);

        // Convert to a standard JS object with the key based with input's name tag
        const data = Object.fromEntries(formData.entries());
        data["date"] = today.toLocaleDateString();
        this.expenses.push(data);
        
        this.table.loadTable();
        this.handleBalanceRemaining();

        formData = new FormData();
        form.reset();

        // hide the modal
        modalInstance.hide();
    }

    handleBalanceRemaining () {
        let fTotalAmount = 0;
        
        this.expenses.forEach( expense => {
            fTotalAmount += Number(expense.amount);
        });

        this.amountTxt.innerHTML = `₱${this.creditLimit - fTotalAmount}`;
    }
}

const credBalManagerApp = new CreditBalanceManagerApp();