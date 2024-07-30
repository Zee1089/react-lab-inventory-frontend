// src/components/equipmentDetails/equipmentDetails.jsx

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as equipmentService from '../../services/equipmentService';

// import CommentForm from '../CommentForm/CommentForm';

const EquipmentDetails = (props) => {

    const [equipment, setEquipment] = useState(null);

    const user = useContext(AuthedUserContext);

    const { equipmentId } = useParams();

    useEffect(() => {
        const fetchEquipment = async () => {
            const equipmentData = await equipmentService.show(equipmentId);
            setEquipment(equipmentData);
        };
        fetchEquipment();
    }, [equipmentId]);

    const handleAddComment = async (commentFormData) => {
        const newComment = await equipmentService.createComment(equipmentId, commentFormData);
        setEquipment({ ...equipment, comments: [...equipment.comments, newComment] });
    };

    const handleDeleteComment = async (equipmentId, commentId) => {
        const deletedComment = await equipmentService.deleteComment(equipmentId, commentId);
        console.log(deletedComment);
        const newCommentsArr = equipment.comments.filter((comment) => comment._id !== commentId);
        setEquipment({ ...equipment, comments: newCommentsArr });
    };

    if (!equipment) return <main>Loading...</main>;
    return (
        <main>
            <header>
                <h1>{equipment.category}</h1>
                <h2>Brand: {equipment.brand}</h2>
                <h3>Location: {equipment.location}</h3>
                <p>Expiration: {equipment.expiration}</p>

                <div>
                    <p>
                        {equipment.author.username} posted on {new Date(equipment.createdAt).toLocaleDateString()}
                    </p>
                    {equipment.author._id === user._id && (
                        <>
                            <Link to={`/equipments/${equipmentId}/edit`}>Edit</Link>
                            <button onClick={() => props.handleDeleteEquipment(equipmentId)}>
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </header>

            {/* <section>
                <h2>Comments</h2>

                {!equipment.comments.length && <p>There are no comments.</p>}

                {equipment.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <div>
                                <p>
                                    {comment.author.username} posted on
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </p>
                                {comment.author._id === user._id && (
                                    <>
                                        <Link to={`/equipments/${equipmentId}/comments/${comment._id}/edit`}>Edit</Link>
                                        <button onClick={() => handleDeleteComment(equipmentId, comment._id)}>
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
            <CommentForm handleAddComment={handleAddComment} /> */}
        </main>
    );
};

export default EquipmentDetails;