import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Start from './pages/Start';
import Host from './pages/Host';
import Guest from './pages/Guest';
import Upload from './pages/Upload';
import Sort from './pages/Sort';
import Choose from './pages/Choose';
import Quater from "./pages/Quarter";
import Login from "./pages/Login";

import {
    useMediaQuery,
    useTheme,
} from "@mui/material";
import NavigationBar from "./components/NavComp/NavigationBar";
import SideDrawer from "./components/NavComp/SideDrawer";



function App() {
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div className="App">
            <Router>
                <NavigationBar isMobile={isMobile} handleDrawerToggle={handleDrawerToggle} />
                <SideDrawer open={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
                <Routes>
                    <Route path="/" element={<Start />} />
                    <Route path="/host" element={<Host />} />
                    <Route path="/guest" element={<Guest />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/sort" element={<Sort />} />
                    <Route path="/quater" element={<Quater />} />
                    <Route path="/choose" element={<Choose />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<div>404</div>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;