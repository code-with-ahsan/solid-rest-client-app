import type { Component } from 'solid-js';
import styles from './App.module.css';
import { hashIntegration, Route, Router, Routes } from 'solid-app-router';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';

const App: Component = () => {
  return (
    <Router source={hashIntegration()}>
      <div class="flex flex-col h-full min-h-screen">
        <Navbar></Navbar>
        <main class="px-8 py-4 flex-1 flex flex-col h-full">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />}>
              {/* <Route path="/" element={<RestClientIndex />} />
              <Route
                path="/:id"
                element={<RestClient />}
                data={fetchSelectedRequest}
              /> */}
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
