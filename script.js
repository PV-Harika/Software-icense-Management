// DOM Elements
const mainApp = document.getElementById('mainApp');
const changeContactBtn = document.getElementById('changeContactBtn');
const requestLicenseBtn = document.getElementById('requestLicenseBtn');

// Modal Elements
const changeContactModal = document.getElementById('changeContactModal');
const requestLicenseModal = document.getElementById('requestLicenseModal');
const renewLicenseModal = document.getElementById('renewLicenseModal');
const addUsersModal = document.getElementById('addUsersModal');
const revokeLicenseModal = document.getElementById('revokeLicenseModal');

// Close Modal Elements
const closeChangeContactModal = document.getElementById('closeChangeContactModal');
const closeRequestLicenseModal = document.getElementById('closeRequestLicenseModal');
const closeRenewLicenseModal = document.getElementById('closeRenewLicenseModal');
const closeAddUsersModal = document.getElementById('closeAddUsersModal');
const closeRevokeLicenseModal = document.getElementById('closeRevokeLicenseModal');

// Cancel Button Elements
const cancelChangeContact = document.getElementById('cancelChangeContact');
const cancelRequestLicense = document.getElementById('cancelRequestLicense');
const cancelRenewLicense = document.getElementById('cancelRenewLicense');
const cancelAddUsers = document.getElementById('cancelAddUsers');
const cancelRevokeLicense = document.getElementById('cancelRevokeLicense');

// Product Items
const productItems = document.querySelectorAll('.product-item');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    setupProductNavigation();
    setupTableActions();
});

// Event Listeners
function initializeEventListeners() {
    // Modal Triggers
    if (changeContactBtn) {
        changeContactBtn.addEventListener('click', () => openModal(changeContactModal));
    }
    if (requestLicenseBtn) {
        requestLicenseBtn.addEventListener('click', () => openModal(requestLicenseModal));
    }

    // Modal Close Buttons
    if (closeChangeContactModal) {
        closeChangeContactModal.addEventListener('click', () => closeModal(changeContactModal));
    }
    if (closeRequestLicenseModal) {
        closeRequestLicenseModal.addEventListener('click', () => closeModal(requestLicenseModal));
    }
    if (closeRenewLicenseModal) {
        closeRenewLicenseModal.addEventListener('click', () => closeModal(renewLicenseModal));
    }
    if (closeAddUsersModal) {
        closeAddUsersModal.addEventListener('click', () => closeModal(addUsersModal));
    }
    if (closeRevokeLicenseModal) {
        closeRevokeLicenseModal.addEventListener('click', () => closeModal(revokeLicenseModal));
    }

    // Cancel Buttons
    if (cancelChangeContact) {
        cancelChangeContact.addEventListener('click', () => closeModal(changeContactModal));
    }
    if (cancelRequestLicense) {
        cancelRequestLicense.addEventListener('click', () => closeModal(requestLicenseModal));
    }
    if (cancelRenewLicense) {
        cancelRenewLicense.addEventListener('click', () => closeModal(renewLicenseModal));
    }
    if (cancelAddUsers) {
        cancelAddUsers.addEventListener('click', () => closeModal(addUsersModal));
    }
    if (cancelRevokeLicense) {
        cancelRevokeLicense.addEventListener('click', () => closeModal(revokeLicenseModal));
    }

    // Form Submissions
    const changeContactForm = changeContactModal?.querySelector('.modal-form');
    if (changeContactForm) {
        changeContactForm.addEventListener('submit', handleChangeContact);
    }

    const requestLicenseForm = requestLicenseModal?.querySelector('.modal-form');
    if (requestLicenseForm) {
        requestLicenseForm.addEventListener('submit', handleRequestLicense);
    }

    const renewLicenseForm = renewLicenseModal?.querySelector('.modal-form');
    if (renewLicenseForm) {
        renewLicenseForm.addEventListener('submit', handleRenewLicense);
    }

    const addUsersForm = addUsersModal?.querySelector('.modal-form');
    if (addUsersForm) {
        addUsersForm.addEventListener('submit', handleAddUsers);
    }

    const revokeLicenseForm = revokeLicenseModal?.querySelector('.modal-form');
    if (revokeLicenseForm) {
        revokeLicenseForm.addEventListener('submit', handleRevokeLicense);
    }

    // Close modals when clicking outside
    document.addEventListener('click', function(event) {
        const modals = [changeContactModal, requestLicenseModal, renewLicenseModal, addUsersModal, revokeLicenseModal];
        modals.forEach(modal => {
            if (modal && event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

// Product Navigation
function setupProductNavigation() {
    productItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            productItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update product title
            const productName = this.querySelector('.product-name').textContent;
            const productTitle = document.querySelector('.product-title');
            if (productTitle) {
                productTitle.textContent = productName;
            }
            
            // Here you would typically load the product data
            loadProductData(this.dataset.product);
        });
    });
}

// Table Actions
function setupTableActions() {
    // Renew buttons
    const renewButtons = document.querySelectorAll('.btn-secondary:contains("Renew")');
    renewButtons.forEach(button => {
        if (button.textContent.includes('Renew')) {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const licenseKey = row.querySelector('.license-key').textContent;
                const userCount = row.querySelector('.user-count').textContent;
                openRenewModal(licenseKey, userCount);
            });
        }
    });

    // Add Users buttons
    const addUsersButtons = document.querySelectorAll('.btn-secondary:contains("Add Users")');
    addUsersButtons.forEach(button => {
        if (button.textContent.includes('Add Users')) {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const licenseKey = row.querySelector('.license-key').textContent;
                const userCount = row.querySelector('.user-count').textContent;
                openAddUsersModal(licenseKey, userCount);
            });
        }
    });

    // Revoke buttons
    const revokeButtons = document.querySelectorAll('.btn-danger');
    revokeButtons.forEach(button => {
        if (button.textContent.includes('Revoke')) {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const computerName = row.cells[0].textContent;
                const userName = row.cells[1].textContent;
                openRevokeModal(computerName, userName);
            });
        }
    });
}

