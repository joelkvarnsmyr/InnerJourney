import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import theme from './theme';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Routes>
                <Route path="/" element={<OnboardingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />
            </Routes>
        </ChakraProvider>
    );
}

export default App;