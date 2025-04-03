import React from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import logo from '../assets/DarkInnerJourneyLogo.svg';

const Footer: React.FC = () => {
    return (
        <Box as="footer" p={4} bg="gray.100" textAlign="center">
            <Image src={logo} alt="Inner Journey Logo" height="30px" mx="auto" />
            <Text mt={2}>© 2025 Inner Journey. All rights reserved.</Text>
        </Box>
    );
};

export default Footer;