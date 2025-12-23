import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from "../../constants/theme";

interface PlaylistDemo {
  id: string;
  artwork: string;
}

interface PlaylistsRowProps {
  playlists: PlaylistDemo[];
}

export default function PlaylistsRow({ playlists }: PlaylistsRowProps) {
  if (!playlists || playlists.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Your Playlists</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {playlists.map((playlist) => (
          <View key={playlist.id} style={styles.playlistItem}>
            <Image
              source={{ uri: playlist.artwork }}
              style={styles.playlistImage}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Inter_600SemiBold",
    ...TYPOGRAPHY.titleMedium,
    color: COLORS.onSurface,
    marginBottom: SPACING.md,
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  playlistItem: {
    marginRight: 16,
  },
  playlistImage: {
    width: 102,
    height: 102,
    borderRadius: 24,
    backgroundColor: "#eee",
  },
});
