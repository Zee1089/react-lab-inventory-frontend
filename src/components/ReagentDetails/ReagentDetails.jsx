import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as reagentService from '../../services/reagentService';
import './ReagentDetails.css';

import CommentForm from '../CommentForm/CommentForm';

const ReagentDetails = (props) => {

    const [reagent, setReagent] = useState(null);

    const user = useContext(AuthedUserContext);

    const { reagentId } = useParams();

    useEffect(() => {
        const fetchReagent = async () => {
            const reagentData = await reagentService.show(reagentId);
            setReagent(reagentData);
        };
        fetchReagent();
    }, [reagentId]);

    const handleAddComment = async (commentFormData) => {
        const newComment = await reagentService.createComment(reagentId, commentFormData);
        setReagent({ ...reagent, comments: [...reagent.comments, newComment] });
    };

    const handleDeleteComment = async (reagentId, commentId) => {
        const deletedComment = await reagentService.deleteComment(reagentId, commentId);
        const newCommentsArr = reagent.comments.filter((comment) => comment._id !== commentId);
        setReagent({ ...reagent, comments: newCommentsArr });
    };

    if (!reagent) return <main>Loading...</main>;
    return (
        <main className="reagent-details">
            <header className="reagent-header">
                <h1 className="reagent-name">{reagent.name}</h1>
                <p className="reagent-category">{reagent.category.toUpperCase()}</p>
                <h2 className="reagent-brand">Brand: {reagent.brand}</h2>
                <h2 className="reagent-quantity">Quantity: {reagent.quantity}</h2>
                <p className="reagent-expiration">Expiration: {reagent.expirationDate.slice(0, 10)}</p> 
                <div className="reagent-author">
                    <p>
                        {reagent.author.username} posted on {reagent.createdAt.slice(0, 10)}
                    </p>
                    {reagent.author._id === user._id && (
                        <>
                            <Link to={`/reagents/${reagentId}/edit`} className="edit-link">Edit</Link>
                            <button className="delete-button" onClick={() => props.handleDeleteReagent(reagentId)}>
                                Delete
                            </button>
                        </>
                    )}
                </div>

            </header>

            <section className="reagent-comments-section">
                <h2>Comments</h2>

                {!reagent.comments.length && <p>There are no comments.</p>}

                {reagent.comments.map((comment) => (
                    <article key={comment._id} className="reagent-comment">
                        <header className="comment-header">
                            <div>
                                <p>
                                    {comment.author.username} posted on {new Date(comment.createdAt).toLocaleDateString()}
                                </p>
                                {comment.author._id === user._id && (
                                    <>
                                        <Link to={`/reagents/${reagentId}/comments/${comment._id}/edit`} className="edit-link">Edit</Link>
                                        <button className="delete-button" onClick={() => handleDeleteComment(reagentId, comment._id)}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </header>
                        <p className="comment-text">{comment.text}</p>
                    </article>
                ))}
            </section>
            <h2>Comment</h2>
            <CommentForm handleAddComment={handleAddComment} />
        </main>
    );
};

export default ReagentDetails;
