import React, { useContext } from "react";
import { View } from "react-native";

import { UserContext } from "../../functions/providers/UserContext";
import { ColorContext } from "../../functions/providers/ColorContext";
import { awardsSchemes } from "../../functions/providers/AwardContext";
import JournalList from "./JournalList";
import IconButton from "../../components/General/Button";
import styles from "../../styles/journalTabStyles";

export default function Private(props) {
  const { navigation } = props;
  const { color } = useContext(ColorContext);
  const { userID, journals, createJournal, createAward } = useContext(UserContext);

  return (
    <View style={{ ...styles.container, backgroundColor: color.background }}>
      <JournalList
        data={journals.filter((journal) => journal.private)}
        navigation={navigation}
      />
      <IconButton
        onPress={() => {
          if (journals.length >= 0){
            createAward(awardsSchemes.firstEntry, userID)
          }
          if (journals.length >= 9){
            createAward(awardsSchemes.tenEntries, userID)
          }
          createJournal(userID, (data) => {
            navigation.navigate("Journal", { data });
          });
        }}
        style={{}}
        icon="plus"
        size={36}
      />
    </View>
  );
}
