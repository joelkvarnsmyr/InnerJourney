import { useState } from 'react';
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
} from '@chakra-ui/react';

const ActivationForm: React.FC<{ onSubmit: (mood: number, goal: string) => void }> = ({ onSubmit }) => {
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
        mt: '4', // Flyttar etiketterna lite längre ner för att inte krocka med siffrorna
        fontSize: 'sm',
        fontWeight: 'bold',
    };

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={4}>
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
                            <SliderMark value={1} {...labelStyles}>
                                1
                            </SliderMark>
                            <SliderMark value={2} {...labelStyles}>
                                2
                            </SliderMark>
                            <SliderMark value={3} {...labelStyles}>
                                3
                            </SliderMark>
                            <SliderMark value={4} {...labelStyles}>
                                4
                            </SliderMark>
                            <SliderMark value={5} {...labelStyles}>
                                5
                            </SliderMark>
                            {/* Lägg till beskrivande etiketter för "Dåligt humör" och "Bra humör" */}
                            <SliderMark value={1} {...descriptiveLabelStyles} ml="-8">
                                Dåligt humör
                            </SliderMark>
                            <SliderMark value={5} {...descriptiveLabelStyles} ml="2">
                                Bra humör
                            </SliderMark>
                            <SliderMark
                                value={mood}
                                textAlign="center"
                                bg="blue.500"
                                color="white"
                                mt="-10"
                                ml="-5"
                                w="12"
                            >
                                {mood}
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
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
                    />
                </FormControl>
                <Button type="submit" colorScheme="blue" isLoading={loading}>
                    Generera aktivering
                </Button>
            </VStack>
        </Box>
    );
};

export default ActivationForm;