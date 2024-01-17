import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import AboutUs from "./pages/AboutUs";
import Admin from "./pages/Admin";
import AnimalList from "./pages/AnimalList";
import AnimalProfile from "./pages/AnimalProfile";
import ForgotPassword from "./pages/ForgotPassword";
import FormAddAnimals from "./pages/FormAddAnimals";
import FormEditAnimals from "./pages/FormEditAnimals";
import FormEditProfile from "./pages/FormEditProfile";
import FormTestimony from "./pages/FormTestimony";
import Profile from "./pages/Profile";
import Recomendations from "./pages/Recomendations";
import Register from "./pages/Register";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Login from "./pages/Login";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;


     //Alguno de los path tendra que ser editado a futuro para recibir parametros especificos como un ID
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<AboutUs />} path="/about" />
                        <Route element={<Admin />} path="/admin" />
                        <Route element={<AnimalList />} path="/animal-list" />
                        <Route element={<AnimalProfile />} path="/animal-profile" />
                        <Route element={<ForgotPassword />} path="/forgot-password" />
                        <Route element={<FormAddAnimals />} path="/add-animals" />
                        <Route element={<FormEditAnimals />} path="/edit-animals" />
                        <Route element={<FormEditProfile />} path="/edit-profile" />
                        <Route element={<FormTestimony />} path="/testimony" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<Recomendations />} path="/recomendations" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
