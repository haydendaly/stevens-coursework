import React, { useContext, createContext, useEffect, useState, useMemo } from "react";

import { UserContext } from "../../functions/providers/UserContext";



// all the possible awards a user can recieve
// accounted for
const firstEntry = {
    id: 1,
    description: "You filled out your first journal entry",
    image: "https://firebasestorage.googleapis.com/v0/b/hodas-f14c5.appspot.com/o/lily3.png?alt=media&token=1521c502-162f-4b31-a630-ca6fee02ec47"
}

// accounted for
const starredEntry = {
    id: 2,
    description: "You starred a journal entry",
    image: "https://firebasestorage.googleapis.com/v0/b/hodas-f14c5.appspot.com/o/lily1.png?alt=media&token=4372ab5b-cc32-440e-932c-a80e1b04affe"
}

const tenEntries = {
    id: 3,
    description: "You created 10 journal entries",
    image: "https://firebasestorage.googleapis.com/v0/b/hodas-f14c5.appspot.com/o/lily2.png?alt=media&token=3c87cf74-0d7e-4a15-8184-edeea9ed30d7"
}

//accounted for
const privateEntry = {
    id: 4,
    description: "You made a journal entry private",
    image: "https://firebasestorage.googleapis.com/v0/b/hodas-f14c5.appspot.com/o/lily5.png?alt=media&token=9724a6a4-432d-40d6-800c-b4eedb555c72"
}

//accounted for
const privateAndStarredEntry = {
    id: 5,
    description: "You made a single journal entry private and starred it",
    image: "https://firebasestorage.googleapis.com/v0/b/hodas-f14c5.appspot.com/o/lily4.png?alt=media&token=7808eaf7-48e8-4bf6-bf86-9a13e9112a78"
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




