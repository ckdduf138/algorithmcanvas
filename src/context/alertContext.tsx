import React, { createContext, useCallback, useContext, useState } from 'react';

type AlertType = 'info' | 'error' | 'warning' | 'success';

interface Alert {
    type: AlertType;
    message: string;
}

interface AlertContextType {
    notification: Alert | null;
    sendAlert: (type: AlertType, message: string) => void;
    resetAlert: () => void;
}

const AlertContext = createContext<AlertContextType>({
    notification: null,
    sendAlert: () => {},
    resetAlert: () => {},
});

export const useAlert = () => {
    return useContext(AlertContext);
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [alert, setAlert] = useState<Alert | null>(null);

    const sendAlert = (type: AlertType, message: string) => {
        setAlert({ type, message });
    };

    const resetAlert = useCallback(() => {
        setAlert(null);
    },[]);

    return (
        <AlertContext.Provider value={{ notification: alert, sendAlert, resetAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
