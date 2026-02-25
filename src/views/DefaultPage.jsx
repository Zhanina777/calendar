
import '../App.css'
import EventList from '../components/EventList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import myimage from '../assets/calenderimage.jpg';
import Searchfield from '../components/Searchfield';
import { useState, useEffect } from 'react';




const defaultEvents = [
  {id:1, title:'meeting', date:'2026-06-1', description: "about party in aarhus"},
  {id:2, title:'workshop', date:'2026-02-15', description: "designing a new app"},
  {id:3, title:'conference', date:'2026-02-18', description: "annual conference in copenhagen"}
];

function getStoredEvents() {
  const stored = JSON.parse(localStorage.getItem("events") || "[]");
  return stored.map((e, i) => ({ id: `local-${i+1000}`, ...e }));
}

function DefaultPage() {
  const [localEvents, setLocalEvents] = useState(getStoredEvents());

  //looks for information in webstorage, if there are some,
  //filterText is equal to this value, else it is an empty string
  const [filterText, setFilterText] = useState(()=>{
    const savedFilter = localStorage.getItem("filterText");
    return savedFilter ? savedFilter : "";
  });
  
  //everytime the filterText variable changes, the information
  //is saved in the webstorage, with the key "filterTextinStorage"
  useEffect(() => {
    localStorage.setItem("filterText", filterText);
  }, [filterText]);



  // Combine default and local events
  const allEvents = [...defaultEvents, ...localEvents];
  const sortedEvents = allEvents.slice().sort((a,b) =>
    a.date.localeCompare(b.date, 'en', {sensitivity: 'base'})
  );

  //filter events based on the user input (title or description)
  const filteredEvents = sortedEvents.filter(event =>
    event.title.toLowerCase().includes(filterText.toLowerCase()) ||
    event.description.toLowerCase().includes(filterText.toLowerCase())
  );

  // Listen for changes to localStorage (e.g., new events created)
  useEffect(() => {
    const onStorage = () => setLocalEvents(getStoredEvents());
    window.addEventListener('storage', onStorage);
    // Also update when component mounts
    onStorage();
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  //event handler function
  //change the value of variable "filtertext"
  //makes the component re-render
  //function handleInputChange(event) {
  
  const handleInputChange = (event) => {
    setFilterText(event.target.value);
  };

  return (
    <div>
      <img src={myimage} alt="calender" className="calendar-image" />
      
      <Searchfield handleinput={handleInputChange} filter={filterText} />
      <EventList events={filteredEvents} />
      
    </div>
  );
}

export default DefaultPage
