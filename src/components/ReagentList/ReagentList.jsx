import { Link } from 'react-router-dom';
import './ReagentList.css'


const ReagentList = (props) => {

    return (
        <main>
            <h2>Reagents</h2>
            <hr />
            <ul>
            {props.reagents.map((reagent) => (
                <li key={reagent._id}>
                <Link to={`/reagents/${reagent._id}`}>
                    <article>
                        <header>
                            <div>
                                <h3>  {reagent.name}</h3>
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