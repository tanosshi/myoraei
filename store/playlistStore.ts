import { create } from "zustand";
import * as db from "../utils/database";

interface Playlist {
  id: string;
  name: string;
  description: string;
  artwork?: string;
  song_count: number;
  created_at: string;
}

interface PlaylistState {
  playlists: Playlist[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  initializeStore: () => Promise<void>;
  fetchPlaylists: () => Promise<void>;
  getPlaylistSongs: (playlistId: string) => Promise<any[]>;
  createPlaylist: (
    playlist: Omit<Playlist, "id" | "created_at" | "song_count">
  ) => Promise<void>;
  updatePlaylist: (id: string, data: Partial<Playlist>) => Promise<void>;
  deletePlaylist: (id: string) => Promise<void>;
  addSongToPlaylist: (playlistId: string, songId: string) => Promise<void>;
  removeSongFromPlaylist: (playlistId: string, songId: string) => Promise<void>;
}

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
  playlists: [],
  loading: false,
  error: null,
  initialized: false,

  initializeStore: async () => {
    if (get().initialized) return;
    try {
      await db.initDatabase();
      set({ initialized: true });
      await get().fetchPlaylists();
    } catch (error: any) {
      console.error("Failed to initialize playlist store:", error);
      set({ error: error.message });
    }
  },

  fetchPlaylists: async () => {
    set({ loading: true, error: null });
    try {
      const playlists = await db.getAllPlaylists();
      set({ playlists: playlists as Playlist[], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  getPlaylistSongs: async (playlistId: string) => {
    try {
      return await db.getPlaylistSongs(playlistId);
    } catch (error: any) {
      console.error("Error fetching playlist songs:", error);
      return [];
    }
  },

  createPlaylist: async (playlistData) => {
    set({ loading: true, error: null });
    try {
      const playlist = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        ...playlistData,
        song_count: 0,
        created_at: new Date().toISOString(),
      };
      await db.addPlaylist(playlist);
      set((state) => ({
        playlists: [playlist, ...state.playlists],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updatePlaylist: async (id: string, data: Partial<Playlist>) => {
    try {
      await db.updatePlaylist(id, data);
      const updatedPlaylist = await db.getPlaylistById(id);
      if (updatedPlaylist) {
        set((state) => ({
          playlists: state.playlists.map((p) =>
            p.id === id ? (updatedPlaylist as Playlist) : p
          ),
        }));
      }
    } catch (error: any) {
      throw error;
    }
  },

  deletePlaylist: async (id: string) => {
    try {
      await db.deletePlaylist(id);
      set((state) => ({
        playlists: state.playlists.filter((p) => p.id !== id),
      }));
    } catch (error: any) {
      throw error;
    }
  },

  addSongToPlaylist: async (playlistId: string, songId: string) => {
    try {
      await db.addSongToPlaylist(playlistId, songId);
      await get().fetchPlaylists();
    } catch (error: any) {
      throw error;
    }
  },

  removeSongFromPlaylist: async (playlistId: string, songId: string) => {
    try {
      await db.removeSongFromPlaylist(playlistId, songId);
      await get().fetchPlaylists();
    } catch (error: any) {
      throw error;
    }
  },
}));
