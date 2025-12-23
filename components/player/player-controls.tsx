import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS } from "../../constants/theme";

interface PlayerControlsProps {
  isPlaying: boolean;
  shuffle: boolean;
  repeat: "off" | "one" | "all";
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
}

export default function PlayerControls({
  isPlaying,
  shuffle,
  repeat,
  onPlayPause,
  onPrevious,
  onNext,
  onToggleShuffle,
  onToggleRepeat,
}: PlayerControlsProps) {
  return (
    <View style={styles.controls}>
      <TouchableOpacity style={styles.sideControl} onPress={onToggleShuffle}>
        <Ionicons
          name="shuffle"
          size={24}
          color={shuffle ? COLORS.primary : COLORS.secondaryContainer}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton} onPress={onPrevious}>
        <FontAwesome5 name="fast-backward" size={20} color={COLORS.onSurface} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.modernPlayButton} onPress={onPlayPause}>
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          size={30}
          color={COLORS.onSurface}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton} onPress={onNext}>
        <FontAwesome5 name="fast-forward" size={20} color={COLORS.onSurface} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.sideControl} onPress={onToggleRepeat}>
        <View style={styles.repeatContainer}>
          <Feather
            name="repeat"
            size={18}
            color={
              repeat !== "off" ? COLORS.primary : COLORS.secondaryContainer
            }
          />
          {repeat === "one" && (
            <Text style={[styles.repeatOne, { color: COLORS.primary }]}>1</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },
  sideControl: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  controlButton: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SPACING.sm,
  },
  modernPlayButton: {
    width: 72,
    height: 72,
    borderRadius: RADIUS.xxl,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: SPACING.sm,
  },
  repeatContainer: {
    position: "relative",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  repeatOne: {
    position: "absolute",
    fontSize: 7,
    fontWeight: "600",
    bottom: 7.2,
    right: 9.8,
  },
});
