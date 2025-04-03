import React from 'react';
import { Box, Heading, Text, VStack, UnorderedList, ListItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ActivationResponse } from '../services/api';

interface ActivationResultProps {
    activation: ActivationResponse;
}

export const ActivationResult: React.FC<ActivationResultProps> = ({ activation }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box
                p={4}
                bg="clean.card"
                borderRadius="md"
                boxShadow="sm"
                maxW="400px"
                w="100%"
            >
                <VStack spacing={4} align="start">
                    <Heading as="h3" size="md" color="accent.gradientStart">{activation.title}</Heading>
                    <Text fontSize="sm" color="gray.500">{activation.introduction_message}</Text>
                    <Text>{activation.description}</Text>
                    <Text fontSize="sm"><strong>Typ:</strong> {activation.activation_type}</Text>
                    <Text fontSize="sm"><strong>Kategori:</strong> {activation.category_id}</Text>
                    <Text fontSize="sm"><strong>Varaktighet:</strong> {activation.duration} minuter</Text>
                    <Text fontSize="sm"><strong>Instruktion:</strong> {activation.prompt}</Text>
                    <Text fontSize="sm"><strong>Förberedelse:</strong> {activation.preparation_message}</Text>
                    <Text fontSize="sm"><strong>Reflektionsfrågor:</strong></Text>
                    <UnorderedList pl={4}>
                        {activation.questions.map((question: string, index: number) => (
                            <ListItem key={index} fontSize="sm">{question}</ListItem>
                        ))}
                    </UnorderedList>
                </VStack>
            </Box>
        </motion.div>
    );
};