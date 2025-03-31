import { useState } from 'react';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import ActivationForm from '../components/ActivationForm';
import ActivationResult from '../components/ActivationResult';
import { getActivation } from '../services/api';

const HomePage: React.FC = () => {
    const [result, setResult] = useState<{ title: string; description: string; activationId: string } | null>(null);
    const [error, setError] = useState('');

    const handleSubmit = async (mood: number, goal: string) => {
        setError('');
        try {
            const response = await getActivation(mood, goal);
            setResult({
                title: response.title,
                description: response.description,
                activationId: response.activation_id,
            });
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Box p={5}>
            <Heading as="h1" mb={5}>
                Välkommen till InnerJourney
            </Heading>
            <VStack spacing={6}>
                <ActivationForm onSubmit={handleSubmit} />
                {error && <Text color="red.500">{error}</Text>}
                {result && (
                    <ActivationResult
                        title={result.title}
                        description={result.description}
                        activationId={result.activationId}
                    />
                )}
            </VStack>
        </Box>
    );
};

export default HomePage;