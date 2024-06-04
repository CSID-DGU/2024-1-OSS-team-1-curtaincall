import React from 'react';
import { Grid, Card, CardActionArea, CardMedia, useMediaQuery, useTheme } from '@mui/material';

const RoundContainer = ({ group, onImageSelect }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // 900px 이하

    return (
        <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
            <div style={{ width: '100vw', height: '70vh', margin: 0, padding: 0, overflow: 'hidden' }}>
                <Grid container spacing={0} style={{ height: '100%', margin: 0, width: '100%' }}>
                    {group.images.map((image, idx) => (
                        <Grid
                            item
                            xs={6} // 2x2 layout for mobile (<= 900px)
                            md={3} // 4x1 layout for desktop (> 900px)
                            style={{ height: isMobile ? '50%' : '100%', margin: 0, padding: 0 }} // 조건부 높이 설정
                            key={idx}
                        >
                            <Card style={{ height: '100%', margin: 0 }}>
                                {image.isDummy ? (
                                    <CardMedia
                                        component="img"
                                        alt={`Image ${idx}`}
                                        style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                                        image={image.src}
                                    />
                                ) : (
                                    <CardActionArea style={{ height: '100%' }} onClick={() => onImageSelect(image, group.group_id)}>
                                        <CardMedia
                                            component="img"
                                            alt={`Image ${idx}`}
                                            style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                                            image={image.src}
                                        />
                                    </CardActionArea>
                                )}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default RoundContainer;
