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
  const [undefinedIndices, setUndefinedIndices] = useState([])

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

    let noDataIndices = []

    for (let i = 0; i < newGraphData.length; i++) {
      if (newGraphData[i] in moodsDict) {
        newGraphData[i] = moodsDict[newGraphData[i]]
      } else {
        noDataIndices.push(i);
        newGraphData[i] = {
          anxiety: 5,
          stress: 5,
          energy: 5,
          activity: 5
        }
      }
    }

    setUndefinedIndices(noDataIndices)
    setGraphData(newGraphData)

  }, [moods])

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
              <Text style={{ fontSize: 18, margin: 7, color: color.primaryText, textTransform: 'capitalize' }}>{item.name}</Text>
              <View style={[generalStyles.shadow, styles.graph, { backgroundColor: color.primary, shadowColor: color.shadow }]}>
                <LineChart
                  data={{
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
                  hidePointsAtIndex={undefinedIndices}
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