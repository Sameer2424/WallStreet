import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { Text, View } from '../components/Themed';
import OrderList from '../components/OrderList'

export default function Order() {
  return (
    <ScrollView>
      <Text style={styles.title}>Order History</Text>
      <OrderList/>
    </ScrollView>
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
