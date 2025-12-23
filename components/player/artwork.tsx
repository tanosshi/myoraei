import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
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

interface ArtworkProps {
  song: Song;
  artworkSize: number;
}

export default function Artwork({ song, artworkSize }: ArtworkProps) {
  return (
    <View style={styles.artworkContainer}>
      {song.artwork ? (
        <Image
          source={{ uri: song.artwork }}
          style={[styles.artwork, { width: artworkSize, height: artworkSize }]}
          contentFit="cover"
        />
      ) : (
        <View
          style={[
            styles.artwork,
            styles.artworkPlaceholder,
            { width: artworkSize, height: artworkSize },
          ]}
        >
          <MaterialIcons name="music-note" size={80} color={COLORS.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  artworkContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: SPACING.lg,
  },
  artwork: {
    borderRadius: RADIUS.xl,
  },
  artworkPlaceholder: {
    backgroundColor: COLORS.surfaceContainerHigh,
    justifyContent: "center",
    alignItems: "center",
  },
});
