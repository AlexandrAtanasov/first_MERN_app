import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
        try {

        } catch () {
            
        };
    });

    return { loading, request };
};