import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';

import { useUserContext } from "../../contexts/userContext";
import { formatAdoptionData } from "../../../utils/fromattingFunctions";
import { getAdoptionsList } from "../../../client-API/backendAPI";

import UnderConstructionMsg from "../messages/underConstructionMsg";
import Pagination from '../pagination';
import IsLoadingMsg from "../messages/isLoadingMsg";
import ErrorMsg from "../messages/errorMsg";
import NotFoundMsg from "../messages/notFoundMsg";

const initialPagination = {
    limit: 12,
    offset: 0,
    totalPages: 1,
    currentPage: 1,
    totalAdoptions: 0
}


export default function TableReviews() {

    return (
        <div>
            <h1 className="fs-4 fw-semibold">Testimonios</h1>
            <UnderConstructionMsg />
        </div>
    );
}