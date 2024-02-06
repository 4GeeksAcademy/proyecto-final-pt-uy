import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserContextProvider } from "./contexts/userContext.js";
import { AnimalsContextProvider } from "./contexts/animalsContext.js";

import LayoutWithNav from "./layoutWithNav.js";
import LayoutWithoutNav from "./layoutWithoutNav.js";
import LayoutDashAdmin from "./layoutDashAdmin.js";

import { Home } from "./pages/home";
import AboutUs from "./pages/AboutUs";
import AnimalList from "./pages/AnimalList";
import AnimalProfile from "./pages/AnimalProfile";
import ForgotPassword from "./pages/ForgotPassword";
import FormAddAnimal from "./component/Forms/FormAddAnimal.js";
import FormEditProfile from "./pages/FormEditProfile";
import FormTestimony from "./pages/FormTestimony";
import Profile from "./pages/Profile";
import Recomendations from "./pages/Recomendations";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewPassword from "./pages/NewPassword.js";
import TableAnimals from "./component/admin/tableAnimals.js";
import TableReviews from "./component/admin/tableTestimonials.js";
import TableUsers from "./component/admin/tableUsers.js";
import TableAdoptions from "./component/admin/tableAdoptions.js";
import AnimalInfo from "./component/admin/animalInfo.js";
import FormModifyAnimal from "./component/Forms/FormModifyAnimal.js";
import FormAddAdoption from "./component/Forms/FormAddAdoption.js";
import UserInfo from "./component/admin/userInfo.js";
import AdoptionInfo from "./component/admin/adoptionInfo.js";
import TestimonyInfo from "./component/admin/testimonyInfo.js";

import { BackendURL } from "./component/backendURL";


const App = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    //Alguno de los path tendra que ser editado a futuro para recibir parametros especificos como un ID
    return (
        <div>
            <React.StrictMode>
                <BrowserRouter basename={basename}>
                    <UserContextProvider>
                        <AnimalsContextProvider>
                            <Routes>

                                <Route element={<LayoutWithNav />}>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about" element={<AboutUs />} />
                                    <Route path="/animal-list" element={<AnimalList />} />
                                    <Route path="/animal-profile/:id" element={<AnimalProfile />} />
                                    <Route path="/edit-profile" element={<FormEditProfile />} />
                                    <Route path="/testimony" element={<FormTestimony />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/recomendations" element={<Recomendations />} />
                                    <Route path="*" element={<h1>Not found!</h1>} />
                                </Route>

                                <Route element={<LayoutWithoutNav />}>
                                    <Route path="/forgot-password" element={<ForgotPassword />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/new-password" element={<NewPassword />} />
                                </Route>

                                <Route element={<LayoutDashAdmin />} >
                                    <Route path="/add-animal" element={<FormAddAnimal />} />
                                    <Route path="/add-adoption" element={<FormAddAdoption />} />
                                    <Route path="/table-animals" element={<TableAnimals />} />
                                    <Route path="/table-reviews" element={<TableReviews />} />
                                    <Route path="/table-users" element={<TableUsers />} />
                                    <Route path="/table-adoptions" element={<TableAdoptions />} />
                                    <Route path="/animal-info/:id" element={<AnimalInfo />} />
                                    <Route path="/modify-animal/:id" element={<FormModifyAnimal />} />
                                    <Route path="/user-info/:id" element={<UserInfo />} />
                                    <Route path="/adoption-info/:id" element={<AdoptionInfo />} />
                                    <Route path="/testimony-info/:id" element={<TestimonyInfo />} />
                                </Route>
                            </Routes>
                        </AnimalsContextProvider>
                    </UserContextProvider>
                </BrowserRouter>
            </React.StrictMode>
        </div>
    );
};

export default App;