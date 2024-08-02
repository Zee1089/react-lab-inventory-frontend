import { Link } from 'react-router-dom';

const ReagentList = (props) => {

    return (
        <main>
            <h1>Reagents</h1>
            <hr />
            <ul>
            {props.reagents.map((reagent) => (
                <li key = {reagent._id}>
                <Link to={`/reagents/${reagent._id}`}>
                    <article>
                        <header>
                            <div>
                                <h2>Quantity: {reagent.quantity} Name: {reagent.name}</h2>
                            </div>
                            <p>
                                {reagent.author ? reagent.author.username : '[ Unknown User ]'} posted on {new Date(reagent.createdAt).toLocaleDateString()}
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