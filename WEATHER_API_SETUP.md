# Real Weather API Setup Guide

## 🌤️ Your Japan Travel Website Now Uses Real Weather Data!

I've implemented real weather API integration using OpenWeatherMap. Here's how to set it up:

## 📋 Setup Steps

### Step 1: Get Your Free API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. After registration, go to your [API Keys page](https://home.openweathermap.org/api_keys)
4. Copy your API key

### Step 2: Configure Your API Key
1. Open `weather-config.js` in your project
2. Replace `'YOUR_API_KEY_HERE'` with your actual API key:
   ```javascript
   API_KEY: 'your_actual_api_key_here',
   ```

### Step 3: Test Your Setup
1. Open your website in a browser
2. Open browser console (F12 → Console)
3. Look for messages like:
   - `"Fetching real weather data for Tokyo..."`
   - `"Real weather data received for Tokyo:"`
4. Weather should load with real current conditions

## 🔧 What's Been Implemented

### Real API Integration
- ✅ **Current Weather**: Real-time conditions for Tokyo, Kamakura, and Kawaguchiko
- ✅ **Hourly Forecasts**: Real forecasts for activity time ranges
- ✅ **Smart Fallback**: If API fails, uses original simulated data
- ✅ **Console Logging**: See API calls and responses in browser console

### API Endpoints Used
- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`

### Data Includes
- Temperature (°C)
- Weather conditions (clear, cloudy, rain, etc.)
- Humidity (%)
- Wind speed (km/h)
- Weather icons
- Real-time updates

## 🚀 API Limits (Free Tier)

- **1,000 API calls per day**
- **Current weather + 5-day forecast**
- **60 calls per minute**
- Perfect for personal/demo websites

## 🛠️ Troubleshooting

### Not Working? Check Console
Open browser console (F12) and look for:

#### ✅ Success Messages:
```
Fetching real weather data for Tokyo...
Real weather data received for Tokyo: {weather data}
```

#### ❌ Error Messages:
```
Weather API key not configured, using fallback data
Weather API error: 401 Unauthorized
```

### Common Issues:

1. **"API key not configured"**
   - Solution: Add your API key to `weather-config.js`

2. **"401 Unauthorized"**
   - Solution: Check your API key is correct and active

3. **"429 Too Many Requests"**
   - Solution: You've exceeded the free tier limit (1,000/day)

4. **Still showing simulated data**
   - The fallback system is working
   - Check console for error messages

## 📊 How It Works

1. **On page load**: Fetches real weather for each activity location
2. **Data display**: Shows current conditions and hourly forecasts
3. **Caching**: Stores data for 10 minutes to reduce API calls
4. **Fallback**: If API fails, uses original simulated weather

## 🔒 Security Note

- Your API key is visible in client-side code
- For production sites, consider a backend proxy
- For demo/portfolio sites, client-side usage is fine

## 🎯 Testing Your Setup

1. **Without API key**: Should see "Fallback Data (Simulated)" in console
2. **With API key**: Should see "OpenWeatherMap API (Real Data)" in console
3. **Weather updates**: Real weather should match current Japan conditions

## 📱 Deployment

When you push to GitHub Pages:
1. Make sure `weather-config.js` includes your API key
2. Commit both files:
   ```bash
   git add weather-config.js japan-script.js index.html
   git commit -m "Add real weather API integration"
   git push
   ```

Your website visitors will now see real weather conditions for Tokyo, Kamakura, and Mt. Fuji area! 🇯🇵🌤️

---

**Need help?** Check the browser console for detailed error messages and API response data.