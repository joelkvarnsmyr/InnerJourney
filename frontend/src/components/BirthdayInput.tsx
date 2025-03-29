import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, VStack } from '@chakra-ui/react';
import { initBirthdata } from '../services/api';

const BirthdayInput: React.FC<{ onSubmit: (sessionId: string) => void }> = ({ onSubmit }) => {
    const [birthDate, setBirthDate] = useState('');
    const [birthTime, setBirthTime] = useState('');
    const [birthLocation, setBirthLocation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await initBirthdata({
                birth_date: birthDate,
                birth_time: birthTime,
                birth_location: birthLocation,
            });
            onSubmit(response.session_id);
        } catch (error) {
            console.error('Error submitting birth data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <FormControl isRequired>
                    <FormLabel>Födelsedatum</FormLabel>
                    <Input
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        placeholder="YYYY-MM-DD"
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Födelsedatum (HH:MM)</FormLabel>
                    <Input
                        value={birthTime}
                        onChange={(e) => setBirthTime(e.target.value)}
                        placeholder="HH:MM"
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Födelseort</FormLabel>
                    <Input
                        value={birthLocation}
                        onChange={(e) => setBirthLocation(e.target.value)}
                        placeholder="Stad"
                    />
                </FormControl>
                <Button type="submit" colorScheme="brand" isLoading={loading}>
                    Skicka
                </Button>
            </VStack>
        </Box>
    );
};

export default BirthdayInput;