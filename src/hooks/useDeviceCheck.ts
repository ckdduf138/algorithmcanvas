import { useEffect, useState } from 'react';

const useDeviceCheck = () => {
    const [deviceType, setDeviceType] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');

    useEffect(() => {
        const checkDeviceType = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            if (/mobile/i.test(userAgent)) {
                setDeviceType('mobile');
            } else if (/tablet/i.test(userAgent)) {
                setDeviceType('tablet');
            } else {
                setDeviceType('desktop');
            }
        };

        checkDeviceType();

        window.addEventListener('resize', checkDeviceType);
        return () => {
            window.removeEventListener('resize', checkDeviceType);
        };
    }, []);

    return deviceType;
};

export default useDeviceCheck;
