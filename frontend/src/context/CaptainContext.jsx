import { createContext, useContext, useState } from 'react';

// Create the context
export const CaptainDataContext = createContext();

// // Create a custom hook for using the context
// export const useCaptain = () => {
//     const context = useContext(CaptainContext);
//     if (!context) {
//         throw new Error('useCaptain must be used within a CaptainProvider');
//     }
//     return context;
// };

// Create a provider component
export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Add captain-related functions
    const loginCaptain = async (credentials) => {
        try {
            setLoading(true);
            // Add your login API call here
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const logoutCaptain = () => {
        setCaptain(null);
    };

    const value = {
        captain,
        setCaptain,
        loading,
        error,
        loginCaptain,
        logoutCaptain,
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;