// Modal Functions
function openModal(modal) {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openRenewModal(licenseKey, userCount) {
    const renewLicenseKey = document.getElementById('renewLicenseKey');
    const renewUserCount = document.getElementById('renewUserCount');
    
    if (renewLicenseKey) renewLicenseKey.textContent = licenseKey;
    if (renewUserCount) renewUserCount.textContent = userCount;
    
    openModal(renewLicenseModal);
}

function openAddUsersModal(licenseKey, userCount) {
    const addUsersLicenseKey = document.getElementById('addUsersLicenseKey');
    const currentUserCount = document.getElementById('currentUserCount');
    
    if (addUsersLicenseKey) addUsersLicenseKey.textContent = licenseKey;
    if (currentUserCount) currentUserCount.textContent = userCount;
    
    openModal(addUsersModal);
}

function openRevokeModal(computerName, userName) {
    const revokeComputerName = document.getElementById('revokeComputerName');
    const revokeComputerName2 = document.getElementById('revokeComputerName2');
    const revokeUserName = document.getElementById('revokeUserName');
    
    if (revokeComputerName) revokeComputerName.textContent = computerName;
    if (revokeComputerName2) revokeComputerName2.textContent = computerName;
    if (revokeUserName) revokeUserName.textContent = userName;
    
    openModal(revokeLicenseModal);
}

// Form Handlers
function handleChangeContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    
    if (name && email) {
        showLoadingState(event.target.querySelector('button[type="submit"]'));
        
        setTimeout(() => {
            closeModal(changeContactModal);
            updateContactInfo(name, email);
            showNotification('Contact information updated successfully!', 'success');
        }, 1000);
    } else {
        showNotification('Please fill in all fields.', 'error');
    }
}

function handleRequestLicense(event) {
    event.preventDefault();
    
    const users = document.getElementById('licenseUsers').value;
    const message = document.getElementById('licenseMessage').value;
    
    if (users) {
        showLoadingState(event.target.querySelector('button[type="submit"]'));
        
        setTimeout(() => {
            closeModal(requestLicenseModal);
            showNotification('License request sent successfully!', 'success');
            event.target.reset();
        }, 1000);
    } else {
        showNotification('Please specify the number of users.', 'error');
    }
}

function handleRenewLicense(event) {
    event.preventDefault();
    
    const message = document.getElementById('renewMessage').value;
    
    showLoadingState(event.target.querySelector('button[type="submit"]'));
    
    setTimeout(() => {
        closeModal(renewLicenseModal);
        showNotification('Renewal request sent successfully!', 'success');
        event.target.reset();
    }, 1000);
}

