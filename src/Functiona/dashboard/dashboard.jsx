import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCoffee, faHome, faWeight } from '@fortawesome/free-solid-svg-icons';  
import jsPDF from 'jspdf';
import { PDFDocument } from 'pdf-lib';

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
    shipmentQuantity
  } = location.state || {};
  
  const [randomNumber1, setRandomNumber1] = useState(0);
  const [randomNumber2, setRandomNumber2] = useState(0);
  const [randomNumber3, setRandomNumber3] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    const generateRandomNumber = () => Math.floor(Math.random() * 46) + 10;

    const updateNumbers = () => {
      setRandomNumber1(generateRandomNumber());
      setRandomNumber2(generateRandomNumber());
      setRandomNumber3(generateRandomNumber());
    };

    const intervalId = setInterval(updateNumbers, 6000);
    updateNumbers();
    return () => clearInterval(intervalId);
  }, []);

  const downloadPdf = () => {
    const pdf = new jsPDF('p', 'pt', 'a4');
    
    pdf.setFontSize(18);
    pdf.text('Dashboard Details', 20, 30);
    
    pdf.setFontSize(12);
    pdf.text(`Company Name: ${companyName}`, 20, 60);
    pdf.text(`Order ID: ${orderID}`, 20, 80);
    pdf.text(`Username: ${username}`, 20, 100);
    pdf.text(`Supplier Name: ${supplierName}`, 20, 120);
    pdf.text(`Shipment Price: R${shipmentPrice}`, 20, 140);
    pdf.text(`Inventory Level: ${inventoryLevel}`, 20, 160);
    pdf.text(`Shipment Weight: ${shipmentWeight} kg`, 20, 180);
    pdf.text(`Shipment Quantity: ${shipmentQuantity} pcs`, 20, 200);
    pdf.text(`Ready for Shipments: ↑ ${randomNumber1}%`, 20, 220);
    pdf.text(`Avg. Transit Time: ↓ ${randomNumber2}%`, 20, 240);
    pdf.text(`Inventory Level Change: ↕ ${randomNumber3}%`, 20, 260);
    
    pdf.save('dashboard_details.pdf');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const downloadMergedPdf = async () => {
    if (!pdfFile) {
      alert('No PDF file to merge.');
      return;
    }

    // Create a new PDF document with jsPDF
    const newPdf = new jsPDF('p', 'pt', 'a4');
    
    newPdf.setFontSize(18);
    newPdf.text('Dashboard Details', 20, 30);
    
    newPdf.setFontSize(12);
    newPdf.text(`Company Name: ${companyName}`, 20, 60);
    newPdf.text(`Order ID: ${orderID}`, 20, 80);
    newPdf.text(`Username: ${username}`, 20, 100);
    newPdf.text(`Supplier Name: ${supplierName}`, 20, 120);
    newPdf.text(`Shipment Price: R${shipmentPrice}`, 20, 140);
    newPdf.text(`Inventory Level: ${inventoryLevel}`, 20, 160);
    newPdf.text(`Shipment Weight: ${shipmentWeight} kg`, 20, 180);
    newPdf.text(`Shipment Quantity: ${shipmentQuantity} pcs`, 20, 200);
    newPdf.text(`Ready for Shipments: ↑ ${randomNumber1}%`, 20, 220);
    newPdf.text(`Avg. Transit Time: ↓ ${randomNumber2}%`, 20, 240);
    newPdf.text(`Inventory Level Change: ↕ ${randomNumber3}%`, 20, 260);

    // Load the existing PDF with pdf-lib
    const existingPdfBytes = await pdfFile.arrayBuffer();
    const existingPdfDoc = await PDFDocument.load(existingPdfBytes);

    // Create a new PDF document with pdf-lib
    const mergedPdf = await PDFDocument.create();
    
    // Copy pages from the existing PDF
    const [firstPage] = await mergedPdf.copyPages(existingPdfDoc, existingPdfDoc.getPageIndices());
    firstPage.forEach((page) => mergedPdf.addPage(page));
    
    // Add the content from the new PDF
    const newPdfBytes = await newPdf.output('arraybuffer');
    const newPdfDoc = await PDFDocument.load(newPdfBytes);
    const [newPdfPage] = await mergedPdf.copyPages(newPdfDoc, [0]);
    mergedPdf.addPage(newPdfPage);
    
    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'dashboard_and_pdf.pdf';
    link.click();

    URL.revokeObjectURL(url);
  };

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
            <FontAwesomeIcon icon={faHome} className="alignfirstrowicons"/>
            <div className="subtitle">Ready for Shipments:</div>
            <div className="movepart1">
              <div className="text1">{shipmentWeight} kg</div>
              <div className="part2">{shipmentQuantity} pcs</div>
            </div>
            <hr />
            <div className="alignbtntext">
              <p>Ready for shipment</p>
              <div className="smalltext" style={{ color: randomNumber1 <= 25 ? 'red' : 'green' }}>↑ {randomNumber1}%</div>
            </div>
          </div>

          <div className="box">
            <FontAwesomeIcon icon={faClock} className="alignfirstrowicons"/>
            <div className="subtitle">Avg. Transit Time:</div>
            <div className="movepart3">{shipmentPrice} days/by air</div> 
            <div className="part4">{shipmentQuantity} pcs</div>
            <hr />
            <div className="alignbtntext">
              <p>Ready for shipment</p>
              <div className="smalltext" style={{ color: randomNumber2 <= 25 ? 'red' : 'green' }}>↓ {randomNumber2}%</div>
            </div>
          </div>
          
          <div className="box">
            <FontAwesomeIcon icon={faWeight} className="alignfirstrowicons"/>
            <div className="subtitle">Inventory Level:</div>
            <div className="movepart1">{inventoryLevel}</div>
            <hr />
            <div className="alignbtntext">
              <p>(state iL type detail)</p>
              <div className="smalltext" style={{ color: randomNumber3 <= 25 ? 'red' : 'green' }}>↕ {randomNumber3}%</div>
            </div>
          </div>
        </div>

        <nav className="navbar2">
          <div className="navbar-left">
            <span>Order list database of <span className="navbar-item3">{supplierName}</span>: Total amount of production is <span className="navbar-item2">R{shipmentPrice}</span></span>
            <br />
          </div> 
          <div className="navbar-right">
            <button className="pdfbtn" onClick={downloadPdf}>Download PDF</button>
            <button className="pdfbtn" onClick={downloadMergedPdf} disabled={!pdfFile}>Download Merged PDF</button>
          </div>
        </nav> 

        <div className="alignboxes2">
         
          <div className="checkbox"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
             <br /><br /><br /><br /> 
            (Drag & Drop pdf here)
            {pdfFile && <a href={URL.createObjectURL(pdfFile)} target="_blank" rel="noopener noreferrer">View PDF</a>}
          </div>
          <div className="box">Shipment progress <FontAwesomeIcon icon={faCoffee} /></div>
        </div>
      </header>
    </div>
  );
};

export default Dashboard;
