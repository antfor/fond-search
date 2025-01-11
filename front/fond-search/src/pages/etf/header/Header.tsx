import Card from "src/componets/basic/Card"


const ETF = {
    cost: 0.49,
    yearly_fee: 0.45,
    trsnasction_cost: 0.04,
    maketcap: 24280,
    price: 26.230, 
    y1:15.02,
    y5:11.26,
    max: 23.44,
    dividend_policy:"ACC",
    currency: "EUR",
}

function Header(){
    return(
        <div className="mx-16 flex iitems-center justify-between">
           
            <div className="">
                <Headline/>
                <Info/>
            </div>
            <Trade/>
            
        </div>
    );
}

function infoCard(header:string, info:(string|number), color?:string){

    return(
        <div>
        <h5 className="text-slate-600">{header}</h5>
        <p className={"font-bold" + " " + color}>{info}</p>
        </div>
    );
}

const format = new Intl.NumberFormat('en-IN');
const formatEUR = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

function Info(){

    return(
        <div className="mb-2 gap-6 mx-2 flex">
        {infoCard("price:", formatEUR.format(ETF.price))}
        {infoCard("5 year:", ETF.y5 + " %",  ETF.y5 == 0 ? "":(ETF.y5 > 0 ? "text-emerald-500":"text-rose-500") )}
        {infoCard("maketcap:", format.format(ETF.maketcap) + "M €")}
        {infoCard("TER:", ETF.cost +"% p.a.", "text-rose-700")}
        
        </div>
    );
}

function Trade(){
    const classes="h-12 w-32 rounded-full"
    return(
        <div className="text-white size-fit self-center my-1 font-bold">
            <button className={"mr-2  bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-300"+" "+classes}>Buy</button>
            <button className={"bg-rose-500 hover:bg-rose-600 active:bg-rose-700 focus:outline-none focus:ring focus:ring-rose-300"+" "+classes}>Sell</button>
        </div>
    );
}

function Headline(){

    const name ="Franklin Emerging Markets UCITS ETF";
    const shortName="FLEX";
    return(
      <div className="mt-4 mb-2">
        <h1 className="text-3xl font-bold">{name}<span className="text-base text-rose-700"> ({shortName})</span>
        </h1>
      </div>
    );
}

export default Header;