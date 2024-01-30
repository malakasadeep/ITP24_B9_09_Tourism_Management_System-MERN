import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({packagee}) {

    const [provider, setProvider] = useState(null);
    const [message, setMessage] = useState('');
    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchProvider = async () => {
            try {
                const res = await fetch(`/api/user/${packagee.userRef}`)
                const data = await res.json();
                setProvider(data);
                console.log(provider.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProvider();
    }, [packagee.userRef])

  return (
    <>
        {provider && (
            <div className='flex flex-col gap-2'>
                <p className='text-xl text-center text-sky-950'>Contact <span className='font-semibold'>{provider.firstname.toLowerCase() || provider.username.toLowerCase()}</span>{' '} for {' '} <span className='font-semibold'>{packagee.title.toLowerCase()}</span></p>
                <textarea name='message' id='message' rows='4' value={message} onChange={onChange} placeholder='Enter Your message here...' className='w-full border p-3 rounded-lg'></textarea>

                <Link to={`mailto:${provider.email}?subject=Regarding ${packagee.name}&body=${message}`} className='bg-sky-800 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'>Send Message</Link>

            </div>
        )}
    </>
  )
}
