
interface prop {
    className?:string;
    children?:React.ReactNode;
}

function Card({className,children}:prop){
    return(
        <div className={"rounded-lg overflow-hidden shadow-lg bg-rose-200 border-rose-300 border"+" "+className}>
            {children}
        </div>
    );
}

export default Card;