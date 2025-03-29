import { Box, Heading } from '@chakra-ui/react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage: React.FC = () => {
    return (
        <Box p={4}>
            <Heading mb={4}>Registrera</Heading>
            <RegisterForm />
        </Box>
    );
};

export default RegisterPage;