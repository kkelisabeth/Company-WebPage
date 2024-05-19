document.addEventListener('DOMContentLoaded', function() {
    // Simulate user login status for demonstration purposes
    if (!localStorage.getItem('loggedIn')) {
        localStorage.setItem('loggedIn', 'false');
    }
});
