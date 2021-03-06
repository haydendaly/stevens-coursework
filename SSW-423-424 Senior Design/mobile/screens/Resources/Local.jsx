import React, { useContext } from "react";
import { View, FlatList } from "react-native";

import styles from "../../styles/resourceStyles";
import Resource from "./Resource";

import { ColorContext } from "../../functions/providers/ColorContext";

const categories = [
  {
    name: "Stress Relief",
    contents: [
      {
        title: "Kung Fu Tea",
        source: "536 Washington Street, Hoboken",
        url:
          "https://goo.gl/maps/bfadht7MFXAPRPmZ9",
        starred: false,
      },
      {
        title: "Tomahawks - Axe Throwing",
        source: "Sherman Ave, Jersey City",
        url: "https://goo.gl/maps/dPkGNBcx1p9SZhAPA",
        starred: true,
      },
      {
        title: "Screaming into the Void",
        source: "anywhere you want",
        url:
          "https://screamintothevoid.com/",
        starred: false,
      },
    ],
  },
  {
    name: "Exercise",
    contents: [
      {
        title: "Planet Fitness",
        source: "605 Washington Street, Hoboken",
        url:
          "https://goo.gl/maps/ihCZvtSVtnuyFG2V7",
        starred: false,
      },
      {
        title: "The Gravity Vault - Rock Climbing",
        source: "1423 Clinton Street, Hoboken",
        url:
          "https://g.page/gravityvaulthoboken?share",
        starred: false,
      },
    ],
  },
  {
    name: "Meditation",
    contents: [
      {
        title: "Trader Joe's",
        source: "1350 Willow Ave, Hoboken",
        url: "https://goo.gl/maps/WCYS4m6FmcwK9om87",
        starred: false,
      },
    ],
  },
];

export default function Local(props) {
  const { color } = useContext(ColorContext);

  return (
    <View style={{ ...styles.container, backgroundColor: color.background }}>
      <FlatList //flatlist of categories
        style={{ width: "100%" }}
        contentContainerStyle={{
          width: "95%",
          marginLeft: "2.5%",
          paddingBottom: 20,
        }}
        data={categories}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          return <Resource item={item} />;
        }}
      />
    </View>
  );
}
