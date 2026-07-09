export default class Form {
    /**
     * Form Class
     * 
     * @param {object} formModal -  to get the form modal elements
     * @param {object} currentForm -  to get forms.
     * 
     * Utilities to control table
    */
    constructor ({formModal, currentForm}) {
        this.formModal = formModal;
        this.currentForm = currentForm;
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
        let formData = new FormData(this.currentForm);

        // Convert to a standard JS object with the key based with input's name tag
        const data = Object.fromEntries(formData.entries());
        data["date"] = today.toLocaleDateString();

        formData = new FormData();
        form.reset();

        // hide the modal
        modalInstance.hide();

        return data;
    }
}