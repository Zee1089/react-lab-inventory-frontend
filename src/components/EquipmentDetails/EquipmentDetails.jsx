import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as equipmentService from '../../services/equipmentService';

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

    if (!equipment) return <main>Loading...</main>;
    return (
        <main>
            <header>
                <h1>{equipment.category}</h1>
                <h2>Brand: {equipment.brand}</h2>
                <h3>Location: {equipment.location}</h3>
                <p>Maintenance Date: {equipment.maintenanceDate.slice(0, 10)}</p>

                <div>
                    <p>
                        {equipment.author.username} posted on {equipment.createdAt.slice(0, 10)}
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
        </main>
    );
};

export default EquipmentDetails;