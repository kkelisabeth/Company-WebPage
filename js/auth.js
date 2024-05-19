document.addEventListener('DOMContentLoaded', function() {
    // Initialize Facebook SDK
    window.fbAsyncInit = function() {
        FB.init({
            appId      : 'YOUR_FACEBOOK_APP_ID',
            cookie     : true,
            xfbml      : true,
            version    : 'v19.0'
        });

        FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    document.getElementById('facebook-login').onclick = function() {
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome! Fetching your information....');
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                    localStorage.setItem('loggedIn', 'true');
                    alert('Logged in successfully with Facebook.');
                    window.location.href = 'index.html';
                });
            } else {
                alert('Facebook login failed.');
            }
        }, {scope: 'email'});
    };

    // Initialize Google SDK
    gapi.load('auth2', function() {
        auth2 = gapi.auth2.init({
            client_id: '634401013961-j5n060sodi49pdq2qt4hgfspp4gtvhi3.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
        });

        document.getElementById('google-login').addEventListener('click', function() {
            auth2.signIn().then(function(googleUser) {
                var profile = googleUser.getBasicProfile();
                console.log('ID: ' + profile.getId());
                console.log('Name: ' + profile.getName());
                console.log('Email: ' + profile.getEmail());
                localStorage.setItem('loggedIn', 'true');
                alert('Logged in successfully with Google.');
                window.location.href = 'index.html';
            }).catch(function(error) {
                console.error('Google login failed:', error);
                alert('Google login failed.');
            });
        });
    });

    // Handle login form submission
    document.getElementById('login-form').onsubmit = function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simulate login process
        if (email === 'user@example.com' && password === 'password') {
            localStorage.setItem('loggedIn', 'true');
            alert('Login successful.');
            window.location.href = 'index.html'; // Redirect to the main page
        } else {
            alert('Invalid email or password.');
        }
    };
});
