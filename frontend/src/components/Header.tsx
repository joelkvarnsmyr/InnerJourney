import React from 'react';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/DarkInnerJourneyLogo.svg';
import symbolDark from '../assets/SymbolDark.svg';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            console.error('Failed to logout:', err);
        }
    };

    return (
        <Box as="header" p={4} bg="white" textAlign="center">
            <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
                <Image src={logo} alt="Inner Journey Logo" height="40px" />
                <Flex align="center" gap={4}>
                    {user ? (
                        <Button
                            onClick={handleLogout}
                            variant="link"
                            color="gray.500"
                            fontSize="sm"
                        >
                            Logga ut
                        </Button>
                    ) : (
                        <Link to="/login">
                            <Flex align="center">
                                <Image src={symbolDark} alt="Login Symbol" height="30px" mr={2} />
                                <Text fontSize="sm" color="gray.500">Redan medlem? Logga in</Text>
                            </Flex>
                        </Link>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};

export default Header;