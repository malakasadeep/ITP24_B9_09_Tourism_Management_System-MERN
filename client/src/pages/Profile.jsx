import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { app } from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

export default function Profile() {

  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);
  console.log(filePerc);
  console.log(fileUploadError);

  // firebase storage rules
  //allow read;
  //allow write: if
  //request.resource.size < 2 * 1024 * 1024 &&
  //request.resource.contentType.matches('image/.*')

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  }, [file]);
  
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage , `avatars/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
    
    (error) => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) => setFormData({...formData, avatar:downloadURL}));
    },
    );
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input 
          onChange={(e)=>setFile(e.target.files[0])} 
          type='file' ref={fileRef} 
          hidden accept='image/*'
        />
        <img 
          onClick={()=>fileRef.current.click()} 
          src = {formData.avatar || currentUser.avatar}  
          alt='profile' 
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />

        <p className='text-sm self-center font-semibold'>
          {fileUploadError ?
              (<span className='text-red-700'>Error image upload</span>) :
              filePerc > 0 && filePerc < 100 ? 
                (<span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>) :
                filePerc === 100 ? 
                  (<span className='text-green-700'>Image upload successfully!!</span>) :
                  ("")
          }
        </p>

        <div className='flex flex-row '>
        <input type='text' placeholder='Fitst Name' id='firstname' className='border p-3 rounded-lg w-56'/>
        <input type='text' placeholder='Last Name' id = 'lastname' className='border p-3 rounded-lg w-56 ml-10 '/>
        </div>
        <input type='text' placeholder='Username' className='border p-3 rounded-lg' id='username'/>
        <input type='email' placeholder='Email' className='border p-3 rounded-lg' id='email'/>
        <input type='text' placeholder='Country' className='border p-3 rounded-lg' id='country'/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 text-yellow-200 rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>

      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>

    </div>
  )
}
