import { createContext, useContext, useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

interface AuthContextType {
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth måste användas inom en AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const register = async (email: string, password: string) => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ login, register }}>
            {children}
        </AuthContext.Provider>
    );
};