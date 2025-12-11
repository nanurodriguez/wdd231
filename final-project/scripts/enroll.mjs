//Client-Side Form Validation

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('enrollment-form');
    if (!form) return;

    // Getting all required input elements
    const requiredInputs = form.querySelectorAll('[required]');
    const childDOBInput = document.getElementById('cDOB');
    const formFields = [
        document.getElementById('pName'),
        document.getElementById('pEmail'),
        document.getElementById('pPhone'),
        document.getElementById('cName'),
        childDOBInput,
        document.getElementById('consent')
    ];

    // --- Helper Functions for Validation ---

    function isRequired(input) {
        if (!input.value.trim()) {
            showError(input, `${getFieldName(input)} is required.`);
            return false;
        }
        showSuccess(input);
        return true;
    }

    function isValidEmail(input) {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(input.value.trim())) {
            showError(input, 'Email is not valid.');//making sure the email is valid
            return false;
        }
        showSuccess(input);
        return true;
    }

    // Validating phone number format 
    function isValidPhone(input) {
        const phoneRegex = /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
        if (!phoneRegex.test(input.value.trim())) {
            showError(input, 'Phone number must be a valid 10-digit number (e.g., 555-555-5555).');
            return false;
        }
        showSuccess(input);
        return true;
    }

    // Validating Date of Birth 


function isValidDOB(input) {
    if (!isRequired(input)) return false;

    const dob = new Date(input.value);
    const today = new Date();


    // Child's DOB must be BEFORE this date.
    const minAgeCutoff = new Date();
    minAgeCutoff.setFullYear(today.getFullYear() - 1); 


    // Child's DOB must be AFTER this date.
    const maxAgeCutoff = new Date();
    maxAgeCutoff.setFullYear(today.getFullYear() - 5); 
    


    // Future Date
    if (dob > today) {
        showError(input, 'Date of Birth cannot be in the future.');
        return false;
    }
    

    if (dob > minAgeCutoff) {
        showError(input, 'Child must be at least 1 year old.');
        return false;
    }
    

    if (dob < maxAgeCutoff) {
        showError(input, 'Child must be 5 years old or younger for these programs.');
        return false;
    }
    
    showSuccess(input);
    return true;
}


    // Displaying error message next to the input
    function showError(input, message) {
        const formControl = input.closest('fieldset');
        let errorElement = formControl.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('small');
            errorElement.className = 'error-message';
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
        errorElement.innerText = message;
        input.classList.add('input-error');
        input.classList.remove('input-success');
    }

    function showSuccess(input) {
        const formControl = input.closest('fieldset');
        const errorElement = formControl.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        input.classList.remove('input-error');
        input.classList.add('input-success');
    }

    function getFieldName(input) {
        const label = input.closest('fieldset').querySelector(`label[for="${input.id}"]`);
        return label ? label.textContent.replace(/\s*\*$/, '').trim() : input.name;
    }


    function validateForm() {
        let isValid = true;

        formFields.forEach(input => {
            if (input) {
                input.classList.remove('input-error', 'input-success');
                const errorElement = input.closest('fieldset').querySelector('.error-message');
                if (errorElement) errorElement.remove();
            }
        });

        if (!isRequired(document.getElementById('pName'))) isValid = false;
        if (!isRequired(document.getElementById('cName'))) isValid = false;

        const pEmail = document.getElementById('pEmail');
        if (!isRequired(pEmail) || !isValidEmail(pEmail)) isValid = false;

        const pPhone = document.getElementById('pPhone');
        if (!isRequired(pPhone) || !isValidPhone(pPhone)) isValid = false;

        if (!isValidDOB(childDOBInput)) isValid = false;


        const consent = document.getElementById('consent');
        if (!consent.checked) {
            showError(consent, 'You must agree to be contacted.');
            isValid = false;
        } else {
            showSuccess(consent);
        }

        return isValid;
    }

    

    //form submission
    form.addEventListener('submit', (e) => {
        if (!validateForm()) {
            e.preventDefault(); 
            const firstError = form.querySelector('.input-error');
            if (firstError) {
                firstError.focus();
            }
        }
    });

    formFields.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.id === 'pEmail') {
                isValidEmail(input);
            } else if (input.id === 'pPhone') {
                isValidPhone(input);
            } else if (input.id === 'cDOB') {
                isValidDOB(input);
            } else if (input.type === 'checkbox') {
            } else {
                isRequired(input);
            }
        });
    });
});