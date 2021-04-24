import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {
  Entypo as EIcon,
  FontAwesome as FAIcon,
  Feather as FEIcon,
} from "@expo/vector-icons/";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
  renderers,
} from "react-native-popup-menu";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import styles from "../../styles/journalStyles";
import { UserContext } from "../../functions/providers/UserContext";
import { ColorContext } from "../../functions/providers/ColorContext";
import { awardsSchemes } from "../../functions/providers/AwardContext";
const { SlideInMenu } = renderers;

const now = dayjs().local().format('DDMMYYYY');

export default function Journal(props) {
  const { navigation, route } = props;
  const { data } = route.params;
  const {
    userID,
    updateJournal,
    starJournal,
    lockJournal,
    deleteJournal,
    createAward
  } = useContext(UserContext);
  const { color } = useContext(ColorContext);

  const [title, setTitle] = useState(data.title);
  const [body, setBody] = useState(data.body);
  const titleRef = useRef(title);
  const bodyRef = useRef(body);

  // Ugly workaround  ¯\_(ツ)_/¯
  useEffect(() => {
    bodyRef.current = body;
  }, [body]);
  useEffect(() => {
    titleRef.current = title;
  }, [title]);

  // Called when Journal is closed
  // componentWillUnmount equivalent https://stackoverflow.com/questions/55139386/componentwillunmount-with-react-useeffect-hook
  useEffect(() => {
    return () => {
      if (titleRef.current !== '' || bodyRef.current !== '') {
        updateJournal(userID, data.id, titleRef.current, bodyRef.current);
      }
    };
  }, [props.current]);

  return (
    <MenuProvider style={{backgroundColor: color.background}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={styles.container}
        >
          <View style={styles.topnav}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FAIcon name="chevron-left" color={color.inactive} size={32} />
            </TouchableOpacity>
            <View style={styles.topnavLeft}>
              {now == dayjs(data.timeCreated).format('DDMMYYYY') && (
                <TouchableOpacity
                  onPress={() => navigation.navigate("TrackJournal")}
                >
                  <FEIcon name="smile" color={color.inactive} size={32} />
                </TouchableOpacity>
              )}
              <Menu name="numbers" renderer={SlideInMenu}>
                <MenuTrigger onPress={Keyboard.dismiss}
                  customStyles={{ triggerOuterWrapper: styles.trigger }}
                >
                  <EIcon
                    style={{ marginTop: -5 }}
                    name="dots-three-vertical"
                    size={36}
                    color={color.inactive}
                  />
                </MenuTrigger>
                <MenuOptions style={{backgroundColor: color.primary}}>
                  <MenuOption
                    onSelect={() => {
                      createAward(awardsSchemes.starredEntry, userID),
                      starJournal(userID, data.id, !data.starred),
                        alert(data.starred ? `Unstarred` : "Starred"),
                        (data.starred = !data.starred);
                      if (data.starred && data.private){
                        createAward(awardsSchemes.privateAndStarredEntry, userID);
                      } 
                    }}
                    customStyles={{ optionText: [styles.bluetext] }}
                    value={1}
                    text={data.starred ? "Unstar" : "Star"}
                  />
                  <MenuOption
                    onSelect={() => {
                      createAward(awardsSchemes.privateEntry, userID),
                      lockJournal(userID, data.id, !data.private),
                        alert(data.private ? `Open` : "Private"),
                        (data.private = !data.private);
                      if (data.starred && data.private){
                        createAward(awardsSchemes.privateAndStarredEntry, userID);
                      } 
                    }}
                    customStyles={{ optionText: [styles.bluetext] }}
                    value={2}
                    text={data.private ? "Unlock" : "Lock"}
                  />
                  <MenuOption
                    onSelect={() => {
                      deleteJournal(userID, data.id),
                        alert(`Deleted`),
                        navigation.goBack();
                    }}
                    customStyles={{ optionText: [styles.redtext] }}
                    value={3}
                    text="Delete"
                  />
                </MenuOptions>
              </Menu>
            </View>
          </View>
          <View style={styles.middle}>
            <TextInput
              keyboardType="default"
              placeholder="Journal Entry Title"
              placeholderTextColor={color.inactive}
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: color.primaryText
              }}
              value={title}
              onChangeText={setTitle}
            />
            {/* EB: two constants are aqcuired from firebase storage, simply displays two timestamps in journal UI */}
            <Text style={{...styles.regtext, color: color.primaryText}}>
              {"Created: " +
                dayjs(data.timeCreated).format("dddd MM/DD/YY hh:mm a")}
            </Text>
            <Text style={{...styles.regtext, color: color.primaryText}}>
              {"Updated: " +
                dayjs(data.lastUpdated).format("dddd MM/DD/YY hh:mm a")}
            </Text>
          </View>
          <View style={styles.notesui}>
            <TextInput
              keyboardType="default"
              placeholder="Type your journal entry here..."
              placeholderTextColor={color.inactive}
              multiline={true}
              style={{
                fontSize: 20,
                width: "100%",
                height: "100%",
                color: color.primaryText
              }}
              value={body}
              onChangeText={setBody}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </MenuProvider>
  );
}
