const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }
    return {};
};

export default getAuthHeader;