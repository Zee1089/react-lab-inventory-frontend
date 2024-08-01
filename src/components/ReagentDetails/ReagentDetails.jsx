// src/components/reagentDetails/reagentDetails.jsx

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as reagentService from '../../services/reagentService';

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
        console.log(deletedComment);
        const newCommentsArr = reagent.comments.filter((comment) => comment._id !== commentId);
        setReagent({ ...reagent, comments: newCommentsArr });
    };

    if (!reagent) return <main>Loading...</main>;
    return (
        <main>
            <header>
                <h1>{reagent.name}</h1>
                <p>{reagent.category.toUpperCase()}</p>
                <h2>Brand: {reagent.brand}</h2>
                <h2>Quantity: {reagent.quantity}</h2>
                <p>Expiration: {new Date(reagent.expirationDate).toLocaleDateString()}</p> 
                    {/* fixed error in property reference naming and used Date method to convert to more readable format */}
                <div>
                    <p>
                        {reagent.author.username} posted on {new Date(reagent.createdAt).toLocaleDateString()}
                    </p>
                    {reagent.author._id === user._id && (
                        <>
                            <Link to={`/reagents/${reagentId}/edit`}>Edit</Link>
                            <button onClick={() => props.handleDeleteReagent(reagentId)}>
                                Delete
                            </button>
                        </>
                    )}
                </div>

            </header>

            <section>
                <h2>Comments</h2>

                {!reagent.comments.length && <p>There are no comments.</p>}

                {reagent.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <div>
                                <p>
                                    {comment.author.username} posted on
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </p>
                                {comment.author._id === user._id && (
                                    <>
                                        <Link to={`/reagents/${reagentId}/comments/${comment._id}/edit`}>Edit</Link>
                                        <button onClick={() => handleDeleteComment(reagentId, comment._id)}>
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </header>
                        <p>{comment.text}</p>
                    </article>
                ))}
            </section>
            <h2>Comment</h2>
            <CommentForm handleAddComment={handleAddComment} />
        </main>
    );
};

export default ReagentDetails;