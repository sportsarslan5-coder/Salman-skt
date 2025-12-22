import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Error: Could not find root element to mount the application.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // JS لوڈ ہونے کے بعد پری لوڈر کو ہٹا دیں
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
      }, 300);
    }
  } catch (err) {
    console.error("React Mounting Error:", err);
    rootElement.innerHTML = `
      <div style="background: #000; color: #fff; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; padding: 20px; text-align: center;">
        <h1 style="color: #FFD700;">Update in Progress</h1>
        <p style="color: #666;">We are currently fine-tuning Sialkot Shop. Please refresh in a moment.</p>
        <button onclick="window.location.reload()" style="background: #FFD700; color: #000; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 20px;">Refresh Page</button>
      </div>
    `;
  }
}