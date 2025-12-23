import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS } from "../../constants/theme";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  uri: string;
  artwork?: string;
  is_liked: boolean;
  play_count: number;
}

interface BottomActionsProps {
  song?: Song;
  onLike?: () => void;
}

export default function BottomActions({ song, onLike }: BottomActionsProps) {
  return (
    <View style={styles.bottomActions}>
      <TouchableOpacity style={styles.bottomButton}>
        <MaterialCommunityIcons
          name="playlist-music"
          size={24}
          color={COLORS.onSurfaceVariant}
        />
      </TouchableOpacity>
      {song && onLike && (
        <TouchableOpacity style={styles.bottomButton} onPress={onLike}>
          <MaterialIcons
            name={song.is_liked ? "favorite" : "favorite-border"}
            size={24}
            color={song.is_liked ? COLORS.liked : COLORS.onSurfaceVariant}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.bottomButton}>
        <Feather name="plus" size={20} color={COLORS.onSurfaceVariant} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg + 9,
    marginTop: SPACING.xxl,
  },
  bottomButton: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});
