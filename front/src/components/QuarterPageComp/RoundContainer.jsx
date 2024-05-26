import React from 'react';
import { Container, Grid, Card, CardMedia } from '@mui/material';

const RoundContainer = ({ group, onImageSelect }) => {
    return (
        <div>
            <h3>Group {group.group_id}</h3>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {group.images.map((image, idx) => (
                    <img key={idx} src={image.src} alt={`Image ${idx}`}
                         style={{ width: '100px', margin: '5px' }}
                         onClick={() => onImageSelect(image, group.group_id)} />
                ))}
            </div>
        </div>
    );
};

export default RoundContainer;
