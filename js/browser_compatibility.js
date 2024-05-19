// browser_compatibility.js

// Detect browser
const userAgent = navigator.userAgent;
let browserName = "";

if (userAgent.includes("OPR/") || userAgent.includes("Opera")) {
    browserName = "Opera";
} else if (userAgent.includes("Chrome")) {
    browserName = "Chrome";
} else if (userAgent.includes("Firefox")) {
    browserName = "Firefox";
} else {
    browserName = "other browser";
}

// Display browser compatibility message
const compatibilityMessage = `Your browser (${browserName}) is supported. Enjoy browsing!`;

// You can display the message in an alert or any other way you prefer
alert(compatibilityMessage);
