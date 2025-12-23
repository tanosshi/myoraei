import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme";

export default function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <MaterialIcons
        name="library-music"
        size={64}
        color={COLORS.onSurfaceVariant}
      />
      <Text style={styles.emptyTitle}>No music yet</Text>
      <Text style={styles.emptyText}>Go to Songs tab to add music</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyTitle: {
    fontFamily: "Inter_600SemiBold",
    ...TYPOGRAPHY.titleLarge,
    color: COLORS.onSurface,
    marginTop: SPACING.md,
  },
  emptyText: {
    fontFamily: "Inter_400Regular",
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.onSurfaceVariant,
    marginTop: SPACING.sm,
  },
});
