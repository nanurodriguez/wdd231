//THANK YOU PAGE!
//  Function to retrieve URL parameters (like in the Advanced Forms activity)
const urlParams = new URLSearchParams(window.location.search);

// Get the element where the summary will be displayed
const summaryContainer = document.getElementById('form-summary');

// Define the required fields and their display labels
const requiredFields = [
    { param: 'first-name', label: 'First Name' },
    { param: 'lastName', label: 'Last Name' },
    { param: 'email', label: 'Email Address' },
    { param: 'phone', label: 'Mobile Phone' },
    { param: 'organization', label: 'Organization Name' },
    { param: 'membership', label: 'Membership Level' },
    { param: 'timestamp', label: 'Date/Time Applied' }
];

// Start building the HTML content for the summary
let summaryHTML = '<ul>';

requiredFields.forEach(field => {
    const value = urlParams.get(field.param);
    
    // Check if the value exists and format it for display
    if (value) {
        let displayValue = value;

        // Custom formatting for the timestamp
        if (field.param === 'timestamp') {
            try {
                // Convert the timestamp (which is likely milliseconds since epoch) to a readable date string
                const date = new Date(parseInt(value)); 
                displayValue = date.toLocaleString(); // Use local string for readability
            } catch (e) {
                // In case of error, just use the raw value
                displayValue = value; 
            }
        } 
        // Custom formatting for Membership Level value (e.g., 'np' -> 'NP Membership')
        else if (field.param === 'membership') {
            switch (value) {
                case 'np': displayValue = 'NP Membership (Non-Profit)'; break;
                case 'bronze': displayValue = 'Bronze'; break;
                case 'silver': displayValue = 'Silver'; break;
                case 'gold': displayValue = 'Gold'; break;
            }
        }


        // Add the formatted line to the HTML list
        summaryHTML += `
            <li>
                <strong>${field.label}:</strong> 
                <span>${displayValue}</span>
            </li>
        `;
    }
});

summaryHTML += '</ul>';

// Insert the generated HTML into the summary box
if (summaryContainer) {
    summaryContainer.innerHTML += summaryHTML;
} else {
    console.error("Unable to find the summary of your information.");
}