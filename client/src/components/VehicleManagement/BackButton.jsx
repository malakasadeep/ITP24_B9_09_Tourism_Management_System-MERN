import { Link } from "react-router-dom";
import {BsArrowLeft} from 'react-icons/bs';

const BackButton = ({destination = '/vehicle'}) => {
    return(
        <div className='flex'>
            <Link to={destination}
                className='bg-sky-800 text-white px-4 py-2 rounded-lg w-fit'>
                <BsArrowLeft className='text-2xl '/>
            </Link>
        </div>
    )
}

export default BackButton;