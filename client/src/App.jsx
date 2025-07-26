import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Turfs from './pages/Turfs';
import TurfDetail from './pages/TurfDetail';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { Toaster } from 'react-hot-toast';

function TestUI() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">UI Test Components</h1>
      
      {/* Calendar */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Calendar</h2>
        <Calendar mode="single" selected={new Date()} />
      </div>

      {/* Slider */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Distance Slider</h2>
        <Slider defaultValue={[10]} max={20} step={5} />
      </div>

      {/* Switch */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Toggle Availability</h2>
        <Switch />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <Toaster position="top-right" reverseOrder={false} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/turfs" element={<Turfs />} />
            <Route path="/turfs/:id" element={<TurfDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/test-ui" element={<TestUI />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
