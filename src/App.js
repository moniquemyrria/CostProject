import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import NewProject from "./components/pages/NewProject";
import Container from "./components/layouts/Container";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Projects from "./components/pages/Projects";
import EditProject from "./components/pages/EditProject";

function App() {
  return (
    <>
      <Router>
        <Navbar/>

        <Container customClass="min-height">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/newProject" element={<NewProject />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<EditProject />} />
          </Routes>
        </Container>
      </Router>

      <Footer />
    </>
  );
}

export default App;
