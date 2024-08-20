import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCoffee, faHome, faWeight } from '@fortawesome/free-solid-svg-icons';  
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    pdfFile: initialPdfFile
  } = location.state || {};
  
  const [pdfFile, setPdfFile] = useState(initialPdfFile || null);
  const [randomNumber1, setRandomNumber1] = useState(0);
  const [randomNumber2, setRandomNumber2] = useState(0);
  const [randomNumber3, setRandomNumber3] = useState(0);
  const dashboardRef = useRef();

  useEffect(() => {
    const generateRandomNumber = () => Math.floor(Math.random() * 46) + 10;

    const updateNumbers = () => {
      setRandomNumber1(generateRandomNumber());
      setRandomNumber2(generateRandomNumber());
      setRandomNumber3(generateRandomNumber());
    };

    // Update the numbers every 2 seconds
    const intervalId = setInterval(updateNumbers, 2000);

    // Initial update
    updateNumbers();

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const getTextColor = (number) => {
    return number <= 25 ? 'red' : 'green';
  }

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
    // Capture the dashboard as an image
    const canvas = await html2canvas(dashboardRef.current);
    const dashboardImage = canvas.toDataURL('image/png');
    
    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'pt', 'a4');
    
    // Add the dashboard image to the PDF
    const imgProps = pdf.getImageProperties(dashboardImage);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(dashboardImage, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // If there's a PDF file, add it to the new PDF
    if (pdfFile) {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfData = new Uint8Array(pdfBytes);
      const existingPdf = new jsPDF({ format: 'a4' });
      existingPdf.load(pdfData);

      const existingPages = existingPdf.getNumberOfPages();

      for (let i = 1; i <= existingPages; i++) {
        pdf.addPage();
        const page = pdf.internal.pages.length - 1;
        pdf.setPage(page);
        const pageContent = existingPdf.getPage(i);
        pdf.addImage(pageContent, 'PDF', 0, 0, pdfWidth, pdfHeight);
      }
    }

    // Download the merged PDF
    pdf.save('dashboard_and_pdf.pdf');
  };

  return (
    <div className="dashboard" ref={dashboardRef}>
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
              <p>ready for shipment</p>
              <div className="smalltext" style={{ color: getTextColor(randomNumber1) }}>↑ {randomNumber1}%</div>
            </div>
          </div>

          <div className="box">
            <FontAwesomeIcon icon={faClock} className="alignfirstrowicons"/>
            <div className="subtitle">Avg. Transit Time:</div>
            <div className="movepart3">{shipmentPrice} days/by air</div> 
            <div className="part4">{shipmentQuantity} pcs</div>
            <hr />
            <div className="alignbtntext">
              <p>ready for shipment</p>
              <div className="smalltext" style={{ color: getTextColor(randomNumber2) }}>↓ {randomNumber2}%</div>
            </div>
          </div>
          
          <div className="box">
            <FontAwesomeIcon icon={faWeight} className="alignfirstrowicons"/>
            <div className="subtitle">Inventory Level:</div>
            <div className="movepart1">{inventoryLevel}</div>
            <hr />
            <div className="alignbtntext">
              <p>(state iL type detail)</p>
              <div className="smalltext" style={{ color: getTextColor(randomNumber3) }}>↕ {randomNumber3}%</div>
            </div>
          </div>
        </div>

        <nav className="navbar2">
          <div className="navbar-left">
            <span>Order list database of <span className="navbar-item3">{supplierName}</span>: Total amount of production is <span className="navbar-item2">R{shipmentPrice}</span></span>
            <br />
          </div> 
          <div className="navbar-right">
            <button className="pdfbtn" onClick={downloadMergedPdf} disabled={!pdfFile}>
              Download PDF
            </button>
          </div>
        </nav>

        <div className="alignboxes2">
          <div className="checkbox"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
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
