import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './global.css';

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element not found. Make sure your HTML file has an element with id 'root'."
  );
}

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
