import React from 'react';
import { Container, Grid, Card, CardMedia } from '@mui/material';

const RoundContainer = ({ round, roundIndex, onImageSelect }) => {
    const handleSelectImage = (image) => {
        onImageSelect(image, roundIndex);
    };

    return (
        <Container>
            <Grid container spacing={2}>
                {round.map((image, index) => (
                    <Grid item xs={6} key={index}>
                        <Card onClick={() => handleSelectImage(image)}>
                            <CardMedia
                                component="img"
                                alt={`Option ${index}`}
                                image={image.src}
                                title={`Option ${index}`}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default RoundContainer;
