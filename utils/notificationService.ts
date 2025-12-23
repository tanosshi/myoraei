import { Platform } from "react-native";

// Only import expo-notifications on native platforms
let Notifications: any;
let NotificationAction: any;

if (Platform.OS !== "web") {
  try {
    const expoNotifications = require("expo-notifications");
    Notifications = expoNotifications.default || expoNotifications;
    NotificationAction = expoNotifications.NotificationAction;
  } catch (error) {
    console.error("Failed to import expo-notifications:", error);
  }
}

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

// Only set notification handler on native platforms
if (Platform.OS !== "web" && Notifications) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: false,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: false,
      shouldShowList: false,
    }),
  });
}

export const setupNotificationChannel = async () => {
  if (Platform.OS === "web" || !Notifications) return;
  
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("playback", {
      name: "Playback Controls",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      enableLights: true,
      enableVibrate: true,
    });
  }
};

export const createNotificationContent = (
  song: Song | null,
  isPlaying: boolean
) => {
  if (!song || !Notifications) {
    return null;
  }

  const content: any = {
    title: song.title,
    body: song.artist,
    data: {
      songId: song.id,
      type: "playback",
    },
    categoryIdentifier: Platform.OS === "android" ? "TRANSPORT" : undefined,
  };

  if (song.artwork) {
    if (Platform.OS === "android") {
      (content as any).android = {
        smallIcon: "@mipmap/ic_launcher",
        largeIcon: song.artwork,
        color: "#000000",
        ongoing: true,
        autoCancel: false,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        visibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        actions: buildNotificationActions(isPlaying),
      };
    }
  } else {
    if (Platform.OS === "android") {
      (content as any).android = {
        smallIcon: "@mipmap/ic_launcher",
        color: "#000000",
        ongoing: true,
        autoCancel: false,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        visibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        actions: buildNotificationActions(isPlaying),
      };
    }
  }

  return content;
};

const buildNotificationActions = (isPlaying: boolean): any[] => {
  const actions: any[] = [
    {
      identifier: "previous",
      buttonTitle: "Previous",
    },
    {
      identifier: isPlaying ? "pause" : "play",
      buttonTitle: isPlaying ? "Pause" : "Play",
    },
    {
      identifier: "next",
      buttonTitle: "Next",
    },
  ];

  return actions;
};

export const showPlaybackNotification = async (
  song: Song | null,
  isPlaying: boolean
) => {
  if (Platform.OS === "web" || !Notifications) return null;
  
  try {
    const content = createNotificationContent(song, isPlaying);
    if (!content) return;

    await Notifications.dismissAllNotificationsAsync();

    const notificationId = await Notifications.scheduleNotificationAsync({
      content,
      trigger: null,
      identifier: "playback-notification",
    });

    return notificationId;
  } catch (error) {
    console.error("Error showing playback notification:", error);
  }
};

export const hidePlaybackNotification = async () => {
  if (Platform.OS === "web" || !Notifications) return;
  
  try {
    await Notifications.dismissAllNotificationsAsync();
  } catch (error) {
    console.error("Error hiding playback notification:", error);
  }
};

export const updateNotificationState = async (
  currentSong?: Song | null,
  isPlaying?: boolean
) => {
  if (currentSong === undefined || isPlaying === undefined) {
    try {
      const playerStore =
        require("../store/playerStore").usePlayerStore.getState();
      currentSong = playerStore.currentSong;
      isPlaying = playerStore.isPlaying;
    } catch (error) {
      console.error("Failed to get player state:", error);
      return;
    }
  }

  if (currentSong && isPlaying) {
    await showPlaybackNotification(currentSong, isPlaying);
  } else {
    await hidePlaybackNotification();
  }
};

export const handleNotificationAction = async (action: any) => {
  let playerStore;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    playerStore = require("../store/playerStore").usePlayerStore.getState();
  } catch (error) {
    console.error("Failed to get player store:", error);
    return;
  }

  try {
    switch (action.identifier) {
      case "play":
        if (!playerStore.isPlaying) {
          await playerStore.togglePlayPause();
        }
        break;
      case "pause":
        if (playerStore.isPlaying) {
          await playerStore.togglePlayPause();
        }
        break;
      case "next":
        await playerStore.playNext();
        break;
      case "previous":
        await playerStore.playPrevious();
        break;
      default:
        console.log("Unknown notification action:", action.identifier);
    }

    await updateNotificationState();
  } catch (error) {
    console.error("Error handling notification action:", error);
  }
};

export const setupNotificationListeners = () => {
  if (Platform.OS === "web" || !Notifications) return null;
  
  const subscription = Notifications.addNotificationResponseReceivedListener(
    async (response: any) => {
      const { actionIdentifier } = response;

      if (
        actionIdentifier &&
        actionIdentifier !== Notifications.DEFAULT_ACTION_IDENTIFIER
      ) {
        const action: any = {
          identifier: actionIdentifier,
          buttonTitle: actionIdentifier,
        };

        await handleNotificationAction(action);
      }
    }
  );

  return subscription;
};

export const requestNotificationPermissions = async () => {
  if (Platform.OS === "web" || !Notifications) return true;
  
  if (Platform.OS === "android") {
    return true;
  }

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
};

export const initializeNotificationService = async () => {
  if (Platform.OS === "web") {
    console.log("Notifications disabled on web");
    return true;
  }
  
  try {
    await setupNotificationChannel();

    const hasPermission = await requestNotificationPermissions();

    if (hasPermission) {
      console.log("Notification service initialized successfully");
      return true;
    } else {
      console.log("Notification permission denied");
      return false;
    }
  } catch (error) {
    console.error("Error initializing notification service:", error);
    return false;
  }
};

export default {
  setupNotificationChannel,
  showPlaybackNotification,
  hidePlaybackNotification,
  updateNotificationState,
  handleNotificationAction,
  setupNotificationListeners,
  requestNotificationPermissions,
  initializeNotificationService,
};
