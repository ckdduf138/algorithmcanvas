import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAlert } from '../../context/alertContext';
import { ReactSVG } from 'react-svg';

type AlertType = 'info' | 'error' | 'warning' | 'success';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-100px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-100px);
    }
`;

const StyledAlert = styled.div<{ $type: AlertType; $fade?: boolean }>`
    display: flex;
    min-width: 250px;
    min-height: 30px;
    position: fixed;
    top: 25px;
    left: calc(50% - 150px);
    align-items: center;
    justify-content: center;
    background-color: ${({ $type }) =>
        $type === 'info' ? '#3b82f6' :
        $type === 'error' ? '#ef4444' :
        $type === 'warning' ? '#f59e0b' :
        '#10b981'};
    color: white;
    padding: 0px 15px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1;
    animation: ${({ $fade }) => $fade ? fadeIn : fadeOut} 1s forwards;
`;

const IconContainer = styled.div`
    display: flex;
    margin-right: 10px;
    height: 50px;
    align-items: center;

    svg {
        width: 24px;
        height: 24px;
    }
`;

const StyledAlertText = styled.div`
    line-height: 50px;
`;

const CustomAlert = () => {
    const [visibleNotification, setVisibleNotification] = useState<boolean>(false);

    const { notification } = useAlert();

    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

    const handleAlertTiming = useCallback(() => {
        setVisibleNotification(true);

        timeoutIdRef.current = setTimeout(() => {
            setVisibleNotification(false);
        }, 5000);

        return () => {
            if (timeoutIdRef.current) {
                console.log('1');
                clearTimeout(timeoutIdRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (notification) {
            if (timeoutIdRef.current) {
                console.log('2');
                clearTimeout(timeoutIdRef.current);
            }
            const cleanup = handleAlertTiming();
            return cleanup;
        }

        if (notification === null) {
            if (timeoutIdRef.current) {
                console.log('3');
                clearTimeout(timeoutIdRef.current);
            }
        }
    }, [handleAlertTiming, notification]);

    return (
        <>
            {notification && 
                <StyledAlert $type={notification.type} $fade={visibleNotification}>
                    <IconContainer>
                        <ReactSVG src={getIcon(notification.type)} wrapper='svg'/> 
                    </IconContainer>
                    <StyledAlertText>{notification.message}</StyledAlertText>
                </StyledAlert>
            }
        </>
    );
};

const getIcon = (type: AlertType) => {
    switch (type) {
        case 'info':
            return `${process.env.PUBLIC_URL}/images/alert-info.svg`;
        case 'error':
            return `${process.env.PUBLIC_URL}/images/alert-error.svg`;
        case 'warning':
            return `${process.env.PUBLIC_URL}/images/alert-warning.svg`;
        case 'success':
            return `${process.env.PUBLIC_URL}/images/alert-success.svg`;
        default:
            return '';
    }
};

export default CustomAlert;
