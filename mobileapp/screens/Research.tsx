import * as React from 'react';
import { StyleSheet} from 'react-native';
import Constants from 'expo-constants';

import { Text, View } from '../components/Themed';
import Ticker from '../components/Ticker';

import {VictoryStack, VictoryBar, VictoryArea} from 'victory';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import {StackedBarChart} from 'react-native-chart-kit';

import { Dimensions } from "react-native";

export default function Research() {
/*
  const sampleData1=[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]
  const sampleData2=[{x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}]
  
  const sampleData3=[{x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}]


  const sampleData4=[{x: "a", y: 6}, {x: "b", y: 7}, {x: "c", y: 9}]
*/

  const screenWidth = Dimensions.get("window").width;

/*
        <View style = {styles.container}>
          <VictoryStack
            colorScale={["tomato", "orange", "gold"]}
          >
            <VictoryBar
              data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]}
            />
            <VictoryBar
              data={[{x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}]}
            />
            <VictoryBar
              data={[{x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}]}
            />
          </VictoryStack>

        </View>

        <View style={styles.container}>
         <VictoryStack
          events={[{
            childName: "all",
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    childName: "area-2",
                    target: "data",
                    mutation: (props) => ({ style: Object.assign({}, props.style, { fill: "gold" }) })
                  }, {
                    childName: "area-3",
                    target: "data",
                    mutation: (props) => ({ style: Object.assign({}, props.style, { fill: "orange" }) })
                  }, {
                    childName: "area-4",
                    target: "data",
                    mutation: (props) => ({ style: Object.assign({}, props.style, { fill: "red" }) })
                  }
                ];
              }
            }
          }]}
        >
          <VictoryArea name="area-1" data={sampleData1}/>
          <VictoryArea name="area-2" data={sampleData2}/>
          <VictoryArea name="area-3" data={sampleData3}/>
          <VictoryArea name="area-4" data={sampleData4}/>
        </VictoryStack>
        </View>


        */

       const data = {
        labels: ["Test1", "Test2"],
        legend: ["L1", "L2", "L3"],
        data: [
          [60, 60, 60],
          [30, 30, 60]
        ],
        barColors: ["lightgreen", "yellow", "orange"]
      };

      const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 25, 16, ${opacity})`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false // optional
      };
      
  return (
  <ScrollView >  
    <Text>Bar chart</Text> 
      <StackedBarChart
        style = {styles.container}
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />

    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8
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
