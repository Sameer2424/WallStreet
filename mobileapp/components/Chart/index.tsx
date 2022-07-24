import * as React from 'react';
import { StyleSheet } from 'react-native';

import {View, Text} from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryZoomContainer, VictoryArea } from 'victory';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


import { Dimensions } from "react-native";

export default function Chart(props) {

/*

      <VictoryChart>
      <VictoryArea
        style={{ data: { fill: "#c43a31" } }}
        data={props.data}
      />
      </VictoryChart>


      <VictoryLine
        containerComponent={
        <VictoryZoomContainer/>}
          data={props.data}
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          />


*/

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Price over months"] // optional
};
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};



return (
    <View>
      <Text style={styles.title}> Price vs Time Chart</Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />


   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
