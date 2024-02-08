import React, { useState, useEffect } from 'react'
import { Tooltip } from 'react-tooltip';

const EmailCopy = () => {
    const [tooltipMsg, setTooltipMsg] = useState("Click para copiar el email");
    const email = 'elrefugio@website-demo.com'

    useEffect(() => {
        const timer = setTimeout(() => {
            setTooltipMsg("Click para copiar el email");
        }, 10000)
        return () => clearTimeout(timer)
    }, [tooltipMsg])

    function copyEmail() {
        navigator.clipboard.writeText(email);
        setTooltipMsg("Email copiado al portapapeles")
    }

    return (
        <>
            <i 
                id="email-icon" 
                className="fa-regular fa-envelope"
                onClick={() => copyEmail()}
            >  
            </i>
            <Tooltip 
                className="bg-primary rounded-3 fs-6 fw-normal"
                anchorSelect="#email-icon"
                content={tooltipMsg}
            />
        </>
    )
}

export default EmailCopy