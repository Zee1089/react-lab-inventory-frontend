const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/equipment`;

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

const show = async (equipmentId) => {
    try {
        const res = await fetch(`${BASE_URL}/${equipmentId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const create = async (equipmentFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(equipmentFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

const deleteEquipment = async (equipmentId) => {
    try {
        const res = await fetch(`${BASE_URL}/${equipmentId}`, {
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

const updateEquipment = async (equipmentId, equipmentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${equipmentId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(equipmentFormData),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

//___Comment Related Services__//

// const createComment = async (equipmentId, commentFormData) => {
//     try {
//         const res = await fetch(`${BASE_URL}/${equipmentId}/comments`, {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(commentFormData),
//         });
//         return res.json();
//     } catch (error) {
//         console.log(error);
//     }
// };

// const deleteComment = async (equipmentId, commentId) => {
//     try {
//         const res = await fetch(`${BASE_URL}/${equipmentId}/comments/${commentId}`, {
//             method: 'DELETE',
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//         });
//         return res.json();
//     } catch (error) {
//         console.log(error);
//     }
// };

// const updateComment = async (equipmentId, commentId, commentFormData) => {
//     try {
//         const res = await fetch(`${BASE_URL}/${equipmentId}/comments/${commentId}`, {
//             method: 'PUT',
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(commentFormData),
//         });
//         return res.json();
//     } catch (error) {
//         console.log(error);
//     }
// };

export {
    index,
    show,
    create,
    deleteEquipment,
    updateEquipment,
    createComment,
    deleteComment,
    updateComment,
};