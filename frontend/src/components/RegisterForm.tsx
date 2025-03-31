import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, VStack, Text } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await register(email, password);
            // Omdirigera användaren eller visa ett framgångsmeddelande här
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <FormControl isRequired>
                    <FormLabel>E-post</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-post"
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Lösenord</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Lösenord"
                    />
                </FormControl>
                {error && <Text color="red.500">{error}</Text>}
                <Button type="submit" colorScheme="blue" isLoading={loading}>
                    Registrera
                </Button>
            </VStack>
        </Box>
    );
};

export default RegisterForm;