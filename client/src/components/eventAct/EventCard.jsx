import React from 'react'
import { Link } from 'react-router-dom'

export const EventCard = ({evnt}) => {
  return (
    <div>
        <Link to={`/events/${evnt._id}`}>
            
        </Link>

    </div>
  )
}
