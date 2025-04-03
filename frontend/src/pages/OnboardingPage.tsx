import React, { useState, useEffect } from 'react';
import { Box, VStack, Heading, Text, Input, Button, Progress, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import ChatMessage from '../components/ChatMessage';
import ActivationForm from '../components/ActivationForm';
import { ActivationResult } from '../components/ActivationResult';
import { startOnboardingChat, sendOnboardingResponse, getActivation, ActivationResponse } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ConfirmationResult } from 'firebase/auth';

interface ChatMessageType {
    role: 'assistant' | 'user';
    message: string;
}

const OnboardingPage: React.FC = () => {
    const navigate = useNavigate();
    const { sendPhoneVerificationCode, verifyPhoneCode, sendEmailLink, user } = useAuth();
    const [conversation, setConversation] = useState<ChatMessageType[]>([]);
    const [userResponse, setUserResponse] = useState('');
    const [userId, setUserId] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState<'questions' | 'register' | 'verify' | 'activation' | 'result'>('questions');
    const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
    const [contactValue, setContactValue] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [profile, setProfile] = useState<any>(null);
    const [activation, setActivation] = useState<ActivationResponse | null>(null);

    // Navigera till hemsidan om användaren redan är inloggad
    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    // Starta onboardingen när sidan laddas
    useEffect(() => {
        const initOnboarding = async () => {
            try {
                const data = await startOnboardingChat();
                setUserId(data.userId);
                setConversation(data.conversation.map((msg: any) => ({ role: msg.role, message: msg.message })));
                setIsComplete(data.isComplete);
            } catch (err) {
                setError('Kunde inte starta onboardingen');
            }
        };
        initOnboarding();
    }, []);

    // Hantera användarens svar i onboardingen
    const handleSendResponse = async () => {
        if (!userResponse.trim() || !userId) return;
        try {
            const data = await sendOnboardingResponse(userId, userResponse, conversation);
            setConversation(data.conversation.map((msg: any) => ({ role: msg.role, message: msg.message })));
            setIsComplete(data.isComplete);
            setUserResponse('');
            if (data.isComplete) {
                // Spara profilen temporärt för att skicka till Gemini
                const userProfile = {
                    focusArea: data.conversation.find((msg: any) => msg.role === 'user' && (msg.message.includes('Stresslindring') || msg.message.includes('Fokus') || msg.message.includes('Självmedvetenhet')))?.message.toLowerCase() || 'unknown',
                    personalityType: {
                        traits: [data.conversation.find((msg: any) => msg.role === 'user' && (msg.message.includes('introvert') || msg.message.includes('extrovert')))?.message.toLowerCase() || 'unknown'],
                    },
                    neuroTendencies: {
                        adhdScore: data.conversation.find((msg: any) => msg.role === 'user' && msg.message.includes('många')) ? 3 : 0,
                    },
                    wellbeingFlags: {
                        suicideRisk: data.conversation.find((msg: any) => msg.role === 'user' && msg.message.includes('hopplös')) ? true : false,
                    },
                };
                setProfile(userProfile);
                setStep('register');
            }
        } catch (err) {
            setError('Kunde inte skicka svaret');
        }
    };

    // Skicka verifieringskod
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

    // Verifiera kod
    const handleVerifyCode = async () => {
        if (contactMethod === 'email') {
            // Kontrollera om e-posten är verifierad
            if (user) {
                const token = await user.getIdToken();
                localStorage.setItem('idToken', token);
                setStep('activation');
            } else {
                setError('Vänligen verifiera din e-post innan du fortsätter');
            }
        } else if (confirmationResult) {
            try {
                await verifyPhoneCode(confirmationResult, verificationCode);
                if (user) {
                    const token = await user.getIdToken();
                    localStorage.setItem('idToken', token);
                }
                setStep('activation');
            } catch (err) {
                setError('Ogiltig verifieringskod');
            }
        }
    };

    // Hantera ActivationForm-submission
    const handleActivationSubmit = async (mood: number, goal: string) => {
        try {
            const response = await getActivation(mood, goal, profile);
            setActivation(response);
            setStep('result');
        } catch (err: any) {
            setError(err.message);
        }
    };

    // Beräkna framsteg (baserat på antalet meddelanden)
    const totalSteps = 5; // Antal frågor i onboardingen
    const currentStep = Math.floor(conversation.length / 2); // Varje fråga + svar = 2 meddelanden
    const progress = (currentStep / totalSteps) * 100;

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh" bg="white">
            <Header />
            {/* Main Content */}
            <Box flex="1" display="flex" justifyContent="center" alignItems="center" p={5}>
                <VStack spacing={6} textAlign="center" maxW="400px" w="100%">
                    <Heading as="h1" size="xl">Välkommen till Inner Journey</Heading>
                    <Text color="gray.500">Låt oss börja din resa...</Text>

                    {/* Steg 1: Onboarding-frågor */}
                    {step === 'questions' && (
                        <>
                            {conversation.length > 0 && (
                                <>
                                    <Progress
                                        value={progress}
                                        size="sm"
                                        colorScheme="pink"
                                        bg="gray.200"
                                        borderRadius="md"
                                        w="100%"
                                    />
                                    <VStack spacing={4} w="100%">
                                        {conversation.map((msg, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                style={{ width: '100%' }}
                                            >
                                                <ChatMessage message={msg.message} role={msg.role} />
                                            </motion.div>
                                        ))}
                                    </VStack>
                                </>
                            )}
                            {!isComplete && (
                                <VStack spacing={4} w="100%">
                                    <Input
                                        value={userResponse}
                                        onChange={(e) => setUserResponse(e.target.value)}
                                        placeholder={conversation.length === 0 ? 'Födelsedatum' : 'Skriv ditt svar här...'}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendResponse()}
                                        borderColor="gray.300"
                                        _focus={{ borderColor: 'accent.gradientStart', boxShadow: '0 0 0 1px #FF6F61' }}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        <Button
                                            bg="#FF6F61"
                                            color="white"
                                            size="lg"
                                            borderRadius="md"
                                            onClick={handleSendResponse}
                                            _hover={{ bg: '#FF9F43' }}
                                        >
                                            {conversation.length === 0 ? 'Börja nu' : 'Skicka'}
                                        </Button>
                                    </motion.div>
                                </VStack>
                            )}
                        </>
                    )}

                    {/* Steg 2: Registrering */}
                    {step === 'register' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <VStack spacing={4} w="100%">
                                <Text fontSize="md">Vänligen registrera dig för att fortsätta</Text>
                                <FormControl>
                                    <FormLabel>Metod för registrering</FormLabel>
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

                    {/* Steg 3: Verifiering */}
                    {step === 'verify' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <VStack spacing={4} w="100%">
                                <Text fontSize="md">
                                    {contactMethod === 'email'
                                        ? 'En verifieringslänk har skickats till din e-post. Klicka på länken för att fortsätta.'
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
                                {contactMethod === 'email' && (
                                    <Button
                                        bg="#FF6F61"
                                        color="white"
                                        size="lg"
                                        borderRadius="md"
                                        onClick={handleVerifyCode}
                                        _hover={{ bg: '#FF9F43' }}
                                    >
                                        Jag har verifierat min e-post
                                    </Button>
                                )}
                            </VStack>
                        </motion.div>
                    )}

                    {/* Steg 4: ActivationForm */}
                    {step === 'activation' && (
                        <VStack spacing={4} w="100%">
                            <Text fontSize="md">Låt oss skapa din första aktivering</Text>
                            <ActivationForm onSubmit={handleActivationSubmit} error={error} />
                        </VStack>
                    )}

                    {/* Steg 5: Visa aktiveringen */}
                    {step === 'result' && activation && (
                        <VStack spacing={4} w="100%">
                            <Text fontSize="md">Här är din första aktivering:</Text>
                            <ActivationResult activation={activation} />
                            <Button
                                bg="#FF6F61"
                                color="white"
                                size="lg"
                                borderRadius="md"
                                onClick={() => navigate('/home')}
                                _hover={{ bg: '#FF9F43' }}
                            >
                                Fortsätt till hemsidan
                            </Button>
                        </VStack>
                    )}

                    {error && step !== 'activation' && <Text color="red.500">{error}</Text>}
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

export default OnboardingPage;