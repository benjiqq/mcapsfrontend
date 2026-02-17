import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import logtail from './logger';
import { useAuth } from './contexts/AuthContext';

const ActivityLogger = () => {
    const location = useLocation();
    const { user, ipData } = useAuth();

    // Track if we have logged this page view with IP data
    const lastLoggedRef = useRef({ path: null, hasIp: false });

    useEffect(() => {
        // PER-PAGE LOGGING

        // If we already logged this path with IP, don't log again
        if (lastLoggedRef.current.path === location.pathname && lastLoggedRef.current.hasIp) {
            return;
        }

        // If we haven't logged this path at all, OR we logged it but now we have IP data
        const shouldLog = lastLoggedRef.current.path !== location.pathname || (ipData && !lastLoggedRef.current.hasIp);

        if (shouldLog) {
            const ipInfo = ipData || {};
            logtail.info(`Page View: ${location.pathname}`, {
                type: 'page_view',
                path: location.pathname,
                search: location.search,
                hash: location.hash,
                user_id: user?.id || 'anonymous',
                user_email: user?.email || 'anonymous',
                user_agent: navigator.userAgent,
                screen_resolution: `${window.innerWidth}x${window.innerHeight}`,
                referrer: document.referrer || 'direct',
                ip: ipInfo.ip,
                city: ipInfo.city,
                region: ipInfo.region,
                country: ipInfo.country_name,
                isp: ipInfo.org
            });
            logtail.flush();

            // Update ref
            lastLoggedRef.current = {
                path: location.pathname,
                hasIp: !!ipData
            };
        }
    }, [location, user, ipData]);

    // INTERACTION LOGGING (CLICKS)
    useEffect(() => {
        const handleClick = (e) => {
            // Find closest button or link
            const target = e.target.closest('button, a, [role="button"]');

            if (target) {
                const text = target.innerText || target.getAttribute('aria-label') || 'Unknown';
                const id = target.id;
                const className = target.className;
                const ipInfo = ipData || {};

                logtail.info(`Button Clicked: ${text.substring(0, 50)}`, {
                    type: 'interaction',
                    element: target.tagName,
                    text: text,
                    id: id,
                    class: className,
                    path: location.pathname,
                    user_id: user?.id || 'anonymous',
                    user_email: user?.email || 'anonymous',
                    ip: ipInfo.ip,
                    city: ipInfo.city,
                    country: ipInfo.country_name
                });
                logtail.flush();
            }
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [location, user, ipData]);

    return null;
};

export default ActivityLogger;
