// src/components/Details.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./details.css";
import { Link } from "react-router-dom";

const Details = () => {
  const [companyName, setCompanyName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [orderID, setOrderID] = useState("");
  const [inventoryLevel, setInventoryLevel] = useState("");
  const [shipmentWeight, setShipmentWeight] = useState("");
  const [shipmentQuantity, setShipmentQuantity] = useState("");
  const [shipmentPrice, setShipmentPrice] = useState("");
  const [pdfFile, setPdfFile] = useState(null); // State to hold the PDF file
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/dashboard", {
      state: {
        companyName,
        orderID,
        username,
        supplierName,
        shipmentWeight,
        shipmentQuantity,
        shipmentPrice,
        inventoryLevel,
        pdfFile, // Pass the PDF file to the dashboard
      },
    });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    if (pdfFiles.length > 0) {
      setPdfFile(pdfFiles[0]); // Set the first PDF file
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    
    <div className="login-container">

<Link to="/"><button className="backbtn">x</button></Link>

      <h1>Access Database Field</h1>
      <form onSubmit={handleLogin}>
        <div className="login-flex-row">
          <div className="login-input-group">
            <label className="login-label" htmlFor="companyName">Company Name:</label>
            <input className="login-input" type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
          </div>
          <div className="login-input-group">
            <label className="login-label" htmlFor="username">Username:</label>
            <input className="login-input" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="login-input-group">
            <label className="login-label" htmlFor="password">Password:</label>
            <input className="login-input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>

        <div className="login-flex-row">
          <div className="login-input-group">
            <label className="login-label" htmlFor="supplierName">Supplier Name:</label>
            <input className="login-input" type="text" id="supplierName" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
          </div>
          <div className="login-input-group">
            <label className="login-label" htmlFor="orderID">Order ID:</label>
            <input className="login-input" type="text" id="orderID" value={orderID} onChange={(e) => setOrderID(e.target.value)} />
          </div>
          <div className="login-input-group">
            <label className="login-label" htmlFor="inventoryLevel">Inventory Level:</label>
            <select className="login-input" id="inventoryLevel" value={inventoryLevel} onChange={(e) => setInventoryLevel(e.target.value)}>
              <option value="">Select Inventory Level</option>
              <option value="Level 1">Level 1 (Palletized Units)</option>
              <option value="Level 2">Level 2 (Industrial Crates)</option>
              <option value="Level 3">Level 3 (Corrugated Shipping Containers)</option>
              <option value="Level 4">Level 4 (Bulk Storage Drums)</option>
              <option value="Level 5">Level 5 (FIBCs)</option>
            </select>
          </div>
        </div>

        <div className="login-flex-row">
          <div className="login-input-group">
            <label className="login-label" htmlFor="shipmentWeight">Shipment Weight (kg):</label>
            <input className="login-input" type="text" id="shipmentWeight" value={shipmentWeight} onChange={(e) => setShipmentWeight(e.target.value)} />
          </div>
          <div className="login-input-group">
            <label className="login-label" htmlFor="shipmentQuantity">Quantity (pcs):</label>
            <input className="login-input" type="text" id="shipmentQuantity" value={shipmentQuantity} onChange={(e) => setShipmentQuantity(e.target.value)} />
          </div>
          <div className="login-input-group">
            <label className="login-label" htmlFor="shipmentPrice">Shipment Price:</label>
            <input className="login-input" type="text" id="shipmentPrice" value={shipmentPrice} onChange={(e) => setShipmentPrice(e.target.value)} />
          </div>
        </div>

       <input type="file" accept="application/pdf" />

        <button className="login-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Details;
