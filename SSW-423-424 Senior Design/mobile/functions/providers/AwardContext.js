import React, { useContext, createContext, useEffect, useState, useMemo } from "react";

import { UserContext } from "../../functions/providers/UserContext";



// all the possible awards a user can recieve
// accounted for
const firstEntry = {
    id: 1,
    description: "You filled out your first journal entry",
    image: "https://www.clipartqueen.com/image-files/koi-fish-drawing-color-2.png"
}

// accounted for
const starredEntry = {
    id: 2,
    description: "You starred a journal entry",
    image: "https://i.pinimg.com/originals/21/ee/a8/21eea8607b69cc3b790eab0e06d17592.png"
}

const tenEntries = {
    id: 3,
    description: "You created 10 journal entries",
    image: "https://www.freepnglogos.com/uploads/lotus-png/lotus-png-image-collections-are-available-for-9.png"
}

//accounted for
const privateEntry = {
    id: 4,
    description: "You made a journal entry private",
    image: "https://www.clipartqueen.com/image-files/koi-fish-drawing-color-2.png"
}

//accounted for
const privateAndStarredEntry = {
    id: 5,
    description: "You made a single journal entry\nprivate and starred it",
    image: "https://www.pinclipart.com/picdir/big/278-2781225_dragonfly-clipart-transparent-background-png-download.png"
}


export const awardsSchemes = {
    firstEntry, starredEntry, tenEntries, privateEntry, privateAndStarredEntry
}

export const useAwards = () => {
    const { awards } = useContext(UserContext);

    return {
        awards
    }
}

export const AwardsContext = createContext("");

export const Awards = ({ children }) => {
    const { awards } = useAwards();

    const awardsProvider = useMemo(() => ({ awards }), [
        awards
    ]);

    return (
        <AwardsContext.Provider value={awardsProvider}>
            {children}
        </AwardsContext.Provider>
    );
}




