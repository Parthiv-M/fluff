import Image from "next/image";

const Navbar = () => {
    return (
        <header className="flex gap-2 p-4 rounded-lg border border-lg border-neutral-300">
            <div className="flex items-center gap-2 font-bold">
                <a className="" href="/"><Image src={"/images/brand/fluff-logo.png"} height={20} width={20} alt="The Fluff Logo"/></a>
                <p>FLUFF</p>
            </div>
        </header>
    )
}

export default Navbar;