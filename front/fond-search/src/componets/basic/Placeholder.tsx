

interface props {
    color?:string,
    width?:string,
    height?:string,
}

function Placeholder({color="bg-rose-800",width="w-30",height="h-8"}:props){

    return (
        <div className={`${color} ${width} ${height}`+" "+"animate-pulse cursor-wait"}></div>
    );
}

export default Placeholder