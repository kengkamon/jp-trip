// Weather API Configuration
// Replace 'YOUR_API_KEY_HERE' with your actual OpenWeatherMap API key

const WEATHER_CONFIG = {
    // Get your free API key from: https://openweathermap.org/api
    API_KEY: '885ff46bedf0fcf5f3c618ee24b8f848',
    
    // API endpoints
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    
    // Settings
    UNITS: 'metric', // metric for Celsius, imperial for Fahrenheit
    LANGUAGE: 'en',  // Language for weather descriptions
    
    // Cache settings
    CACHE_DURATION: 10 * 60 * 1000 // 10 minutes
};

// Instructions:
// 1. Go to https://openweathermap.org/api
// 2. Sign up for a free account
// 3. Get your API key from the dashboard
// 4. Replace 'YOUR_API_KEY_HERE' above with your actual key
// 5. Include this file in your HTML before japan-script.js

console.log('🌤️ Weather config loaded successfully!');
console.log('🔑 API Key configured:', WEATHER_CONFIG.API_KEY !== 'YOUR_API_KEY_HERE' ? 'YES ✅' : 'NO ❌');
console.log('🌐 Base URL:', WEATHER_CONFIG.BASE_URL);