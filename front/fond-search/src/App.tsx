import DefaultNav from "./componets/navbar/DeafultNav"
import Geo from "./pages/etf/graph/geo/Geo"
import Card from "./componets/basic/Card"
import {Etf} from "./pages/etf/graph/compare/ETF"
import Header from "./pages/etf/header/Header"

function Headline(){

  const name ="Franklin Emerging Markets UCITS ETF";
  const shortName="FLEX";
  return(
    <div className="mx-16 my-4">
      <h1 className="text-3xl font-bold">{name}<span className="text-base text-rose-700"> ({shortName})</span>
      </h1>
    </div>
  );
}

function App() {
  const width = 300;
  const aspect = 1.8;//2.0;//1.8;
  return (
    <div>
      <DefaultNav/>
        <Header/>
        <div className="grid grid-cols-12 gap-4 min-h-32 mx-16">
          <div className="flex justify-center col-span-3">
            <Card className="size-full p-4"> </Card>
          </div>
          <div className="col-span-6 ">
            <Card className="size-full p-4">
             <Etf className="size-full rounded-lg overflow-hidden" /> 
            </Card>
          </div>
          <div className="col-span-3">
            <Card className="size-full p-4 flex flex-col items-center">
             <Geo className="" width={width} height={width/aspect} />
             <div className="size-5 bg-orange-500" />
            </Card>
          </div>
        </div>
    </div>
  )
}
//
//
/*
<Etf className="col-span-4 size-auto"/>
<div className="col-span-4"/>
<Geo className="col-span-4 size-auto" width={width} height={width/aspect}/>
*/
export default App
