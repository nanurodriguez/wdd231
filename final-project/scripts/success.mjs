// Displays form data from the URL query string

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);

    const parentName = urlParams.get('parentName');

    const successMessageContainer = document.querySelector('.success-message');

    if (successMessageContainer) {
        let personalizedGreeting = "Thank you for your application!";

        if (parentName) {
            const capitalizedName = parentName.charAt(0).toUpperCase() + parentName.slice(1).toLowerCase();
            personalizedGreeting = `Thank you, ${capitalizedName}, for your application!`;
        }

        const successTitle = successMessageContainer.querySelector('.success-title');
        if (successTitle) {
            successTitle.textContent = personalizedGreeting;
        }

        const submittedDataHTML = `
            <div class="submission-review">
                <h3>Application Summary:</h3>
                <p><strong>Parent/Guardian:</strong> ${urlParams.get('parentName') || 'N/A'}</p>
                <p><strong>Email:</strong> ${urlParams.get('parentEmail') || 'N/A'}</p>
                <p><strong>Phone:</strong> ${urlParams.get('parentPhone') || 'N/A'}</p>
                <hr>
                <p><strong>Child's Name:</strong> ${urlParams.get('childName') || 'N/A'}</p>
                <p><strong>Child's DOB:</strong> ${urlParams.get('childDOB') || 'N/A'}</p>
                <p><strong>Program Interest:</strong> ${urlParams.get('program') || 'N/A'}</p>
            </div>
        `;

        const nextStepsDiv = successMessageContainer.querySelector('.next-steps-info');
        if (nextStepsDiv) {
            nextStepsDiv.insertAdjacentHTML('beforebegin', submittedDataHTML);
        }
    }
});