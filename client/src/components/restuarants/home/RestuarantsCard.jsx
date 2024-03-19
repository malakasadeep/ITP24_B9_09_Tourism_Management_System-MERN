import { Link } from 'react-router-dom';
import { PiRestuarantsOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import RestuarantsSingleCard from './RestuarantsSingleCard';

const RestuarantsCard = ({ restuarants }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {restuarants.map((item) => (
        <RestuarantsSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default RestuarantsCard;