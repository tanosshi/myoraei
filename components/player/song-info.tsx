import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme";

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

interface SongInfoProps {
  song: Song;
}

export default function SongInfo({ song }: SongInfoProps) {
  return (
    <View style={styles.songInfo}>
      <View style={styles.titleContainer}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.songArtist} numberOfLines={1}>
          {song.artist}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  songInfo: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
  },
  titleContainer: {
    alignItems: "center",
  },
  songTitle: {
    fontFamily: "Inter_600SemiBold",
    ...TYPOGRAPHY.headlineSmall,
    color: COLORS.onSurface,
  },
  songArtist: {
    fontFamily: "Inter_400Regular",
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
  },
});
