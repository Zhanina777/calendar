export default function EventItem({event}) {
  const today = new Date().toISOString().split('T')[0];
  return (
    <section>
      <h3>{today === event.date ? "Today: " :event.date>today ? "Upcoming: " : "Historic : "}{event.title}</h3>  
      <p>{event.date}</p>
      <p>{event.description}</p>
    </section>
  )
}
