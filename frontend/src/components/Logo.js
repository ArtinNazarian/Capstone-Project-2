import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to='/' className="flex items-center space-x" >
            <img src="/logo.png" alt="logo" width={200} height={100} />
        </Link>
    )
}
