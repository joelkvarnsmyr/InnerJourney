import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ActivationFormProps {
    onSubmit: (mood: number, goal: string) => void;
    error?: string;
}

const ActivationForm: React.FC<ActivationFormProps> = ({ onSubmit, error }) => {
    const [mood, setMood] = useState(3); // Standardvärde för humör
    const [goal, setGoal] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            onSubmit(mood, goal);
        } finally {
            setLoading(false);
        }
    };

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    };

    const descriptiveLabelStyles = {
        mt: '4',
        fontSize: 'sm',
        fontWeight: 'bold',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box as="form" onSubmit={handleSubmit}>
                <VStack spacing={4} w="100%">
                    <FormControl isRequired>
                        <FormLabel>Humör (1-5)</FormLabel>
                        <Box p={4} pt={6}>
                            <Slider
                                aria-label="mood-slider"
                                min={1}
                                max={5}
                                step={1}
                                value={mood}
                                onChange={(val) => setMood(val)}
                            >
                                <SliderMark value={1} {...labelStyles}>1</SliderMark>
                                <SliderMark value={2} {...labelStyles}>2</SliderMark>
                                <SliderMark value={3} {...labelStyles}>3</SliderMark>
                                <SliderMark value={4} {...labelStyles}>4</SliderMark>
                                <SliderMark value={5} {...labelStyles}>5</SliderMark>
                                <SliderMark value={1} {...descriptiveLabelStyles} ml="-8">Dåligt humör</SliderMark>
                                <SliderMark value={5} {...descriptiveLabelStyles} ml="2">Bra humör</SliderMark>
                                <SliderMark value={mood} textAlign="center" bg="accent.gradientStart" color="white" mt="-10" ml="-5" w="12">
                                    {mood}
                                </SliderMark>
                                <SliderTrack bg="gray.200">
                                    <SliderFilledTrack bgGradient="linear(to-r, accent.gradientStart, accent.gradientEnd)" />
                                </SliderTrack>
                                <SliderThumb boxSize={6} borderColor="gray.300" />
                            </Slider>
                        </Box>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Mål</FormLabel>
                        <Input
                            type="text"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            placeholder="Ditt mål"
                            borderColor="gray.300"
                            _focus={{ borderColor: 'accent.gradientStart', boxShadow: '0 0 0 1px #FF6F61' }}
                            bg="white"
                            color="gray.800"
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        bgGradient="linear(to-r, accent.gradientStart, accent.gradientEnd)"
                        color="white"
                        size="lg"
                        borderRadius="md"
                        isLoading={loading}
                        _hover={{ bgGradient: 'linear(to-r, accent.gradientEnd, accent.gradientStart)' }}
                    >
                        Generera aktivering
                    </Button>
                    {error && <Text color="red.500">{error}</Text>}
                </VStack>
            </Box>
        </motion.div>
    );
};

export default ActivationForm;