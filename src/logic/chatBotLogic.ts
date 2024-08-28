export const getBotResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('hello')) {
        return 'Hello! How can I assist you today?';
    } else if (lowerCaseMessage.includes('help')) {
        return 'I am here to help you! What do you need assistance with?';
    }

    return "I'm not sure how to respond to that. Can you try asking in a different way?";
};
