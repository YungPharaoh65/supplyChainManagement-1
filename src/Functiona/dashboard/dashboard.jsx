import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';  

const Dashboard = () => {
  const location = useLocation();
  const {
    companyName,
    orderID,
    username,
    supplierName,
    shipmentPrice,
    inventoryLevel,
    shipmentWeight,
    shipmentQuantity,
    pdfFile
  } = location.state || {};

  return (
    <div className="dashboard">
      <header className="dashboard-header">

       <Link to="/"><button className="backbtn">x</button></Link>
        <nav className="navbar">
          <div className="navbar-left">
            <span className="navbar-item1">{companyName}</span>
            <span className="navbar-item2">Order ID: {orderID}</span>
            <span className="navbar-item3">Username: {username}</span>
          </div>
          <div className="navbar-right">
            <span className="navbar-logo">S&G</span>
          </div>
        </nav>

        <div className="alignboxes">
          <div className="box">
          <FontAwesomeIcon icon={faCoffee} className="alignfirstrowicons"/>
          <div className="subtitle"> Ready for Shipments:</div> <div className="movepart1"><div className="text1">{shipmentWeight} kg </div>
          
            <div className="part2"> {shipmentQuantity} pcs</div>
             </div>
             
<hr />
<div className="alignbtntext">
 
  <p>ready for shipment</p>
             <div className="smalltext">↑ 5%</div>
             </div>

          </div>

          
          <div className="box">
          <div className="subtitle">Avg. Transit Time:</div> <div className="movepart3">{shipmentPrice} days/by air</div> 
         
          <div className="part4"> {shipmentQuantity} pcs</div>
          <hr />
          <div className="alignbtntext">
 
  <p>ready for shipment</p>
             <div className="smalltext">↓ 5%</div>
             </div>
          
          </div>
          
          <div className="box">
          <div className="subtitle">Inventory Level: </div>  <div className="movepart1">{inventoryLevel}</div> 
          <hr />
          <div className="alignbtntext">
 
  <p>(state iL type detail)</p>
             <div className="smalltext">↕</div>
             </div>
          </div>
        </div>

        <nav className="navbar2">
          <div className="navbar-left">
            <span>Order list database of <span className="navbar-item3">{supplierName}</span>: Total amount of production is <span className="navbar-item2">R{shipmentPrice}</span></span>
            <br />
            
          </div> 
          <div className="navbar-right">
            <button className="pdfbtn">download pdf file</button>
          </div>
        </nav>

        <div className="alignboxes2">
          <div className="checkbox">
              (Drag & Drop pdf here)
            {pdfFile && <a href={URL.createObjectURL(pdfFile)} target="_blank" rel="noopener noreferrer"> View PDF</a>}
          </div>
          <div className="box">Shipment progress  <FontAwesomeIcon icon="coffee" /></div>
        </div>
      </header>
    </div>
  );
};

export default Dashboard;
