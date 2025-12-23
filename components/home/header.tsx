import React, { useRef } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SPACING, TYPOGRAPHY } from "../../constants/theme";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const SettingsButton = ({ onPress }: { onPress: () => void }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.85,
      damping: 15,
      stiffness: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        damping: 12,
        stiffness: 200,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 15,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(rotation, {
          toValue: 0,
          damping: 8,
          stiffness: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [-360, 360],
    outputRange: ["-360deg", "360deg"],
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.settingsButton}
    >
      <Animated.View
        style={{
          transform: [{ scale }, { rotate: rotateInterpolate }],
        }}
      >
        <MaterialIcons
          name="more-vert"
          size={24}
          color={COLORS.onSurfaceVariant}
        />
      </Animated.View>
    </Pressable>
  );
};

interface HeaderProps {
  onSettingsPress: () => void;
}

export default function Header({ onSettingsPress }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.title}>Myoraei</Text>
      </View>
      <SettingsButton onPress={onSettingsPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.lg,
  },
  greeting: {
    fontFamily: "Inter_400Regular",
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.onSurfaceVariant,
  },
  title: {
    fontFamily: "Inter_600SemiBold",
    ...TYPOGRAPHY.headlineLarge,
    color: COLORS.onSurface,
    marginTop: 4,
  },
  settingsButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});
