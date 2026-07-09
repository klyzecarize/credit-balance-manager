export default class Table {
    /**
     * Table Class
     * 
     * @param {string} tableId -  to get the tbody element id.
     * @param {[string]} theaderData -  to get the Data of needed for the table [string].
     * @param {[object]} tableData -  to get the Data of needed for the table [object].
     * @param {string} modalElementId -  to get the element ID of the modal.
     * @param {boolean} isActionButtons -  to add another row for actions button.
     * 
     * Utilities to control table
    */
    constructor({tableId, theaderData = [], tableData = [], modalElementId, isActionButtons = false}) {
        this.theadTag = document.querySelector(`#${tableId} thead tr`);
        this.tbodyTag = document.querySelector(`#${tableId} tbody`);
        this.theaderData = theaderData;
        this.tableData = tableData;
        this.modalElementId = modalElementId;
        this.isActionButtons = isActionButtons;
    }

    // This will handle the render of table header
    loadTableHeader () {
        this.theadTag.innerHTML = "";

        this.theaderData.forEach(header => {
            const headerHtml = `
                <th scope="col">${header}</th>
            `;
        
            this.theadTag.insertAdjacentHTML('beforeend', headerHtml);
        });

        this.isActionButtons && this.theadTag.insertAdjacentHTML('beforeend', "<th scope='col'>Actions</th>");
    }

    // This will handle the render of table data
    loadTableData () {
        this.tbodyTag.innerHTML = "";

        if (this.tableData.length === 0) {
            const rowHtml = `
                <tr>
                    <td id="emptyData" colspan="${this.isActionButtons ? this.theaderData.length + 1 : this.theaderData.length}">Empty</td>
                </tr>
            `;

            this.tbodyTag.innerHTML = rowHtml;

            return;
        }

        this.tableData.forEach( (data, index) => {

            // this.tbodyTag.insertAdjacentHTML('beforeend', "<tr>");
            let rowHtml = `<th scope="row">${index + 1}</th>`;

            // If needed both keys and value
            // Object.entries(user).forEach(([key, value]) => {
            //     console.log(`${key}: ${value}`);
            // });

            Object.values(data).forEach(dataEl => {
                rowHtml = rowHtml.concat(`<td>${dataEl}</td>`);
            }); 

            if (this.isActionButtons) {
                rowHtml = rowHtml.concat(
                    `<td>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${this.modalElementId}">
                            Update
                        </button>
                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#${this.modalElementId}">
                            Delete
                        </button>
                    </td>`
                );
            }

            this.tbodyTag.insertAdjacentHTML('beforeend', rowHtml);

        });
    }

    // This will handle the table render
    loadTable () {
        if (this.theaderData.length === 0) {
            const rowHtml = `
                <th id="emptyHeaderData">Add header</th>
            `;

            this.theadTag.innerHTML = rowHtml;

            return;
        }

        this.loadTableHeader();
        this.loadTableData();
    }

    resetTable() {
        this.tableData.length = 0;
        this.loadTable();
    }
}