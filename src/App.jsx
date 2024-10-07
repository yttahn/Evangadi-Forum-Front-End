import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login';

const App = () => {
    return (
        <Router>
            <div>
                <Header showLinks={false} /> {/* Main page header without links */}
                <div style={{ paddingTop: '60px' }}>
                    <Routes>
                        <Route path="/" element={<Body />} />
                        <Route path="/login" element={
                            <>
                                <Header showLinks={true} /> {/* Login page header with links */}
                                <Login />
                            </>
                        } />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
