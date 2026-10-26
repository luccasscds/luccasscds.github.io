import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Videos } from "./pages/Videos";
import { Blog } from "./pages/Blog";

export function AppRouters(){
    return(
        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/videos" element={ <Videos/> } />
            <Route path="/blog" element={ <Blog/> } />
            <Route path="/blog/:postId" element={ <Blog/> } />

            <Route path="*" element={ <h1>Not Found</h1> } />
        </Routes>
    );
}