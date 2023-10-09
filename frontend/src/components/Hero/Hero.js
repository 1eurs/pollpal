import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { css } from '@emotion/react'; // Import Emotion

import heroImage from '../../images/hero-image.png'; // Import your hero image

const HeroContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse', // Reversed direction
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column', // Change to column layout on smaller screens
    },
}));

const ContentContainer1 = styled(Grid)(({ theme }) => ({
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(4), // Add margin to separate content on smaller screens
    },
}));

const ContentContainer2 = styled(Grid)(({ theme }) => ({
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        order: -1, // Change order to push it to the top on smaller screens
    },
}));

const HeroImage = styled('img')(({ theme }) => ({
    maxWidth: '100%', // Ensure the image does not exceed its container
}));

const HeadlineTypography = styled(Typography)(({ theme }) => ({
    fontSize: '2.5rem',
    marginBottom: theme.spacing(2),
}));

const DescriptionTypography = styled(Typography)(({ theme }) => ({
    fontSize: '1.25rem',
    marginBottom: theme.spacing(4),
}));

const CtaButton = styled('a')(({ theme }) => ({
    padding: theme.spacing(1, 4),
    fontSize: '1.25rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: '#0056b3',
    },
}));

const Hero = () => {
    return (
        <HeroContainer maxWidth="lg" sx={{ color: 'white' }}>

            <ContentContainer1 item xs={12} sm={6} >
                <HeroImage src={heroImage} alt="Hero" />
            </ContentContainer1>
            <ContentContainer2 item xs={12} sm={6}>
                <HeadlineTypography variant="h2">
                    Create and Share Polls
                </HeadlineTypography>
                <DescriptionTypography variant="h5">
                    Engage with your audience and gather opinions.
                </DescriptionTypography>
                <CtaButton href="#create-poll">
                    Create a Poll
                </CtaButton>
            </ContentContainer2>
        </HeroContainer>
    );
};

export default Hero;
