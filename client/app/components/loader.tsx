const Loader = ({ isFull }: { isFull?: boolean }) => {
    if (isFull)
        return <div className="w-full flex justify-center items-center p-5"><div className="loader"></div></div>;
    return <div className="loader"></div>;
}

export default Loader;