import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { COLORS } from "../../constants/theme";
import { styles } from "./styles";

type CreatePlaylistModalProps = {
  show: boolean;
  onClose: () => void;
  playlistName: string;
  setPlaylistName: (value: string) => void;
  playlistDescription: string;
  setPlaylistDescription: (value: string) => void;
  creating: boolean;
  onCreate: () => void;
};

export function CreatePlaylistModal({
  show,
  onClose,
  playlistName,
  setPlaylistName,
  playlistDescription,
  setPlaylistDescription,
  creating,
  onCreate,
}: CreatePlaylistModalProps) {
  return (
    <Modal
      visible={show}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>New playlist</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="edit"
              size={24}
              color={COLORS.onSurfaceVariant}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Playlist name"
              placeholderTextColor={COLORS.onSurfaceVariant}
              value={playlistName}
              onChangeText={setPlaylistName}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="description"
              size={24}
              color={COLORS.onSurfaceVariant}
            />
            <TextInput
              style={[styles.modalInput, styles.descInput]}
              placeholder="Description (optional)"
              placeholderTextColor={COLORS.onSurfaceVariant}
              value={playlistDescription}
              onChangeText={setPlaylistDescription}
              multiline
              numberOfLines={2}
            />
          </View>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.modalButtonOutline}
              onPress={onClose}
            >
              <Text style={styles.modalButtonOutlineText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonFilled}
              onPress={onCreate}
              disabled={creating}
            >
              {creating ? (
                <ActivityIndicator size="small" color={COLORS.onPrimary} />
              ) : (
                <Text style={styles.modalButtonFilledText}>Create</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
