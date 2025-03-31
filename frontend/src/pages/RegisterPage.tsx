import { Box, Heading } from '@chakra-ui/react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage: React.FC = () => {
    return (
        <Box p={5}>
            <Heading as="h1" mb={5}>Registrera dig</Heading>
            <RegisterForm />
        </Box>
    );
};

export default RegisterPage;