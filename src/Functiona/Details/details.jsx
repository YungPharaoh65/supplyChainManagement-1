import React, { useState } from "react";
import "./details.css"; // Assuming you save the CSS as Login.css
import { Link } from "react-router-dom";

const Details = () => {
  const [companyName, setCompanyName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [orderID, setOrderID] = useState("");
  const [inventoryLevel, setInventoryLevel] = useState("");
  const [sentTime, setSentTime] = useState("");
  const [receivedTime, setReceivedTime] = useState("");
  const [shipmentPrice, setShipmentPrice] = useState("");
  const [deliveryShipments, setDeliveryShipments] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login and additional data logic here
    console.log("Company Name:", companyName);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Supplier Name:", supplierName);
    console.log("Order ID:", orderID);
    console.log("Inventory Level:", inventoryLevel);
    console.log("Sent Time:", sentTime);
    console.log("Received Time:", receivedTime);
    console.log("Shipment Price:", shipmentPrice);
    console.log("Delivery Shipments:", deliveryShipments);
    console.log("PDF File:", pdfFile);
  };

  const handleAddShipment = () => {
    setDeliveryShipments([
      ...deliveryShipments,
      { supplierName, orderID, sentTime, receivedTime, shipmentPrice },
    ]);
    setSupplierName("");
    setOrderID("");
    setSentTime("");
    setReceivedTime("");
    setShipmentPrice("");
  };

  const handlePdfUpload = (event) => {
    setPdfFile(event.target.files[0]);
  };

  return (
    <div className="movecon">
      <div className="login-container">
        <Link to="/"><button className="backbtn">x</button></Link>

        <h2 className="login-h2">Access Supply Chain Data to Dashboard</h2>

        <br />
        <br />
        <form onSubmit={handleLogin}>
          <div className="login-flex-row">
            {/* Row 1 */}
            <div className="login-input-group">
              <label className="login-label" htmlFor="companyName">
                Company Name:
              </label>
              <input
                className="login-input"
                type="text"
                id="companyName"
                placeholder="company supplying from/to"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="login-input-group">
              <label className="login-label" htmlFor="username">
                Username:
              </label>
              <input
                className="login-input"
                type="text"
                id="username"
                placeholder="name of Admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="login-input-group">
              <label className="login-label" htmlFor="password">
                Password:
              </label>
              <input
                className="login-input"
                type="password"
                id="password"
                placeholder="needed for tracking"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-flex-row">
            {/* Row 2 */}
            <div className="login-input-group">
              <label className="login-label" htmlFor="supplierName">
                Supplier Name:
              </label>
              <input
                className="login-input"
                type="text"
                id="supplierName"
                placeholder="name of supplier"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
              />
            </div>
            <div className="login-input-group">
              <label className="login-label" htmlFor="orderID">
                Order ID:
              </label>
              <input
                className="login-input"
                type="text"
                id="orderID"
                placeholder="place 5 digit code"
                value={orderID}
                onChange={(e) => setOrderID(e.target.value)}
              />
            </div>
            <div className="login-input-group">
              <label className="login-label" htmlFor="inventoryLevel">
                Inventory Level:
              </label>
              <select
                className="login-input"
                id="inventoryLevel"
                value={inventoryLevel}
                onChange={(e) => setInventoryLevel(e.target.value)}
              >
                <option value="">Select Inventory Level (type of packaging)</option>
                <option value="Level 1">Level 1 (Palletized Units)</option>
                <option value="Level 2">Level 2 (Industrial Crates)</option>
                <option value="Level 3">Level 3 (Corrugated Shipping Containers)</option>
                <option value="Level 4">Level 4 (Bulk Storage Drums)</option>
                <option value="Level 5">Level 5 (Flexible Intermediate Bulk Containers (FIBCs))</option>
              </select>
            </div>

            {/* Sent Time */}
            <div className="login-input-group">
              <label className="login-label" htmlFor="sentTime">
                Sent Time:
              </label>
              <input
                className="login-input"
                type="datetime-local"
                id="sentTime"
                value={sentTime}
                onChange={(e) => setSentTime(e.target.value)}
              />
            </div>

            {/* Received Time */}
            <div className="login-input-group">
              <label className="login-label" htmlFor="receivedTime">
                Received Time:
              </label>
              <input
                className="login-input"
                type="datetime-local"
                id="receivedTime"
                value={receivedTime}
                onChange={(e) => setReceivedTime(e.target.value)}
              />
            </div>

            <div className="login-input-group">
              <label className="login-label" htmlFor="shipmentPrice">
                Set Shipment Price:
              </label>
              <input
                className="login-input"
                type="text"
                id="shipmentPrice"
                placeholder="e.g., USD 100.00"
                value={shipmentPrice}
                onChange={(e) => setShipmentPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Delivery Shipments Table */}
          {deliveryShipments.length > 0 && (
            <table className="login-table">
              <thead>
                <tr>
                  <th>Supplier Name</th>
                  <th>Order ID</th>
                  <th>Sent Time</th>
                  <th>Received Time</th>
                  <th>Shipment Price</th>
                </tr>
              </thead>
              <tbody>
                {deliveryShipments.map((shipment, index) => (
                  <tr key={index}>
                    <td>{shipment.supplierName}</td>
                    <td>{shipment.orderID}</td>
                    <td>{shipment.sentTime}</td>
                    <td>{shipment.receivedTime}</td>
                    <td>{shipment.shipmentPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* PDF Upload */}
          <div className="login-aligntext">
            <label className="login-label" htmlFor="pdfFile">
              Orderlist Database (add your details in PDF format):
            </label>
            <input
              className="login-input"
              type="file"
              id="pdfFile"
              accept=".pdf"
              onChange={handlePdfUpload}
            />
          </div>

          {/* Submit Button */}
          <Link to="/dashboard"><button className="login-button" type="submit">
            Create Account
          </button></Link>
        </form>
      </div>
    </div>
  );
};

export default Details;
