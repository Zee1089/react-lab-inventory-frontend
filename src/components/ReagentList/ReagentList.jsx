import { Link } from 'react-router-dom';

import styles from './ReagentList.module.css';

const ReagentList = (props) => {
    
    return (
        <main>
            {props.reagents.map((reagent) => (
                <Link key={reagent._id} to={`/reagents/${reagent._id}`}>
                    <article>
                        <header>
                            <div className={styles.div}>
                                <h2>{reagent.name}</h2>
                            </div>
                            <p>
                            {reagent.author ? reagent.author.username : '[ Unknown User ]'} posted on {new Date(reagent.createdAt).toLocaleDateString()}
                            </p>
                        </header>                       
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default ReagentList;