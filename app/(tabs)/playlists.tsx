import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
// @ts-ignore
import { useRouter } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import { usePlaylistStore } from "../../store/playlistStore";
import PlaylistCard from "../../components/PlaylistCard";
import { COLORS } from "../../constants/theme";

import { CreatePlaylistModal } from "../../components/playlists/modals";
import { styles } from "../../components/playlists/styles";

export default function PlaylistsScreen() {
  const router = useRouter();
  const { playlists, fetchPlaylists, createPlaylist } = usePlaylistStore();
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPlaylists();
    setRefreshing(false);
  };

  const handleCreatePlaylist = async () => {
    if (!playlistName.trim()) {
      Alert.alert("Error", "Please enter a playlist name");
      return;
    }

    setCreating(true);
    try {
      await createPlaylist({
        name: playlistName.trim(),
        description: playlistDescription.trim(),
      });
      await fetchPlaylists();
      setShowCreateModal(false);
      setPlaylistName("");
      setPlaylistDescription("");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create playlist");
    } finally {
      setCreating(false);
    }
  };

  const handleImportM3U = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        await FileSystem.readAsStringAsync(asset.uri);
        const importedPlaylistName = asset.name.replace(/\.[^/.]+$/, "");

        // ! M3U parsing todo
        await createPlaylist({
          name: importedPlaylistName,
          description: "Imported from M3U",
        });
        await fetchPlaylists();
        Alert.alert("Success", "Playlist created from M3U file");
      }
    } catch (error: any) {
      console.error("Error importing M3U:", error);
      Alert.alert("Error", "Failed to import M3U file");
    }
  };

  const handlePlaylistPress = (playlist: any) => {
    router.push(`/playlist/${playlist.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Playlists</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={handleImportM3U}>
            <MaterialIcons
              name="file-upload"
              size={24}
              color={COLORS.onSurfaceVariant}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.fabButton}
            onPress={() => setShowCreateModal(true)}
          >
            <MaterialIcons name="add" size={24} color={COLORS.onPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Playlists Grid */}
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <PlaylistCard
            playlist={item}
            onPress={() => handlePlaylistPress(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons
              name="queue-music"
              size={64}
              color={COLORS.onSurfaceVariant}
            />
            <Text style={styles.emptyTitle}>No playlists yet</Text>
            <Text style={styles.emptyText}>
              Create a playlist or import from M3U
            </Text>
          </View>
        }
      />

      <CreatePlaylistModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        playlistName={playlistName}
        setPlaylistName={setPlaylistName}
        playlistDescription={playlistDescription}
        setPlaylistDescription={setPlaylistDescription}
        creating={creating}
        onCreate={handleCreatePlaylist}
      />
    </SafeAreaView>
  );
}
