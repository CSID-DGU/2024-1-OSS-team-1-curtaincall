import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col ,Navbar} from 'react-bootstrap';
//import data from './data.js'; 
import localuri from './localuri.js';

function Quater() {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 사용
    const [currentRound, setCurrentRound] = useState(0);// 현재 라운드 상태 관리 (초기값 0)
    const [selectedImages, setSelectedImages] = useState([]); // 선택된 이미지들의 상태 관리 (초기값 빈 배열)
    
    const [data, setData] = useState([]);
    //let data = [];
    //let roundImagesize = data.slice(currentRound * 4, (currentRound + 1) * 4);

    useEffect(() => {
        // Django API 엔드포인트로부터 이미지 URL을 가져옵니다.
        fetch('http://' + localuri + '/CurtainCallApp/requestImage/')
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(_data => {
            //setSelectSize()
            setData(_data);
            //data = _data;
          })
          .catch(error => {
            console.error("Error fetching data: ", error);
          });
      }, []);
    
    
    let group_data = data.map((image) => (image.group_id));
    const totalRounds = Math.max(...group_data); // 전체 라운드 수 계산 (데이터 길이를 4로 나눈 후 올림)

    // const handleSelectImage = (image) => {
    //     setSelectedImages(prevSelectedImages => [...prevSelectedImages, image]);// 이전에 선택된 이미지 배열에 새 이미지 추가
    //     if (currentRound < totalRounds - 1) {
    //         setCurrentRound(currentRound + 1); // 현재 라운드 업데이트 (다음 라운드로)
    //     } else {
    //         navigate('/choose', { state: { selectedImages } }); // 마지막 라운드인 경우, 선택된 이미지들을 상태로 '/choose' 페이지로 이동
    //     }
    // };

    const handleSelectImage = (image) => {
        setSelectedImages(prevSelectedImages => {
            const newSelectedImages = [...prevSelectedImages, image];
            if (currentRound < totalRounds - 1) {
                setCurrentRound(currentRound + 1); // 다음 라운드로 이동
            } else {
                // 마지막 라운드이면, 이미지 배열 업데이트 후 navigate 호출
                navigate('/choose', { state: { selectedImages: newSelectedImages } });
            }
            return newSelectedImages;
        });
    };
    

    // 현재 라운드의 이미지들 계산
    //const roundImages = data.slice(currentRound * 4, (currentRound + 1) * 4);
    /*
    return (
        <div>
          {photos.map(photo => (
            <img src={photo.photo} alt="Photo" key={photo.id} />
          ))}
        </div>
      );
      */
    function grouped(data, num) {
        return data.reduce((groups, item) => {

          if (item.group_id == num) {
            groups.push(item);
          }
          // 현재 항목을 해당 keyword 배열에 푸시합니다.
          
          console.log(groups);
          
          return groups;
        }, []); // 초기값으로 빈 객체를 전달합니다.
    }
    
    return (
        <div>
            <Navbar className="bg-body-tertiary" >
                <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor: '#ff4d4d'}}>
                    <Navbar.Brand style={{color: 'white' }}>Round {currentRound + 1}/{totalRounds}</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid="md" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {grouped(data, currentRound + 1).map((image) => (
                    <Row>
                        <Col key={image.id} onClick={() => handleSelectImage(image)}>
                            <img src={image.src} alt={`Option ${image.id}`} style={{ width: '100%', height: 'auto' }} />
                        </Col>
                    </Row>
                ))}
            </Container>
        </div>
    );
    
}

export default Quater;