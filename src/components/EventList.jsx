
import EventItem from './EventItem'
export default function EventList({events}) {
  return (
    <>
           {events.map(event => (
                
                  <EventItem key={event.id} event={event} />
                
            ))}
    </>
  )
}