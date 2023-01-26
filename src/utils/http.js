export const http = () => {
    const customFetch = async (endpoint, options) => {
        options.method = options.method || "GET";

        const defaultHeader = {
            "accept": "application/json",
        };

        options.headers = options.headers
            ? { ...defaultHeader, ...options.headers }
            : defaultHeader;

        const controller = new AbortController();
        options.signal = controller.signal;

        setTimeout(() => controller.abort(), 3000);

        try {
            const res = await fetch(endpoint, options);
            return res.ok
                ? res.json()
                : {
                    error: true,
                    status: res.status || "00",
                    statusText: res.statusText || "Ocurrió un error!!!",
                    msg: `${res.status} ${res.statusText}`
                };
        } catch (error) {
            return (
                {
                    error: true,
                    msg: `Error - ${error.message}`
                }
            );
        }
    };

    const get = (url, options = {}) => customFetch(url, options);

    return {
        get
    };
};
