import React from 'react';
import { Grid, Card, CardActionArea, CardMedia } from '@mui/material';

const RoundContainer = ({ group, onImageSelect }) => {
    return (
        <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
            <Grid container spacing={0} style={{ height: '100%' }}>
                {group.images.map((image, idx) => (
                    <Grid item xs={6} style={{ height: '50%' }} key={idx}>
                        <Card style={{ height: '100%', margin: 0, display: 'flex' }}>
                            <CardActionArea style={{ height: '100%', width: '100%' }} onClick={() => onImageSelect(image, group.group_id)}>
                                <CardMedia
                                    component="img"
                                    alt={`Image ${idx}`}
                                    style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                                    image={image.src}
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default RoundContainer;