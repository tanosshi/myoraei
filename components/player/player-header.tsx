import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../../constants/theme";
import DropdownMenu from "../DropdownMenu";

interface PlayerHeaderProps {
  onBackPressed: () => void;
}

export default function PlayerHeader({ onBackPressed }: PlayerHeaderProps) {
  const menuItems = [
    {
      id: "delete-file",
      title: "Delete",
      icon: "delete",
      onPress: () => {},
    },
    {
      id: "add-to-playlist",
      title: "Add to Playlist",
      icon: "playlist-add",
      onPress: () => {},
    },
    {
      id: "share",
      title: "Share",
      icon: "share",
      onPress: () => {},
    },
    {
      id: "download",
      title: "Download",
      icon: "download",
      onPress: () => {},
    },
    {
      id: "Album",
      title: "Album",
      icon: "favorite",
      onPress: () => {},
    },
    {
      id: "song-info",
      title: "Track details",
      icon: "info",
      onPress: () => {},
    },
    {
      id: "sleep-timer",
      title: "Sleep Timer",
      icon: "timer",
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton} onPress={onBackPressed}>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={28}
          color={COLORS.onSurface}
        />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.headerLabel}>Playing from</Text>
        <Text style={styles.headerTitle}>Your Library</Text>
      </View>
      <DropdownMenu
        trigger={
          <View style={styles.headerButton}>
            <MaterialIcons
              name="more-vert"
              size={24}
              color={COLORS.onSurface}
            />
          </View>
        }
        menuItems={menuItems}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  headerButton: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerLabel: {
    fontFamily: "Inter_400Regular",
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontFamily: "Inter_500Medium",
    ...TYPOGRAPHY.titleSmall,
    color: COLORS.onSurface,
    marginTop: 2,
  },
});
