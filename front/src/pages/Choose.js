import React, { useState } from 'react';
import { Container, ButtonGroup, Navbar, Carousel, Dropdown, DropdownButton, } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function Choose(){
    const location = useLocation();
    const selectedImages = location.state?.selectedImages; // 상태 안전하게 접근
    const [currentView, setCurrentView] = useState('Your Picks'); //드랍다운 기능 구현할 때 쓸 useState

    // 상태 확인 및 예외 처리
    if (!selectedImages) {
        return <div>Loading or no images selected...</div>;
    }

    return (
        <Container>
          <Navbar className="bg-body-tertiary" >
              <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor: '#ff4d4d'}}>
                  <Navbar.Brand style={{color: 'white' }}>{currentView}</Navbar.Brand>
              </Container>
        </Navbar>
        
        <Carousel>
            {selectedImages.map((image, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={image.src}
                        alt={`Your pick ${index + 1}`}
                    />
                    <Carousel.Caption>
                        <h3>Round {index + 1} Winner</h3>
                        <p>This is your selection number {index + 1}.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>

        <br/>
        <>
          <DropdownButton
            as={ButtonGroup}
            key="danger"
            id="dropdown-variants-danger"
            variant="danger" // 드롭다운 버튼의 스타일을 지정
            title="Thier Picks?" // 드롭다운 버튼의 타이틀
          >
            <Dropdown.Item eventKey="1">호스트</Dropdown.Item>
            <Dropdown.Item eventKey="2">IP1</Dropdown.Item>
            <Dropdown.Item eventKey="4">IP3</Dropdown.Item>
          </DropdownButton>
         </>
        </Container>
    );
}



export default Choose;