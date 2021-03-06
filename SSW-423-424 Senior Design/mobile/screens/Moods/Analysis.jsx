import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { ColorContext } from "../../functions/providers/ColorContext";
import { UserContext } from "../../functions/providers/UserContext";
import IconButton from "../../components/General/Button";
import generalStyles from "../../styles/generalStyles";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const windowWidth = Dimensions.get("window").width;

const graphTypes = [
  {
    name: "anxiety",
  },
  {
    name: "stress",
  },
  {
    name: "energy",
  },
  {
    name: "activity",
  },
];

const now = dayjs().local();

const tempData = [
  {
    anxiety: Math.round(Math.random() * 10),
    stress: Math.round(Math.random() * 10),
    energy: Math.round(Math.random() * 10),
    activity: Math.round(Math.random() * 10)
  },
  {
    anxiety: Math.round(Math.random() * 10),
    stress: Math.round(Math.random() * 10),
    energy: Math.round(Math.random() * 10),
    activity: Math.round(Math.random() * 10)
  },
  {
    anxiety: Math.round(Math.random() * 10),
    stress: Math.round(Math.random() * 10),
    energy: Math.round(Math.random() * 10),
    activity: Math.round(Math.random() * 10)
  },
  {
    anxiety: Math.round(Math.random() * 10),
    stress: Math.round(Math.random() * 10),
    energy: Math.round(Math.random() * 10),
    activity: Math.round(Math.random() * 10)
  },
  {
    anxiety: Math.round(Math.random() * 10),
    stress: Math.round(Math.random() * 10),
    energy: Math.round(Math.random() * 10),
    activity: Math.round(Math.random() * 10)
  },
  {
    anxiety: Math.round(Math.random() * 10),
    stress: Math.round(Math.random() * 10),
    energy: Math.round(Math.random() * 10),
    activity: Math.round(Math.random() * 10)
  },
  {
    anxiety: Math.round(Math.random() * 10),
    stress: Math.round(Math.random() * 10),
    energy: Math.round(Math.random() * 10),
    activity: Math.round(Math.random() * 10)
  }
]

export default function Analysis(props) {
  const { navigation } = props;
  const { color } = useContext(ColorContext);
  const { moods } = useContext(UserContext);

  const [graphData, setGraphData] = useState(tempData)

  useEffect(() => {
    const formattedMoods = moods.map(o => ({ ...o, day: dayjs(o.timeCreated).format('DDMMYYYY')}))
    let moodsDict = {};
    
    formattedMoods.forEach(o => {
      moodsDict[o.day] = o
    })

    let newGraphData = [
      dayjs(now).subtract(6, 'day').format('DDMMYYYY'),
      dayjs(now).subtract(5, 'day').format('DDMMYYYY'),
      dayjs(now).subtract(4, 'day').format('DDMMYYYY'),
      dayjs(now).subtract(3, 'day').format('DDMMYYYY'),
      dayjs(now).subtract(2, 'day').format('DDMMYYYY'),
      dayjs(now).subtract(1, 'day').format('DDMMYYYY'),
      dayjs(now).format('DDMMYYYY')
    ]

    newGraphData = newGraphData.map(o => {
      if (o in moodsDict) {
        return moodsDict[o]
      }
      return {
        anxiety: 5,
        stress: 5,
        energy: 5,
        activity: 5
      }
    })

    setGraphData(graphData)

  }, [moods])
  // const [interval, setInterval] = useState(5); //useState? set weekly/monthly
  // weekly - 7 days
  // monthly - 6 months or diff btwn first and last entry if < 6, use avg of entries from that month

  // moods.map((mood) => ({
  //   ...mood,
  //   difference: new Date().toDateString()-mood.timeCreated
  // }))

  //c/p for reference
//   moodsData.map((mood) => ({
//     ...mood,
//     timeCreated: mood.timeCreated
//     // 4EB: Checks whether timestamp for timeCreated exists
//         ? mood.timeCreated
//         : getTimestamp()
// }))



  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      <FlatList
        data={graphTypes}
        style={{width: '100%'}}
        contentContainerStyle={{ marginTop: 5, paddingBottom: 20, justifyContent: 'center', marginLeft: Dimensions.get("window").width*.0375 }}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={{ fontSize: 18, margin: 7, color: color.primaryText }}>{item.name}</Text>
              <View style={[generalStyles.shadow, styles.graph, { backgroundColor: color.primary, shadowColor: color.shadow }]}>
                <LineChart
                  data={{
                    // EB NOTES: Can get the correct day of week label for each day for past 7 days using dayjs(now).subtract calls for each day
                    labels: [
                      dayjs(now).subtract(6, 'day').format('ddd'),
                      dayjs(now).subtract(5, 'day').format('ddd'),
                      dayjs(now).subtract(4, 'day').format('ddd'),
                      dayjs(now).subtract(3, 'day').format('ddd'),
                      dayjs(now).subtract(2, 'day').format('ddd'),
                      dayjs(now).subtract(1, 'day').format('ddd'),
                      dayjs(now).format('ddd')
                    ],
                    datasets: [
                      {
                        data: graphData.map(o => o[item.name])
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width*.925 } // from react-native
                  height={220}
                  yAxisMax={10}
                  fromZero={true}
                  yAxisInterval={2} // optional, defaults to 1
                  chartConfig={{
                    backgroundGradientFrom: color.primary,
                    backgroundGradientTo: color.primary,
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => color.inactive,
                    labelColor: (opacity = 1) => color.primaryText,
                    style: {
                      borderRadius: 16,
                      backgroundColor: "none",
                    },
                    propsForDots: {
                      r: "10",
                      strokeWidth: "4",
                      stroke: "#006400",
                      fill: "green"
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              </View>
            </View>
          );
        }}
      />
      <IconButton
        onPress={() => navigation.navigate("Track")}
        icon="plus"
        size={36}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  graph: {
    width: windowWidth * 0.925,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
});