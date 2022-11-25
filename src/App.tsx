import type { Component } from 'solid-js';
import styles from './App.module.css';
import { hashIntegration, Route, Router, Routes } from 'solid-app-router';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';
import RequestIndex from "./pages/Request";
import RequestById from "./pages/Request/[id]";

const App: Component = () => {
  return (
    <Router source={hashIntegration()}>
      <div class="flex flex-col h-full min-h-screen">
        <Navbar></Navbar>
        <main class="px-8 py-4 flex-1 flex flex-col h-full">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />}>
              <Route path="/" element={<RequestIndex />} />
              <Route path="/:id" element={<RequestById />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
