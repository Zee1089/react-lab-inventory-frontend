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
                        {/* <ul>
                            {reagent.comments.map((comment) => (
                                <li key={comment._id}>{comment.text}</li>
                            ))}
                        </ul> 
                            // need to re-render ( refetch on Route loading ) comments when deciding to diplay
                                // else it uses outdated data ( non-representative of actual DB )
                        */}
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default ReagentList;