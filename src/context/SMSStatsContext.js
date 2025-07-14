import React, { createContext, useContext, useState } from 'react';

const SMSStatsContext = createContext();

export function SMSStatsProvider({ children }) {
    const [smsStats, setSMSStats] = useState({
        recipients: 0,
        delivered: 0,
        failed: 0,
    });

    return (
        <SMSStatsContext.Provider value={{ smsStats, setSMSStats }}>
            {children}
        </SMSStatsContext.Provider>
    );
}

export function useSMSStats() {
    return useContext(SMSStatsContext);
} 