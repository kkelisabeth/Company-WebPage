document.getElementById('order-form').onsubmit = function(event) {
    event.preventDefault();

    const services = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(cb => cb.value);
    const area = document.getElementById('area').value;
    const date = document.getElementById('date').value; // Get date value from the dropdown
    const month = document.getElementById('month').value; // Get month value from the dropdown
    const deadline = date + ' ' + month; // Combine date and month values    
    const orderdate = document.getElementById('orderdate').value;

    if (services.length > 0 && area && deadline) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push({ services, area, deadline, orderdate}); // Add orderDate property
        localStorage.setItem('orders', JSON.stringify(orders));

        alert('Order submitted successfully.');
        window.location.href = 'orders.html';
    } else {
        alert('Please fill in all required fields.');
    }
};

// Get references to the checkboxes and the area input field
const checkboxes = document.querySelectorAll('input[name="services"]');
const areaInput = document.getElementById('area');

// Add event listener to each checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // Check if any of the specific services are checked
        const isChecked = Array.from(checkboxes).some(checkbox => {
            return checkbox.checked && (checkbox.value != 'Printable Tracker' && checkbox.value != 'Book Online Session for Company' && checkbox.value != 'Book Online Session for Individuals');
        });

        // Enable/disable the area input field based on the checked services
        areaInput.disabled = !isChecked;
    });
});
