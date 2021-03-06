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
        title: "8 ways to calm anxious thoughts",
        source: "Medical News Today",
        url: "https://www.medicalnewstoday.com/articles/326115",
        starred: true,
      },
      {
        title: "8 Breathing Exercises to Try When You Feel Anxious",
        source: "Healthline",
        url:
          "https://www.healthline.com/health/breathing-exercises-for-anxiety",
        starred: false,
      },
      {
        title: "50 Surprisingly Simple Coping Mechanisms To Chase Away Anxiety",
        source: "Thought Catalog",
        url:
          "https://thoughtcatalog.com/january-nelson/2019/01/50-surprisingly-simple-coping-mechanisms-to-chase-away-anxiety/",
        starred: false,
      },
    ],
  },
  {
    name: "Motivation",
    contents: [
      {
        title: "Woo you can do it",
        source: "The Sportsball Motivator",
        url:
          "https://www.google.com/search?sxsrf=ALeKk00HdKw6tszuba8PcHJP2gxt40ZlqQ%3A1604820779370&source=hp&ei=K5-nX8GaEPKg_QaZy4ywBQ&q=sports&oq=sports&gs_lcp=CgZwc3ktYWIQAzIECAAQQzIECAAQQzIECAAQQzIECAAQQzIHCAAQsQMQQzIECAAQQzIECAAQQzIECAAQQzIKCC4QxwEQowIQQzIECAAQQzoECCMQJzoFCAAQkQI6CAgAELEDEIMBOggILhCxAxCDAToCCAA6BAguECc6BwguECcQkwI6BAguEENQ7ARYjAtg9wxoAHAAeACAAaUCiAGDCpIBBTAuMy4zmAEAoAEBqgEHZ3dzLXdpeg&sclient=psy-ab&ved=0ahUKEwiB3Oejt_LsAhVyUN8KHZklA1YQ4dUDCAk&uact=5",
        starred: false,
      },
    ],
  },
  {
    name: "Meditation",
    contents: [
      {
        title: "Ohmmmmmmm",
        source: "Resistance is Futile",
        url: "https://en.wikipedia.org/wiki/Ohm",
        starred: false,
      },
    ],
  },
  {
    name: "Yoga",
    contents: [
      {
        title: "16 Yoga Poses to Find Instant Calm and Peace",
        source: "yoga journal",
        url:
          "https://www.yogajournal.com/practice/16-yoga-poses-find-instant-calm-peace",
        starred: false,
      },
    ],
  },
];

export default function General(props) {
  const { color } = useContext(ColorContext);

  return (
    <View style={{ ...styles.container, backgroundColor: color.background}}>
      <FlatList //flatlist of categories
        style={{ width: "100%" }}
        contentContainerStyle={{ width: "95%", marginLeft: "2.5%", paddingBottom: 20 }}
        data={categories}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          return <Resource item={item} />;
        }}
      />
    </View>
  );
}
