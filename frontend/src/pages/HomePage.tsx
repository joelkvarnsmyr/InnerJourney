import { useState, useEffect } from 'react';
import { Box, Heading, VStack, Text, Image, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ActivationForm from '../components/ActivationForm';
import { ActivationResult } from '../components/ActivationResult';
import { getActivation, ActivationResponse } from '../services/api';
import logo from '../assets/DarkInnerJourneyLogo.svg';
import symbolDark from '../assets/SymbolDark.svg';

const HomePage: React.FC = () => {
    const [result, setResult] = useState<ActivationResponse | null>(null);
    const [error, setError] = useState('');

    const handleSubmit = async (mood: number, goal: string) => {
        setError('');
        try {
            // Temporär profil (vi kan hämta den från backend i framtiden)
            const profile = {
                focusArea: 'unknown',
                personalityType: { traits: ['unknown'] },
                neuroTendencies: { adhdScore: 0 },
                wellbeingFlags: { suicideRisk: false },
            };
            const response = await getActivation(mood, goal, profile);
            setResult(response);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh" bg="white">
            {/* Header */}
            <Box as="header" p={4} bg="white" textAlign="center">
                <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
                    <Image src={logo} alt="Inner Journey Logo" height="40px" />
                    <Link to="/login">
                        <Image src={symbolDark} alt="Login Symbol" height="30px" />
                    </Link>
                </Flex>
            </Box>

            {/* Main Content */}
            <Box flex="1" display="flex" justifyContent="center" alignItems="center" p={5}>
                <VStack spacing={6} textAlign="center" maxW="400px" w="100%">
                    <Heading as="h1" size="xl">Välkommen till InnerJourney</Heading>
                    <Text color="gray.500">Låt oss skapa en aktivering för dig...</Text>
                    <ActivationForm onSubmit={handleSubmit} />
                    {error && <Text color="red.500">{error}</Text>}
                    {result && <ActivationResult activation={result} />}
                </VStack>
            </Box>

            {/* Footer */}
            <Box as="footer" p={4} bg="white" textAlign="center">
                <Image src={logo} alt="Inner Journey Logo" height="30px" mx="auto" />
                <Text mt={2} fontSize="sm" color="gray.500">
                    © 2025 Inner Journey. Alla rättigheter förbehållna.
                </Text>
            </Box>
        </Box>
    );
};

export default HomePage;