import React from 'react';
import { UserProvider } from './context/UserContext'; 
import { CourseProvider } from './context/CourseContext';
import { EnrollmentProvider } from './context/EnrollmentContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/Layouts/ScrollToTop";
import Header from './Components/Layouts/Heder'; 
import Footer from './Components/Layouts/Footer'; 
import Home from './Components/Body/Hero';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact us';
import Courses from './Components/Courses/Courses';
import LoginPage from './Components/Login/Login';
import RegisterPage from './Components/Login/Register';
import PrivacyPolicy from "./Components/Security/Privacy Policy"; 
import TermofService from "./Components/Security/TermOfService";
import Help from "./Components/Security/Help";
import Dashboard from "./Components/Dashboard/Dashboard";
import CourseDetail from './Components/CourseDetail/CourseDetail';
import SpecialOffersDetail from './Components/Courses/SpecialOfferDetail';

function App() {
  return (
    <UserProvider>
      <CourseProvider>
        <EnrollmentProvider>
    <Router>
      <ScrollToTop />
      <Header />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/term-of-service" element={<TermofService />} />
        <Route path="/help" element={<Help />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/offer/:offerId" element={<SpecialOffersDetail />} />
      </Routes>
      <Footer />
    </Router>
    </EnrollmentProvider>
    </CourseProvider>
    </UserProvider>
  );
}

export default App;
