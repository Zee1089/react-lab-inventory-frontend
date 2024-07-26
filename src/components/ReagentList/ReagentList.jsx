import { Link } from 'react-router-dom';

const ReagentList = (props) => {
    return (
        <main>
            {props.reagents.map((reagent) => (
                <Link key={reagent._id} to={`/reagents/${reagent._id}`}>
                    <article>
                        <header>
                            <div>
                                <h2>{reagent.name}</h2>
                            </div>
                            <p>
                            {reagent.author.username} posted on {new Date(reagent.createdAt).toLocaleDateString()}
                            </p>
                        </header>
                        <p>{reagent.comments}</p>
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default ReagentList;