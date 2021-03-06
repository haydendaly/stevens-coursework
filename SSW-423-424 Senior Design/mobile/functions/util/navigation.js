import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import _ from "lodash";

const noNavScreens = ["Journal", "Track", "TrackJournal"];

const showNav = navigation => {
    let curr = navigation.dangerouslyGetState();
    while (_.has(curr, "state") || (_.has(curr, "index") && _.has(curr, "routes"))) {
        if (_.has(curr, "state")) {
            curr = curr.state
        } else {
            curr = curr.routes[curr.index];
        }
    }
    return !noNavScreens.includes(curr.name);
}

exports.showNav = showNav;
