/* 
  Note that Web support is not and will never be a priority for me.
*/

// Web-specific database implementation using AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Web fallback: Use in-memory storage for testing
let webStorage: { songs: any[]; playlists: any[]; playlistSongs: any[] } = {
  songs: [],
  playlists: [],
  playlistSongs: [],
};

// Helper to save web storage
const saveWebStorage = async () => {
  await AsyncStorage.setItem("web_songs", JSON.stringify(webStorage.songs));
  await AsyncStorage.setItem(
    "web_playlists",
    JSON.stringify(webStorage.playlists)
  );
  await AsyncStorage.setItem(
    "web_playlist_songs",
    JSON.stringify(webStorage.playlistSongs)
  );
};

export const initDatabase = async () => {
  console.log(
    "Running on web - using in-memory storage (SQLite not available on web)"
  );
  // Load from AsyncStorage for persistence on web
  const savedSongs = await AsyncStorage.getItem("web_songs");
  const savedPlaylists = await AsyncStorage.getItem("web_playlists");
  const savedPlaylistSongs = await AsyncStorage.getItem("web_playlist_songs");

  if (savedSongs) webStorage.songs = JSON.parse(savedSongs);
  if (savedPlaylists) webStorage.playlists = JSON.parse(savedPlaylists);
  if (savedPlaylistSongs)
    webStorage.playlistSongs = JSON.parse(savedPlaylistSongs);
};

export const getDatabase = () => null;

export const getAllSongs = async () => webStorage.songs;

export const getSongById = async (id: string) =>
  webStorage.songs.find((s) => s.id === id) || null;

export const getLikedSongs = async () =>
  webStorage.songs.filter((s) => s.is_liked);

export const addSong = async (song: any) => {
  webStorage.songs.unshift(song);
  await saveWebStorage();
};

export const updateSong = async (id: string, updates: any) => {
  const index = webStorage.songs.findIndex((s) => s.id === id);
  if (index !== -1) {
    webStorage.songs[index] = { ...webStorage.songs[index], ...updates };
    await saveWebStorage();
  }
};

export const deleteSong = async (id: string) => {
  webStorage.songs = webStorage.songs.filter((s) => s.id !== id);
  await saveWebStorage();
};

export const toggleLikeSong = async (id: string) => {
  const song = webStorage.songs.find((s) => s.id === id);
  if (song) {
    song.is_liked = !song.is_liked;
    await saveWebStorage();
  }
};

export const incrementPlayCount = async (id: string) => {
  const song = webStorage.songs.find((s) => s.id === id);
  if (song) {
    song.play_count = (song.play_count || 0) + 1;
    await saveWebStorage();
  }
};

export const getAllPlaylists = async () => webStorage.playlists;

export const getPlaylistById = async (id: string) =>
  webStorage.playlists.find((p) => p.id === id) || null;

export const addPlaylist = async (playlist: any) => {
  webStorage.playlists.unshift(playlist);
  await saveWebStorage();
};

export const updatePlaylist = async (id: string, updates: any) => {
  const index = webStorage.playlists.findIndex((p) => p.id === id);
  if (index !== -1) {
    webStorage.playlists[index] = {
      ...webStorage.playlists[index],
      ...updates,
    };
    await saveWebStorage();
  }
};

export const deletePlaylist = async (id: string) => {
  webStorage.playlists = webStorage.playlists.filter((p) => p.id !== id);
  webStorage.playlistSongs = webStorage.playlistSongs.filter(
    (ps) => ps.playlist_id !== id
  );
  await saveWebStorage();
};

export const getPlaylistSongs = async (playlistId: string) => {
  const playlistSongIds = webStorage.playlistSongs
    .filter((ps) => ps.playlist_id === playlistId)
    .sort((a, b) => a.position - b.position)
    .map((ps) => ps.song_id);
  return webStorage.songs.filter((s) => playlistSongIds.includes(s.id));
};

export const addSongToPlaylist = async (
  playlistId: string,
  songId: string,
  position?: number
) => {
  if (position === undefined) {
    const existing = webStorage.playlistSongs.filter(
      (ps) => ps.playlist_id === playlistId
    );
    position =
      existing.length > 0
        ? Math.max(...existing.map((ps) => ps.position)) + 1
        : 0;
  }
  webStorage.playlistSongs.push({
    playlist_id: playlistId,
    song_id: songId,
    position,
  });
  const playlist = webStorage.playlists.find((p) => p.id === playlistId);
  if (playlist) {
    playlist.song_count = (playlist.song_count || 0) + 1;
  }
  await saveWebStorage();
};

export const removeSongFromPlaylist = async (
  playlistId: string,
  songId: string
) => {
  webStorage.playlistSongs = webStorage.playlistSongs.filter(
    (ps) => !(ps.playlist_id === playlistId && ps.song_id === songId)
  );
  const playlist = webStorage.playlists.find((p) => p.id === playlistId);
  if (playlist) {
    playlist.song_count = Math.max(0, (playlist.song_count || 0) - 1);
  }
  await saveWebStorage();
};

export const getStats = async () => {
  return {
    total_songs: webStorage.songs.length,
    total_playlists: webStorage.playlists.length,
    liked_songs: webStorage.songs.filter((s) => s.is_liked).length,
    total_play_count: webStorage.songs.reduce(
      (sum, s) => sum + (s.play_count || 0),
      0
    ),
  };
};

export const saveToStorage = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeFromStorage = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
