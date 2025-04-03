import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface ChatMessageProps {
    message: string;
    role: 'assistant' | 'user';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, role }) => {
    const bgColor = role === 'assistant' ? 'gray.100' : 'blue.100';
    const alignSelf = role === 'assistant' ? 'flex-start' : 'flex-end';

    return (
        <Box p={3} bg={bgColor} borderRadius="md" alignSelf={alignSelf} mb={2}>
            <Text>{message}</Text>
        </Box>
    );
};

export default ChatMessage;