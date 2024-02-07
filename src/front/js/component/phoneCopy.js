import React, { useState, useEffect } from 'react'
import { Tooltip } from 'react-tooltip';

const PhoneCopy = () => {
    const [tooltipMsg, setTooltipMsg] = useState("Click para copiar el teléfono");
    const phone = '(+48) 123 456 789'

    useEffect(() => {
        const timer = setTimeout(() => {
            setTooltipMsg("Click para copiar el teléfono");
        }, 10000)
        return () => clearTimeout(timer)
    }, [tooltipMsg])

    function copyPhone() {
        navigator.clipboard.writeText(phone);
        setTooltipMsg("Teléfono copiado al portapapeles")
    }

    return (
        <>
            <i 
                id="phone-icon" 
                className="fa-solid fa-phone"
                onClick={() => copyPhone()}
            >  
            </i>
            <Tooltip 
                className="bg-primary rounded-3 fs-6 fw-normal"
                anchorSelect="#phone-icon"
                content={tooltipMsg}
            />
        </>
    )
}

export default PhoneCopy;