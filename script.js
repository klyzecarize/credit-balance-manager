import Table from "./utils/table.js";

class CreditBalanceManagerApp {
    constructor () {
        this.expenseForm = document.getElementById("expenseForm");
        this.modalFormSubmit = this.expenseForm.querySelector('.modal-footer button[type="submit"]');
        this.amountTxt = document.getElementById("remainingBalTxt");
        this.tableHeaders = [
            "#",
            "Description",
            "Amount",
            "Date"
        ];
        this.expenses = [{
            description: "Mcdo",
            amount: 1400,
            date: "06/23/2026"
        }, {
            description: "Mang Inasal",
            amount: 700,
            date: "06/23/2026"
        }];

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
        const submitDataSet = this.modalFormSubmit.dataset;

        event.preventDefault();
    }

    handleBalanceRemaining () {
        let fTotalAmount = 0.0;
        this.expenses.forEach( expense => {
            fTotalAmount += expense.amount;
        });

        this.amountTxt.innerHTML = `₱${3000 - fTotalAmount}`;
    }
}

const credBalManagerApp = new CreditBalanceManagerApp();