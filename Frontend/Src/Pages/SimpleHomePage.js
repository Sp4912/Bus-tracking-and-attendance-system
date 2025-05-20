import React from 'react';
import './SimpleHomePage.css';
import busImage from '../resources/bus.jpeg';

import { FaBusAlt, FaUserShield, FaMapMarkedAlt, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SimpleHomePage() {
  return (
    <div className="homepage">
      <header>
        <h1>School Bus Attendance & Tracking System</h1>
        <nav>
          <a href="#about">About</a>
          <a href="#offers">What We Offer</a>
          <a href="#contact">Contact</a>
          <Link to="/LandingPage" className="login-link">Login</Link>
        </nav>
      </header>

      <section className="video-section">
        <div className="video-overlay">Safe & Smart School Commute</div>
        <video className="school-bus-video" autoPlay loop muted>
          <source src="/bus.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section id="about" className="about-section-custom">
  <div className="about-container">
    <div className="about-text">
      <h2>What is a Bus Attendance System?</h2>
      <p>
        Our system gives schools and parents complete peace of mind by automating student check-in/check-out on the bus and providing real-time location visibility. As each child boards or leaves, an attendant taps their student ID—instantly updating attendance records in the cloud.
</p><p>
Schools can define routes, assign drivers and attendants, and monitor every vehicle’s GPS position on a live map. Parents receive push/SMS notifications when their child is picked up in the morning and dropped off in the afternoon—no more guessing when the bus will arrive.
</p>
<p>Behind the scenes, administrators get detailed reports on ridership, on-time performance, and route efficiency. This data helps optimize schedules, reduce idle time, and ensure every student’s safe, timely journey to and from school.
      </p>
     
    </div>
    <div className="about-image">
    <img src={busImage} alt="Kids boarding school bus" />

    </div>
  </div>
</section>


      <section id="offers">
        <h1>What We Offer</h1>
        <div className="offers">
          <div className="card">
            <FaBusAlt size={40} color="#3b82f6" />
            <h4>Live Bus Tracking</h4>
            <p>Track the location of every bus and route in real-time with GPS integration.</p>
          </div>
          <div className="card">
            <FaUserShield size={40} color="#f97316" />
            <h4>Attendance Marking</h4>
            <p>Attenders mark student attendance when they board and exit the bus.</p>
          </div>
          <div className="card">
            <FaBell size={40} color="#10b981" />
            <h4>Parent Notifications</h4>
            <p>Parents get notified when their child is picked up or dropped off safely.</p>
          </div>
          <div className="card">
            <FaMapMarkedAlt size={40} color="#6366f1" />
            <h4>Route Management</h4>
            <p>Admins can assign drivers, attenders, and students to specific bus routes.</p>
          </div>
        </div>
      </section>

      <section id="contact">
        <h1><strong>Contact Us</strong></h1>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="4" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      <footer>
        <p>&copy; 2025 School Bus Attendance & Tracking System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default SimpleHomePage;

// import React from "react";
// import { Link } from "react-router-dom";
// import { FaBus, FaMapMarkedAlt, FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";

// import './SimpleHomePage.css';

// const SimpleHomePage = () => {
//   return (
//     <div className="homepage-container">
//       {/* Header Section */}
//       <header className="header">
//         <nav className="navbar">
//           <div className="logo">
//             <h1>School Bus Attendance</h1>
//           </div>
//           <ul className="nav-links">
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//           </ul>
//         </nav>
//       </header>

//       {/* Video Section */}
//       <div className="video-container">
//         <video autoPlay loop muted>
//           <source src="/bus.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <div className="video-overlay">
//           <h2>Safe, Reliable & Efficient School Bus System</h2>
//         </div>
//       </div>

//       {/* About Us Section */}
//       <section className="about-us">
//         <div className="about-content">
//           <h2>About Us</h2>
//           <p>
//             We provide a safe and efficient school bus attendance system, tracking
//             each student’s bus journey in real-time. Ensuring safety is our priority.
//           </p>
//           <div className="about-images">
//             <img src="https://via.placeholder.com/400" alt="Bus Image" />
//             <img src="https://via.placeholder.com/400" alt="Bus Image" />
//           </div>
//         </div>
//       </section>

//       {/* What We Offer Section */}
//       <section className="what-we-offer">
//         <h2>What We Offer</h2>
//         <div className="services">
//           <div className="service">
//             <FaBus size={50} />
//             <p>Bus Tracking</p>
//           </div>
//           <div className="service">
//             <FaMapMarkedAlt size={50} />
//             <p>Live Location</p>
//           </div>
//           <div className="service">
//             <FaPhoneAlt size={50} />
//             <p>Customer Support</p>
//           </div>
//           <div className="service">
//             <FaRegEnvelope size={50} />
//             <p>Notifications</p>
//           </div>
//         </div>
//       </section>

//       {/* Contact Us Form */}
//       <section className="contact-us">
//         <h2>Contact Us</h2>
//         <form>
//           <input type="text" placeholder="Your Name" required />
//           <input type="email" placeholder="Your Email" required />
//           <textarea placeholder="Your Message" required></textarea>
//           <button type="submit">Send Message</button>
//         </form>
//       </section>

//       {/* Footer Section */}
//       <footer className="footer">
//         <p>&copy; 2025 School Bus Attendance System | All rights reserved</p>
//       </footer>
//     </div>
//   );
// };

// export default SimpleHomePage;
