import Placeholder from "src/componets/basic/Placeholder";


const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

function InfoPage(){
    return(
        <div>
        <h4 className="font-bold">Description</h4>
        <p>
            {lorem}
        </p>
        <p>
            <Placeholder/>
        </p>
        </div>
    );
}

export default InfoPage;