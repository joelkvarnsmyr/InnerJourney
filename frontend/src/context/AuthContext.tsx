import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import {
    signInWithPhoneNumber,
    RecaptchaVerifier,
    ConfirmationResult,
    onAuthStateChanged,
    User,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
    signOut,
} from 'firebase/auth';

interface AuthContextType {
    sendPhoneVerificationCode: (phoneNumber: string) => Promise<ConfirmationResult>;
    verifyPhoneCode: (confirmationResult: ConfirmationResult, code: string) => Promise<void>;
    sendEmailLink: (email: string) => Promise<void>;
    signInWithEmailLink: (email: string, link: string) => Promise<void>;
    logout: () => Promise<void>; // Lägg till logout
    user: User | null;
    idToken: string | null;
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
    const [user, setUser] = useState<User | null>(null);
    const [idToken, setIdToken] = useState<string | null>(null);

    // Lyssna på autentiseringsstatus och uppdatera user och idToken
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const token = await currentUser.getIdToken();
                setUser(currentUser);
                setIdToken(token);
                localStorage.setItem('idToken', token);
            } else {
                setUser(null);
                setIdToken(null);
                localStorage.removeItem('idToken');
            }
        });
        return () => unsubscribe();
    }, []);

    const sendPhoneVerificationCode = async (phoneNumber: string): Promise<ConfirmationResult> => {
        try {
            const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
            });
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
            return confirmationResult;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const verifyPhoneCode = async (confirmationResult: ConfirmationResult, code: string) => {
        try {
            const userCredential = await confirmationResult.confirm(code);
            const token = await userCredential.user.getIdToken();
            setUser(userCredential.user);
            setIdToken(token);
            localStorage.setItem('idToken', token);
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const sendEmailLink = async (email: string) => {
        try {
            const actionCodeSettings = {
                url: 'http://localhost:3000/login',
                handleCodeInApp: true,
            };
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            localStorage.setItem('emailForSignIn', email);
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const signInWithEmailLinkHandler = async (email: string, link: string) => {
        try {
            if (isSignInWithEmailLink(auth, link)) {
                const userCredential = await signInWithEmailLink(auth, email, link);
                const token = await userCredential.user.getIdToken();
                setUser(userCredential.user);
                setIdToken(token);
                localStorage.setItem('idToken', token);
                localStorage.removeItem('emailForSignIn');
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setIdToken(null);
            localStorage.removeItem('idToken');
            localStorage.removeItem('emailForSignIn');
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ sendPhoneVerificationCode, verifyPhoneCode, sendEmailLink, signInWithEmailLink: signInWithEmailLinkHandler, logout, user, idToken }}>
            <div id="recaptcha-container"></div>
            {children}
        </AuthContext.Provider>
    );
};