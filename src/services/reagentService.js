const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/reagents`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const show = async (reagentId) => {
    try {
        const res = await fetch(`${BASE_URL}/${reagentId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const create = async (reagentFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reagentFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const deleteReagent = async (reagentId) => {
    try {
        const res = await fetch(`${BASE_URL}/${reagentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const updateReagent = async (reagentId, reagentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${reagentId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reagentFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const createComment = async (reagentId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${reagentId}/comments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const deleteComment = async (reagentId, commentId) => {
    try {
        const res = await fetch(`${BASE_URL}/${reagentId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const updateComment = async (reagentId, commentId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${reagentId}/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export {
    index,
    show,
    create,
    deleteReagent,
    updateReagent,
    createComment,
    deleteComment,
    updateComment,
};