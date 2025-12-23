import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../../constants/theme";

export default function WebBanner() {
  return (
    <View style={styles.webBanner}>
      <MaterialIcons name="warning" size={18} color={COLORS.likedContainer} />
      <Text style={styles.webBannerText}>
        The web version is not properly maintained and issues will most likely
        not be fixed.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  webBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  webBannerText: {
    fontFamily: "Inter_600SemiBold",
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.onPrimary,
  },
});
