export default class LocalStorage {
    /**
     * @param {string} dataName - set the data name to label the data to be set
     * @param {any} dataNdataame - datas to be saved
     */
    saveData (dataName, data) {
        localStorage.setItem(dataName, JSON.stringify(data));
    }

    /**
     * @param {string} dataName - to get the data that is labled
     */
    loadData (dataName) {
        const getData = localStorage.getItem(dataName);

        return JSON.parse(getData);
    }
}