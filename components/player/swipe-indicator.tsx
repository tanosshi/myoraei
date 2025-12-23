import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export default function SwipeIndicator() {
  return (
    <View style={styles.swipeIndicator}>
      <View style={styles.swipeHandle} />
    </View>
  );
}

const styles = StyleSheet.create({
  swipeIndicator: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 4,
  },
  swipeHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.outlineVariant,
  },
});
