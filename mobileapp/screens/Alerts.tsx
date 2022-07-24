import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { Text, View } from '../components/Themed';
import AlertList from '../components/AlertList'

export default function Alerts() {
  return (
<ScrollView >
      <AlertList/>
    </ScrollView>
  );
}

