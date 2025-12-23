import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../../constants/theme";

export default function DemoBanner() {
  return (
    <View style={styles.demoBanner}>
      <MaterialIcons name="science" size={18} color={COLORS.onPrimary} />
      <Text style={styles.demoBannerText}>Demo Page - Fake Data</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  demoBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  demoBannerText: {
    fontFamily: "Inter_600SemiBold",
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.onPrimary,
  },
});
