import { Link } from 'react-router-dom';

import styles from '../ReagentList/ReagentList.module.css';

const EquipmentList = (props) => {

    return (
        <main>
            <h1 className='list-h1'>Equipment</h1>
            <hr />
            {props.equipments.map((equipment) => (
                <Link key={equipment._id} to={`/equipments/${equipment._id}`}>
                    <article>
                        <header>
                            <div className={styles.div}>
                                <h2>{equipment.category}</h2>
                            </div>
                            <p>
                                {equipment.author ? equipment.author.username : '[ Unknown User ]'} posted on {new Date(equipment.createdAt).toLocaleDateString()}
                            </p>
                        </header>
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default EquipmentList;