'use client'

import React, { useEffect, useState } from "react";

export class LoadingScreenHelper {
    static show = false;
}

export const LoadingScreen = () => {
    const [show, setShow] = useState(LoadingScreenHelper.show);
    
    useEffect(() => setShow(LoadingScreenHelper.show), [LoadingScreenHelper.show]);

    if (!show) return <></>;
    return <div className='loading-screen'>
        <h5>Loading...</h5>
    </div>
}