import './Member.css';

function Member(props) {

    return(
        <>
        <figure className='photo-box'>
                <img src={props.image} alt={props.alt} className="colleague" />
                <figcaption>{props.name}<br />
                    <a href={props.url} target="_blank">{props.address}</a>
                </figcaption>
        </figure>
        </>
    );

}

export default Member