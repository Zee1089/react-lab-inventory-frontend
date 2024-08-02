import { Link } from 'react-router-dom';

const ReagentList = (props) => {

    return (
        <main>
            <h1>Reagents</h1>
            <hr />
            {props.reagents.map((reagent) => (
                <Link key={reagent._id} to={`/reagents/${reagent._id}`}>
                    <article>
                        <header>
                            <div>
                                <h4>{reagent.quantity} </h4>- <h3> {reagent.name}</h3>
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