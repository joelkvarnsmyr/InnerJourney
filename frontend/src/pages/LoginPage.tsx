import React, { useState, useEffect } from 'react';
import { Box, VStack, Heading, Text, Input, Button, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { ConfirmationResult } from 'firebase/auth';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { sendPhoneVerificationCode, verifyPhoneCode, sendEmailLink, signInWithEmailLink, user } = useAuth();
    const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
    const [contactValue, setContactValue] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [error, setError] = useState('');
    const [step, setStep] = useState<'method' | 'verify'>('method');

    // Navigera till hemsidan om användaren redan är inloggad
    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    // Hantera inloggning med e-postlänk
    useEffect(() => {
        const email = localStorage.getItem('emailForSignIn');
        if (email && window.location.href) {
            signInWithEmailLink(email, window.location.href)
                .then(() => {
                    navigate('/home');
                })
                .catch((err) => {
                    setError(err.message);
                });
        }
    }, [signInWithEmailLink, navigate]);

    const handleSendVerification = async () => {
        try {
            if (contactMethod === 'email') {
                await sendEmailLink(contactValue);
                setStep('verify');
            } else {
                const result = await sendPhoneVerificationCode(contactValue);
                setConfirmationResult(result);
                setStep('verify');
            }
        } catch (err) {
            setError('Kunde inte skicka verifieringskod');
        }
    };

    const handleVerifyCode = async () => {
        if (contactMethod === 'phone' && confirmationResult) {
            try {
                await verifyPhoneCode(confirmationResult, verificationCode);
                navigate('/home');
            } catch (err) {
                setError('Ogiltig verifieringskod');
            }
        }
    };

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh" bg="white">
            <Header />
            {/* Main Content */}
            <Box flex="1" display="flex" justifyContent="center" alignItems="center" p={5}>
                <VStack spacing={6} textAlign="center" maxW="400px" w="100%">
                    <Heading as="h1" size="xl">Logga in till Inner Journey</Heading>
                    <Text color="gray.500">Välj metod för att logga in</Text>

                    {/* Steg 1: Välj metod och ange kontaktuppgifter */}
                    {step === 'method' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <VStack spacing={4} w="100%">
                                <FormControl>
                                    <FormLabel>Metod för inloggning</FormLabel>
                                    <Select value={contactMethod} onChange={(e) => setContactMethod(e.target.value as 'email' | 'phone')}>
                                        <option value="email">E-post</option>
                                        <option value="phone">Telefonnummer</option>
                                    </Select>
                                </FormControl>
                                <Input
                                    placeholder={contactMethod === 'email' ? 'Ange din e-postadress' : 'Ange ditt telefonnummer'}
                                    value={contactValue}
                                    onChange={(e) => setContactValue(e.target.value)}
                                    borderColor="gray.300"
                                    _focus={{ borderColor: 'accent.gradientStart', boxShadow: '0 0 0 1px #FF6F61' }}
                                />
                                <Button
                                    bg="#FF6F61"
                                    color="white"
                                    size="lg"
                                    borderRadius="md"
                                    onClick={handleSendVerification}
                                    _hover={{ bg: '#FF9F43' }}
                                >
                                    Skicka verifieringskod
                                </Button>
                            </VStack>
                        </motion.div>
                    )}

                    {/* Steg 2: Verifiering */}
                    {step === 'verify' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <VStack spacing={4} w="100%">
                                <Text fontSize="md">
                                    {contactMethod === 'email'
                                        ? 'En inloggningslänk har skickats till din e-post. Klicka på länken för att logga in.'
                                        : 'Ange verifieringskoden som skickades till ditt telefonnummer'}
                                </Text>
                                {contactMethod === 'phone' && (
                                    <>
                                        <Input
                                            placeholder="Verifieringskod"
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                            borderColor="gray.300"
                                            _focus={{ borderColor: 'accent.gradientStart', boxShadow: '0 0 0 1px #FF6F61' }}
                                        />
                                        <Button
                                            bg="#FF6F61"
                                            color="white"
                                            size="lg"
                                            borderRadius="md"
                                            onClick={handleVerifyCode}
                                            _hover={{ bg: '#FF9F43' }}
                                        >
                                            Verifiera
                                        </Button>
                                    </>
                                )}
                            </VStack>
                        </motion.div>
                    )}

                    {error && <Text color="red.500">{error}</Text>}
                </VStack>
            </Box>

            {/* Footer */}
            <Box as="footer" p={4} bg="white" textAlign="center">
                <Text fontSize="sm" color="gray.500">
                    © 2025 Inner Journey. Alla rättigheter förbehållna.
                </Text>
            </Box>
        </Box>
    );
};

export default LoginPage;