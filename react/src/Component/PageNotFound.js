import * as Bootstrap from "react-bootstrap"
import { IconContext } from "react-icons/lib";
import { MdOutlineErrorOutline } from "react-icons/md";


function PageNotFound(){
    return(
    <>
        <div className="page-notfound">
            <Bootstrap.Card>
                <Bootstrap.Card.Body>
                    <div className="text-center my-5">
                    <IconContext.Provider value={{size:"5em"}}>
                        <MdOutlineErrorOutline/>
                    </IconContext.Provider>
                        <h1 className="size404"><b>404</b></h1>
                        <h1 className="text-muted"><b>Error - Page Not Found</b></h1>
                    </div>
                </Bootstrap.Card.Body>
            </Bootstrap.Card>
        </div>
    </>
    )
}
export default PageNotFound