function handleAddUsers(event) {
    event.preventDefault();
    
    const additionalUsers = document.getElementById('additionalUsers').value;
    const message = document.getElementById('addUsersMessage').value;
    
    if (additionalUsers) {
        showLoadingState(event.target.querySelector('button[type="submit"]'));
        
        setTimeout(() => {
            closeModal(addUsersModal);
            showNotification('Additional users request sent successfully!', 'success');
            event.target.reset();
        }, 1000);
    } else {
        showNotification('Please specify the number of additional users.', 'error');
    }
}

function handleRevokeLicense(event) {
    event.preventDefault();
    
    showLoadingState(event.target.querySelector('button[type="submit"]'));
    
    setTimeout(() => {
        closeModal(revokeLicenseModal);
        showNotification('Revoke request sent successfully!', 'success');
        event.target.reset();
    }, 1000);
}

// Utility Functions
function showLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 1000);
}

function updateContactInfo(name, email) {
    const contactName = document.querySelector('.contact-name');
    const contactEmail = document.querySelector('.contact-email');
    
    if (contactName) contactName.textContent = name;
    if (contactEmail) contactEmail.textContent = email;
}

function loadProductData(productId) {
    // This would typically make an API call to load product-specific data
    console.log(`Loading data for product: ${productId}`);
    
    // Simulate loading different product data
    const productData = {
        'optimizer': {
            title: 'Magic Optimizer',
            licenses: [
                { key: '1234-5678-9012-3456', maintenance: '2025-12-31', users: 5, activations: '3/5' }
            ]
        },
        'server': {
            title: 'Magic Optimizer Server',
            licenses: [
                { key: '6789-9012-3456-1544', maintenance: '2025-07-18', users: 10, activations: '2/10' },
                { key: '7890-1234-5678-9012', maintenance: '2026-01-01', users: 11, activations: '2/11' },
                { key: '8901-2345-6789-0103', maintenance: '2025-07-31', users: 2, activations: '1/2' },
                { key: '47ae37d0af3bab494cbda', maintenance: '2026-01-01', users: 4, activations: '0/4' }
            ]
        },
        'compare-merge': {
            title: 'Magic Compare & Merge',
            licenses: [
                { key: 'abcd-efgh-ijkl-mnop', maintenance: '2025-09-15', users: 3, activations: '1/3' },
                { key: 'qrst-uvwx-yzab-cdef', maintenance: '2026-03-20', users: 7, activations: '4/7' }
            ]
        },
        'compare': {
            title: 'Magic Compare',
            licenses: [
                { key: 'ghij-klmn-opqr-stuv', maintenance: '2025-11-30', users: 2, activations: '1/2' }
            ]
        }
    };
    
    // Update the UI with new data
    const data = productData[productId];
    if (data) {
        updateProductDisplay(data);
    }
}

function updateProductDisplay(data) {
    // Update product title
    const productTitle = document.querySelector('.product-title');
    if (productTitle) {
        productTitle.textContent = data.title;
    }
    
    // Update licenses table
    const licensesTable = document.querySelector('.data-table tbody');
    if (licensesTable && data.licenses) {
        licensesTable.innerHTML = '';
        
        data.licenses.forEach(license => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="license-key">${license.key}</td>
                <td>
                    <span class="maintenance-date">${license.maintenance}</span>
                    ${new Date(license.maintenance) < new Date() ? '<button class="btn btn-secondary btn-xs">Renew</button>' : ''}
                </td>
                <td>
                    <span class="user-count">${license.users}</span>
                    <button class="btn btn-secondary btn-xs">Add Users</button>
                </td>
                <td class="activation-count">${license.activations}</td>
            `;
            licensesTable.appendChild(row);
        });
        
        // Re-setup table actions for new content
        setupTableActions();
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Helper function for querySelector with text content
Element.prototype.querySelector = function(selector) {
    if (selector.includes(':contains(')) {
        const text = selector.match(/:contains\("([^"]+)"\)/)[1];
        const elements = this.querySelectorAll(selector.replace(/:contains\("([^"]+)"\)/, ''));
        return Array.from(elements).find(el => el.textContent.includes(text));
    }
    return this.querySelector(selector);
};

// Initialize the app
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEventListeners);
} else {
    initializeEventListeners();
}
