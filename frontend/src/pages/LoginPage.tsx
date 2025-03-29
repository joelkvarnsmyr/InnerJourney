import { Box, Heading } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
    return (
        <Box p={4}>
            <Heading mb={4}>Logga in</Heading>
            <LoginForm />
        </Box>
    );
};

export default LoginPage;