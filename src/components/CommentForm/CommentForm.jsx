import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as reagentService from '../../services/reagentService';

const CommentForm = (props) => {
    const [formData, setFormData] = useState({ text: '' });

    const { reagentId, commentId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchComment = async () => {
            const reagentData = await reagentService.show(reagentId);
            const commentData = reagentData.comments.find((comment) => comment._id === commentId);
            setFormData(commentData);
        };
        if (reagentId && commentId) fetchComment();
    }, []);

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (reagentId && commentId) {
            reagentService.updateComment(reagentId, commentId, formData);
            navigate(`/reagents/${reagentId}`);
        } else {
            props.handleAddComment(formData);
        }
        setFormData({ text: '' });
    };

    if (reagentId && commentId) return (
        <main>
            <form onSubmit={handleSubmit}>
                <h1>Edit Comment</h1>
                <label htmlFor="text-input">Your comment:</label>
                <textarea
                    required
                    type="text"
                    name="text"
                    id="text-input"
                    value={formData.text}
                    onChange={handleChange}
                />
                <button type="submit">SUBMIT</button>
            </form>
        </main>
    );

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="text-input">Your comment:</label>
            <textarea
                required
                type="text"
                name="text"
                id="text-input"
                value={formData.text}
                onChange={handleChange}
            />
            <button type="submit">SUBMIT COMMENT</button>
        </form>
    );
};

export default CommentForm;
