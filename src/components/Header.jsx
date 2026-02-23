import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            
            <nav>
                <Link to="/">Home</Link>&nbsp;&nbsp;
                <Link to="/create">Create event</Link>
            </nav>
        </header>
    )
}