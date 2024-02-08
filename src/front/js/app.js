import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserContextProvider, useUserContext } from "./contexts/userContext.js";
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
import TermsAndConditions from "./pages/TermsAndConditions.js";
import PrivacyPolicies from "./pages/PrivacyPolicies.js";
import Donate from "./pages/Donate.js";
import NotFound from "./pages/NotFound.js";
import Prueba from "./pages/Prueba.js";

import { BackendURL } from "./component/backendURL";


const App = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    const {store: {user}} = useUserContext();


    return (
        <div>
            <BrowserRouter basename={basename}>
                <Routes>
                    <Route element={<LayoutWithNav />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/animal-list" element={<AnimalList />} />
                        <Route path="/animal-profile/:id" element={<AnimalProfile />} />
                        {
                            user.id &&
                            <>
                            <Route path="/edit-profile" element={<FormEditProfile />} />
                            <Route path="/testimony/:adoptionId" element={<FormTestimony />} />
                            <Route path="/profile" element={<Profile />} />
                            </>
                        }
                        <Route path="/recomendations" element={<Recomendations />} />
                        <Route path="/donate" element={<Donate />} />
                        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                        <Route path="/privacy-policies" element={<PrivacyPolicies />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>

                    <Route element={<LayoutWithoutNav />}>
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/new-password" element={<NewPassword />} />
                    </Route>

                    {
                        user.id && user.role === "admin" &&
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
                    }
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;