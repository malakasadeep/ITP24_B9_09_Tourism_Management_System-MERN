// import React from 'react'
// import BackButton from '../../components/VehicleManagement/BackButton'
// import axios from 'axios'
// import { useNavigate,useParams } from 'react-router-dom'
// import { useSnackbar } from 'notistack'

// function DeleteVehicle() {
//   const [loading, setloading] = React.useState(false);
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { enqueueSnackbar } = useSnackbar();
//   const haddleDeleteVehicle = () => {
//     setloading(true);
//     axios.delete(`/api/vehicle/delete/${id}`)
//       .then(() => {
//         setloading(false);
//         enqueueSnackbar('Vehicle Deleted', { variant: 'error' });
//         navigate('/Vehicle');
//       })
//       .catch((error) => {
//         setloading(false);
//         enqueueSnackbar('Vehicle Deleting failed', { variant: 'error' });
//         alert(error.message);
//         console.error(error);
//       });
//   }
//   return (
//         <>
//           <div>DeleteVehicle</div>
//           <div className='p-4'>
//             <BackButton />
//             <h1 className='text-3xl font-bold'>Delete Vehicle</h1>
//             <form className='flex flex-col sm:flex-row gap-4' onSubmit={haddleDeleteVehicle}>
//               <div className='my-4'>
//                 <button
//                   className='bg-red-500 text-white px-4 py-2 rounded-lg w-fit'
//                   onClick={haddleDeleteVehicle}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </form>
//           </div>
//         </>
//       )
//     }

//     export default DeleteVehicle;
