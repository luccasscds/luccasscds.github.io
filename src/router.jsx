import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

export function AppRouters(){
    return(
        <Routes>
            <Route path="/" element={ <Home/> } />

            <Route path="*" element={ <h1>Not Found</h1> } />
        </Routes>
    );
}