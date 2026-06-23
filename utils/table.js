// Table Class
// Utilites to control table
export default class Table {
    // tableId to get the tbody element id
    // theaderData to get the Data of needed for the table [string]
    // tableData to get the table headers of needed for the table {[]}
    // colspanSize for to check the table row size
    // isActionButtons will add another row for actions button
    constructor({tableId, theaderData = [], tableData = [], colspanSize, isActionButtons = false}) {
        this.theadTag = document.querySelector(`#${tableId} thead tr`);
        this.tbodyTag = document.querySelector(`#${tableId} tbody`);
        this.theaderData = theaderData;
        this.tableData = tableData;
        this.colspanSize = colspanSize;
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
}