import React from 'react';
import {TouchableOpacity, Image, StyleSheet, Text} from 'react-native';

export default (ListItem = ({
  item,
  style,
  onPress,
  index,
  imageKey,
  local,
  height,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(index)}>
      <Image
        style={[styles.image, style, {height: height}]}
        source={local ? item[imageKey] : {uri: item[imageKey]}}
      />
      <Text style={styles.desc}> {(index) +' : '+ item.author}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 230,
    resizeMode: 'stretch',
  },
});
