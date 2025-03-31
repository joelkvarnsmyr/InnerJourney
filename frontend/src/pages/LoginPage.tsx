import { Box, Heading } from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
    return (
        <Box p={5}>
            <Heading as="h1" mb={5}>Logga in</Heading>
            <LoginForm />
        </Box>
    );
};

export default LoginPage;