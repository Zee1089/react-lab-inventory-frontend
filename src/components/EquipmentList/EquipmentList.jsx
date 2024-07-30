import { Link } from 'react-router-dom';

const EquipmentList = (props) => {

    return (
        <main>
            {props.equipment.map((piece) => (
                <Link key={piece._id} to={`/equipment/${piece._id}`}>
                    <article>
                        <header>
                            <div>
                                <h2>{piece.name}</h2>
                            </div>
                            <p>
                                {piece.author ? piece.author.username : '[ Unknown User ]'} posted on {new Date(piece.createdAt).toLocaleDateString()}
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