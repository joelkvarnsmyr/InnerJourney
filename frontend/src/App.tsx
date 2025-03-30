import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
    return (
        <ChakraProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ChakraProvider>
    );
};

export default App;