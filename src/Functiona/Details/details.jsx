import React, { useState } from 'react';
import './details.css'; // Assuming the CSS is saved as details.css
import { Link } from 'react-router-dom';

const Details = () => {
    const [companyName, setCompanyName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [orderID, setOrderID] = useState('');
    const [inventoryLevel, setInventoryLevel] = useState('');
    const [transitTime, setTransitTime] = useState('');
    const [shipmentPrice, setShipmentPrice] = useState('');
    const [deliveryShipments, setDeliveryShipments] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);

    const handleLogin = (event) => {
        event.preventDefault();
        // Handle login and additional data logic here
        console.log('Company Name:', companyName);
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Supplier Name:', supplierName);
        console.log('Order ID:', orderID);
        console.log('Inventory Level:', inventoryLevel);
        console.log('Transit Time:', transitTime);
        console.log('Shipment Price:', shipmentPrice);
        console.log('Delivery Shipments:', deliveryShipments);
        console.log('PDF File:', pdfFile);
    };

    const handleAddShipment = () => {
        setDeliveryShipments([...deliveryShipments, { supplierName, orderID, transitTime, shipmentPrice }]);
        setSupplierName('');
        setOrderID('');
        setTransitTime('');
        setShipmentPrice('');
    };

    const handlePdfUpload = (event) => {
        setPdfFile(event.target.files[0]);
    };

    return (
        <div className="login-container">
            <h2 className="login-h2">Login to Access Supply Chain Data</h2>
            <br /><br />
            <form onSubmit={handleLogin}>
                <div className="login-flex-row">
                    {/* Row 1 */}
                    <div className="login-input-group">
                        <label className="login-label" htmlFor="companyName">Company Name:</label>
                        <input
                            className="login-input"
                            type="text"
                            id="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="login-input-group">
                        <label className="login-label" htmlFor="username">Username:</label>
                        <input
                            className="login-input"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="login-input-group">
                        <label className="login-label" htmlFor="password">Password:</label>
                        <input
                            className="login-input"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                
                <div className="login-flex-row">
                    {/* Row 2 */}
                    <div className="login-input-group">
                        <label className="login-label" htmlFor="supplierName">Supplier Name:</label>
                        <input
                            className="login-input"
                            type="text"
                            id="supplierName"
                            value={supplierName}
                            onChange={(e) => setSupplierName(e.target.value)}
                        />
                    </div>
                    <div className="login-input-group">
                        <label className="login-label" htmlFor="orderID">Order ID:</label>
                        <input
                            className="login-input"
                            type="text"
                            id="orderID"
                            value={orderID}
                            onChange={(e) => setOrderID(e.target.value)}
                        />
                    </div>
                    <div className="login-input-group">
                        <label className="login-label" htmlFor="inventoryLevel">Inventory Level:</label>
                        <input
                            className="login-input"
                            type="text"
                            id="inventoryLevel"
                            value={inventoryLevel}
                            onChange={(e) => setInventoryLevel(e.target.value)}
                        />
                    </div>
                    <div className="login-input-group">
                        <label className="login-label" htmlFor="transitTime">Transit Time:</label>
                        <input
                            className="login-input"
                            type="text"
                            id="transitTime"
                            value={transitTime}
                            onChange={(e) => setTransitTime(e.target.value)}
                        />
                    </div>
                    <div className="login-input-group">
                        <label className="login-label" htmlFor="shipmentPrice">Shipment Price:</label>
                        <input
                            className="login-input"
                            type="text"
                            id="shipmentPrice"
                            value={shipmentPrice}
                            onChange={(e) => setShipmentPrice(e.target.value)}
                        />
                    </div>
                </div>

                {/* Add Delivery Shipments */}
                <button type="button" className="login-button" onClick={handleAddShipment}>
                    Add Shipment
                </button>

                {/* Delivery Shipments Table */}
                {deliveryShipments.length > 0 && (
                    <table className="login-table">
                        <thead>
                            <tr>
                                <th>Supplier Name</th>
                                <th>Order ID</th>
                                <th>Transit Time</th>
                                <th>Shipment Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveryShipments.map((shipment, index) => (
                                <tr key={index}>
                                    <td>{shipment.supplierName}</td>
                                    <td>{shipment.orderID}</td>
                                    <td>{shipment.transitTime}</td>
                                    <td>{shipment.shipmentPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* PDF Upload */}
                <div className="login-aligntext">
                    <label className="login-label" htmlFor="pdfFile">Orderlist Database (PDF format):</label>
                    <input
                        className="login-input"
                        type="file"
                        id="pdfFile"
                        accept=".pdf"
                        onChange={handlePdfUpload}
                    />
                </div>

                {/* Submit Button */}
               <Link to='/dashboard'> <button className="login-button" type="submit">Create Account</button></Link>
            </form>
        </div>
    );
};

export default Details;
