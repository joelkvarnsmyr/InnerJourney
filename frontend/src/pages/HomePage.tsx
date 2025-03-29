import { Box, Heading } from '@chakra-ui/react';
import BirthdayInput from '../components/BirthdayInput';

const HomePage: React.FC = () => {
    const handleSubmit = (sessionId: string) => {
        console.log('Session ID:', sessionId);
    };

    return (
        <Box p={4}>
            <Heading mb={4}>Välkommen till InnerJourney</Heading>
            <BirthdayInput onSubmit={handleSubmit} />
        </Box>
    );
};

export default HomePage;