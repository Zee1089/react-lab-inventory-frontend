import { Link } from 'react-router-dom';

const EquipmentList = (props) => {

    return (
        <main>
            {props.equipments.map((equipment) => (
                // <Link key={equipment._id} to={`/equipments/${equipment._id}`}>
                <Link key={equipment._id} to={`/equipments/${equipment._id}`}>
                    <article>
                        <header>
                            <div>
                                <h2>{equipment.name}</h2>
                            </div>
                            <p>
                                {equipment.author ? equipment.author.username : '[ Unknown User ]'} posted on {new Date(equipment.createdAt).toLocaleDateString()}
                                {/* Added check for author value on reagent object* */}
                            </p>
                        </header>
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default EquipmentList;