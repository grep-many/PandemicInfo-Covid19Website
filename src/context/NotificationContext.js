import React, { createContext, useContext, useState } from 'react';
import './Notification.css';

const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message) => {
        const id = Date.now();
        const newNotification = {
            id,
            message,
            isExiting: false,
            timer: null,
            startTime: Date.now(),
            remainingTime: 3000,
        };
        setNotifications((prev) => [newNotification, ...prev]);

        // Start the auto-remove timer
        startTimer(id, newNotification.remainingTime);
    };

    const startTimer = (id, duration) => {
        const timer = setTimeout(() => {
            triggerExitAnimation(id);
        }, duration);

        updateNotification(id, {
            timer,
            startTime: Date.now(),
            remainingTime: duration,
        });
    };

    const clearTimer = (id) => {
        const notification = notifications.find((n) => n.id === id);
        if (notification?.timer) {
            clearTimeout(notification.timer);

            // Update remaining time based on how long the timer was active
            const elapsedTime = Date.now() - notification.startTime;
            const newRemainingTime = Math.max(notification.remainingTime - elapsedTime, 0);

            updateNotification(id, {
                timer: null,
                remainingTime: newRemainingTime,
            });
        }
    };

    const resumeTimer = (id) => {
        const notification = notifications.find((n) => n.id === id);
        if (notification) {
            const elapsedTime = Date.now() - notification.startTime;
            const remainingTime = Math.max(notification.remainingTime - elapsedTime, 0);

            if (remainingTime > 0) {
                startTimer(id, remainingTime);
            } else {
                triggerExitAnimation(id); // Remove immediately if time has already elapsed
            }
        }
    };

    const updateNotification = (id, updates) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
        );
    };

    const triggerExitAnimation = (id) => {
        updateNotification(id, { isExiting: true });

        // Remove the notification after the exit animation completes
        setTimeout(() => {
            removeNotification(id);
        }, 500); // Matches the CSS slide-out duration
    };

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            <div id="notification-container" className="notification-container">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`notification ${
                            notification.isExiting ? 'slide-out' : 'slide-in'
                        }`}
                        onMouseEnter={() => clearTimer(notification.id)} // Pause the timer
                        onMouseLeave={() => resumeTimer(notification.id)} // Resume or remove
                    >
                        <button
                            className="close-button"
                            onClick={() => triggerExitAnimation(notification.id)}
                        >
                            &times;
                        </button>
                        <span>{notification.message}</span>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};
