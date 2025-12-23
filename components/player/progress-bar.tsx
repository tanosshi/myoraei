import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme";

interface ProgressBarProps {
  position: number;
  duration: number;
  onSeek: (value: number) => void;
}

const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function ProgressBar({ position, duration, onSeek }: ProgressBarProps) {
  return (
    <View style={styles.progressContainer}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration || 1}
        value={position}
        onSlidingComplete={onSeek}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor={COLORS.surfaceContainerHighest}
        thumbTintColor={COLORS.primary}
      />
      <View style={styles.timeRow}>
        <Text style={[styles.timeText, styles.leftTime]}>{formatTime(position)}</Text>
        <Text style={[styles.timeText, styles.rightTime]}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -4,
  },
  timeText: {
    fontFamily: "Inter_400Regular",
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.onSurfaceVariant,
    marginBottom: -1,
  },
  leftTime: {
    textAlign: "left",
    paddingLeft: SPACING.md -1,
  },
  rightTime: {
    textAlign: "right",
    paddingRight: SPACING.md -1,
  },
});
