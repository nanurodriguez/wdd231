

//modal for my join page so it displays more information when clicking on "More info" buttons

const membershipDetails = {
    npModal: {
        title: "Non-Profit Membership",
        cost: "No Fee",
        benefits: [
            "Access to member-exclusive events and training.",
            "Inclusion in the Chamber's directory (basic listing).",
            "Eligible for Non-Profit of the Year award."
        ],
        description: "This level is exclusively for registered non-profit organizations and offers core benefits at no cost."
    },
    bronzeModal: {
        title: "Bronze Membership",
        cost: "$25 per month",
        benefits: [
            "Basic listing in the Chamber directory.",
            "Invitations to all networking events.",
            "Eligibility for business seminars.",
            "One free ad placement per year (basic size)."
        ],
        description: "The entry-level tier, perfect for startups and small businesses looking to establish a presence."
    },
    silverModal: {
        title: "Silver Membership",
        cost: "$40 per month",
        benefits: [
            "Enhanced listing in the Chamber directory (logo included).",
            "Invitations to all networking events.",
            "Priority seating at selected business seminars.",
            "Two free ad placements per year (medium size).",
            "Discount on facility rental."
        ],
        description: "Offers enhanced visibility and greater perks for growing businesses."
    },
    goldModal: {
        title: "Gold Membership",
        cost: "$55 per month", // NOTE: I'm assuming a different price here than your HTML $25
        benefits: [
            "Premium listing in the Chamber directory (featured placement).",
            "Priority speaking opportunities at events.",
            "Unlimited free ad placements (large size).",
            "Exclusive invitations to leadership roundtables.",
            "Complimentary facility rental."
        ],
        description: "Our top tier, providing maximum exposure and priority access to all Chamber resources and events."
    }
};

// Function to generate the modal content
function createModalContent(details) {
    const benefitsList = details.benefits.map(benefit => `<li>${benefit}</li>`).join('');
    
    return `
        <button id="close-modal" aria-label="Close modal">X</button>
        <h2>${details.title}</h2>
        <p><strong>Cost:</strong> ${details.cost}</p>
        <p>${details.description}</p>
        <h3>Key Benefits:</h3>
        <ul>
            ${benefitsList}
        </ul>
    `;
}

// Function to display the modal
function displayMembershipDetails(modalId) {
    const dialogElement = document.querySelector(`#${modalId}`);
    const membershipData = membershipDetails[modalId];

    if (!dialogElement || !membershipData) {
        console.error("Modal element or data not found for ID:", modalId);
        return;
    }

    // Populate the dialog content
    dialogElement.innerHTML = createModalContent(membershipData);

    // Show the modal
    dialogElement.showModal();

    // 1. Close button logic
    document.querySelector(`#${modalId} #close-modal`).addEventListener("click", () => {
        dialogElement.close();
    }, { once: true }); // Use { once: true } to remove the listener after first use

    // 2. Close when clicking outside logic (similar to your example)
    dialogElement.addEventListener("click", function(event) {
        const rect = this.getBoundingClientRect();
        // Check if the click coordinates are outside the modal's box
        const inside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!inside) {
            this.close();
        }
    }, { once: true }); // Use { once: true }
}


// Attach event listeners to all "More Info" buttons
document.addEventListener('DOMContentLoaded', () => {
    const moreInfoButtons = document.querySelectorAll('.membership-cards button[data-modal]');

    moreInfoButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const modalId = event.currentTarget.dataset.modal;
            displayMembershipDetails(modalId);
        });
    });
});



