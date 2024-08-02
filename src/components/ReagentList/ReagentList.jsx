import { Link } from 'react-router-dom';
import './ReagentList.css';

const ReagentList = (props) => {
    return (
        <main>
            <h1>Reagents</h1>
            <hr />
            <ul>
                {props.reagents.map((reagent) => (
                    <li key={reagent._id}>
                        <Link to={`/reagents/${reagent._id}`}>
                            <article>
                                <header>
                                    <div>
                                        <h3 className="reagent-name">
                                            {reagent.quantity} {reagent.name}
                                        </h3>
                                    </div>
                                    <p className="reagent-details">
                                        {reagent.author
                                            ? reagent.author.username
                                            : '[ Unknown User ]'}{' '}
                                        posted on{' '}
                                        {new Date(reagent.createdAt).toLocaleDateString()}
                                    </p>
                                </header>
                            </article>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default ReagentList;
