import Link from "next/link";

export default function Navbar(){
    return <nav className="w-full h-full flex justify-between items-center">
        <div>
            <Link href="/" className="text-lg font-bold">Tracker</Link>
        </div>
    </nav>
}