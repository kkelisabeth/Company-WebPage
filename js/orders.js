document.addEventListener('DOMContentLoaded', function() {
    const orderReceipt = document.getElementById('order-receipt');
    const orders = JSON.parse(localStorage.getItem('orders'));

    if (orders && orders.length > 0) {
        const ordersList = orders.map(order => {
            const servicesList = order.services.map(service => {
                let price;
                switch (service) {
                    case 'Organization': price = (order.area * 25); break;
                    case 'Interior Design': price = (order.area * 50); break;
                    case 'Printable Tracker': price = 20; break;
                    case 'Book Online Session for Company': price = 150; break;
                    case 'Book Online Session for Individuals': price = 100; break;
                    default: price = 0;
                }
                return `<div class="receipt-item"><span>${service}</span><span>$${price}</span></div>`;
            }).join('');

            const totalPrice = order.services.reduce((total, service) => {
                switch (service) {
                    case 'Organization': return total + (order.area * 25);
                    case 'Interior Design': return total + (order.area * 50);
                    case 'Printable Tracker': return total + 20;
                    case 'Book Online Session for Company': return total + 150;
                    case 'Book Online Session for Individuals': return total + 100;
                    default: return total;
                }
            }, 0);

            return `
                <div class="receipt-container receipt">
                    <h2>Order Receipt</h2>
                    <div class="receipt-item"><span>Order Date:</span><span>${order.orderdate}</span></div> <!-- Display order date -->
                    ${servicesList}
                    <div class="receipt-item"><span>Deadline:</span><span>${order.deadline}</span></div> <!-- Display deadline -->
                    <div class="receipt-total"><span>Total</span><span>$${totalPrice}</span></div>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
        }).join('');

        orderReceipt.innerHTML = ordersList;

        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function() {
                const confirmation = confirm("Do you want to cancel your order?");
                if (confirmation) {
                    // If user confirms, delete the receipt and update localStorage
                    const receiptIndex = Array.from(orderReceipt.children).indexOf(button.closest(".receipt"));
                    orders.splice(receiptIndex, 1);
                    localStorage.setItem('orders', JSON.stringify(orders));
                    button.closest(".receipt").remove();
                }
            });
        });
    } else {
        orderReceipt.innerHTML = '<p>No orders found.</p>';
    }
});
