import { Box, Heading, Text } from '@chakra-ui/react';

interface ActivationResultProps {
    title: string;
    description: string;
    activationId: string;
}

const ActivationResult: React.FC<ActivationResultProps> = ({ title, description, activationId }) => {
    return (
        <Box p={5} borderWidth="1px" borderRadius="lg">
            <Heading as="h3" size="md" mb={2}>
                {title}
            </Heading>
            <Text mb={2}>{description}</Text>
            <Text fontSize="sm" color="gray.500">
                Aktiverings-ID: {activationId}
            </Text>
        </Box>
    );
};

export default ActivationResult;