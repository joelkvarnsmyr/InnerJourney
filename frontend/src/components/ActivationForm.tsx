import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, VStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';

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

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <FormControl isRequired>
                    <FormLabel>Humör (1-5)</FormLabel>
                    <NumberInput min={1} max={5} value={mood} onChange={(valueString) => setMood(Number(valueString))}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
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