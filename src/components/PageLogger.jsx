import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logtail from '../logger';
import { useAuth } from '../contexts/AuthContext';

const PageLogger = () => {
    const location = useLocation();
    const { user } = useAuth();

    useEffect(() => {
        logtail.info("Page View", {
            path: location.pathname,
            search: location.search,
            hash: location.hash,
            user_id: user?.id || 'anonymous',
            user_email: user?.email || 'anonymous',
            user_agent: navigator.userAgent,
            screen_resolution: `${window.innerWidth}x${window.innerHeight}`,
            referrer: document.referrer || 'direct'
        });
        // Flush logs to ensure they are sent
        logtail.flush();
    }, [location, user]);

    return null;
};

export default PageLogger;
