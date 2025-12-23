import React, { useRef, useEffect } from "react";
import { Tabs } from "expo-router";
import { View, StyleSheet, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MiniPlayer from "../../components/MiniPlayer";
import { usePlayerStore } from "../../store/playerStore";
import { COLORS, RADIUS, ANIMATION, TAB_CONFIG } from "../../constants/theme";

const AnimatedTabIcon = ({
  name,
  color,
  focused,
  previousFocused,
}: {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
  focused: boolean;
  previousFocused: React.MutableRefObject<boolean>;
}) => {
  const scale = useRef(new Animated.Value(focused ? 1 : 0.85)).current;
  const opacity = useRef(new Animated.Value(focused ? 1 : 0.7)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const bgOpacity = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    const wasNotFocused = !previousFocused.current;
    const justBecameFocused = focused && wasNotFocused;
    const justBecameUnfocused = !focused && previousFocused.current;

    if (justBecameFocused) {
      translateY.setValue(-6);
      scale.setValue(0.8);

      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          damping: 10,
          stiffness: 120,
          mass: 0.7,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          damping: 8,
          stiffness: 150,
          mass: 0.5,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(bgOpacity, {
          toValue: 1,
          damping: 12,
          stiffness: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (justBecameUnfocused) {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 0.9,
          damping: 15,
          stiffness: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bgOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    previousFocused.current = focused;
  }, [focused, bgOpacity, opacity, scale, translateY, previousFocused]);

  return (
    <View style={styles.iconContainer}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.iconBackground,
          { opacity: bgOpacity },
        ]}
      />
      <Animated.View
        style={{
          transform: [{ scale }, { translateY }],
          opacity,
        }}
      >
        <MaterialIcons name={name} size={24} color={color} />
      </Animated.View>
    </View>
  );
};

export default function TabLayout() {
  const currentSong = usePlayerStore((state) => state.currentSong);

  const homePrevFocused = useRef(true);
  const songsPrevFocused = useRef(false);
  const playlistsPrevFocused = useRef(false);

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.onSurfaceVariant,
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItem,
          tabBarShowLabel: true,
          animation: ANIMATION.tabTransition,
          sceneStyle: { backgroundColor: COLORS.background },
          lazy: false,
          freezeOnBlur: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: TAB_CONFIG.forYou.name,
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon
                name={TAB_CONFIG.forYou.icon}
                color={color}
                focused={focused}
                previousFocused={homePrevFocused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="songs"
          options={{
            title: TAB_CONFIG.songs.name,
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon
                name={TAB_CONFIG.songs.icon}
                color={color}
                focused={focused}
                previousFocused={songsPrevFocused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            title: TAB_CONFIG.playlists.name,
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon
                name={TAB_CONFIG.playlists.icon}
                color={color}
                focused={focused}
                previousFocused={playlistsPrevFocused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="discover"
          options={{
            title: TAB_CONFIG.discover.name,
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon
                name={TAB_CONFIG.discover.icon}
                color={color}
                focused={focused}
                previousFocused={playlistsPrevFocused}
              />
            ),
          }}
        />
      </Tabs>
      {currentSong && <MiniPlayer />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabBar: {
    backgroundColor: COLORS.surfaceContainer,
    borderTopWidth: 0,
    elevation: 0,
    height: 80,
    paddingTop: 12,
    paddingBottom: 16,
  },
  tabLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    marginTop: 4,
  },
  tabItem: {
    paddingVertical: 0,
  },
  iconContainer: {
    width: 64,
    height: 32,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  iconBackground: {
    backgroundColor: COLORS.secondaryContainer,
    borderRadius: RADIUS.lg,
  },
  iconContainerActive: {
    backgroundColor: COLORS.secondaryContainer,
  },
});
