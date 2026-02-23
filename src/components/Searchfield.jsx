export default function Searchfield({ handleinput, filter }) {
    return (
        <input type="search" placeholder="type for events" onChange={handleinput} value={filter} />
    );
}
