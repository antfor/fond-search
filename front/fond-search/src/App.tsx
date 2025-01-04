import DefaultNav from "./componets/navbar/DeafultNav"
import Geo from "./componets/graph/geo/Geo"
import {Etf} from "./componets/graph/etf/ETF"
import "./App.css"

function App() {
  const height = 300;
  const aspect = 1.8;//2.0;//1.8;
  return (
    <div>
      <DefaultNav/>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div className="flex justify-between">
        <Etf className="size-auto"/>
        <Geo width={height*aspect} height={height}/>
      </div>
      <Etf className="size-auto"/>
    </div>
  )
}
//
//
export default App
