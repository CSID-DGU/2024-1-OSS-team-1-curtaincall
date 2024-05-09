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

import {
    useMediaQuery,
    useTheme,
} from "@mui/material";
import NavigationBar from "./component/JS/NavigationBar";
import SideDrawer from "./component/JS/SideDrawer";



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
                    <Route path="*" element={<div>404</div>} />
                </Routes>
            </Router>
        </div>
    );
}
/*
function App() {
    return (
        <div className="App">
            <Router>
                <Navbar bg="light" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                alt=""
                                src="/transparentCc.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            CurtainCall
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">초기 화면</Nav.Link>
                            <Nav.Link href="/host">호스트 방</Nav.Link>
                            <Nav.Link href="/guest">게스트 방</Nav.Link>
                            <Nav.Link href="/upload">업로드</Nav.Link>
                            <Nav.Link href="/sort">정렬</Nav.Link>
                            <Nav.Link href="/quater">4분할</Nav.Link>
                            <Nav.Link href="/choose">선택</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>

                <Routes>
                    <Route path="/" element={<Start />} />
                    <Route path="/host" element={<Host />} />
                    <Route path="/guest" element={<Guest />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/sort" element={<Sort />} />
                    <Route path="/quater" element={<Quater />} />
                    <Route path="/choose" element={<Choose />} />
                    <Route path="*" element={<div>404</div>} />
                </Routes>
            </Router>
        </div>
    );
}
*/

export default App;