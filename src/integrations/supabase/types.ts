export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          dark_mode: boolean | null
          dhikr_streak: number | null
          full_name: string | null
          id: string
          last_dhikr_date: string | null
          preferred_city: string | null
          preferred_country: string | null
          preferred_latitude: number | null
          preferred_longitude: number | null
          preferred_reciter: string | null
          preferred_translation: string | null
          quran_last_ayah: number | null
          quran_last_surah: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          dark_mode?: boolean | null
          dhikr_streak?: number | null
          full_name?: string | null
          id?: string
          last_dhikr_date?: string | null
          preferred_city?: string | null
          preferred_country?: string | null
          preferred_latitude?: number | null
          preferred_longitude?: number | null
          preferred_reciter?: string | null
          preferred_translation?: string | null
          quran_last_ayah?: number | null
          quran_last_surah?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          dark_mode?: boolean | null
          dhikr_streak?: number | null
          full_name?: string | null
          id?: string
          last_dhikr_date?: string | null
          preferred_city?: string | null
          preferred_country?: string | null
          preferred_latitude?: number | null
          preferred_longitude?: number | null
          preferred_reciter?: string | null
          preferred_translation?: string | null
          quran_last_ayah?: number | null
          quran_last_surah?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quran_bookmarks: {
        Row: {
          ayah_number: number
          created_at: string
          id: string
          note: string | null
          surah_number: number
          user_id: string
        }
        Insert: {
          ayah_number: number
          created_at?: string
          id?: string
          note?: string | null
          surah_number: number
          user_id: string
        }
        Update: {
          ayah_number?: number
          created_at?: string
          id?: string
          note?: string | null
          surah_number?: number
          user_id?: string
        }
        Relationships: []
      }
      ramadan_goals: {
        Row: {
          charity_amount: number | null
          created_at: string
          dhikr_count: number | null
          fasted: boolean | null
          gave_charity: boolean | null
          goal_date: string
          id: string
          journal_entry: string | null
          prayed_asr: boolean | null
          prayed_dhuhr: boolean | null
          prayed_fajr: boolean | null
          prayed_isha: boolean | null
          prayed_maghrib: boolean | null
          quran_pages: number | null
          read_quran: boolean | null
          user_id: string
        }
        Insert: {
          charity_amount?: number | null
          created_at?: string
          dhikr_count?: number | null
          fasted?: boolean | null
          gave_charity?: boolean | null
          goal_date?: string
          id?: string
          journal_entry?: string | null
          prayed_asr?: boolean | null
          prayed_dhuhr?: boolean | null
          prayed_fajr?: boolean | null
          prayed_isha?: boolean | null
          prayed_maghrib?: boolean | null
          quran_pages?: number | null
          read_quran?: boolean | null
          user_id: string
        }
        Update: {
          charity_amount?: number | null
          created_at?: string
          dhikr_count?: number | null
          fasted?: boolean | null
          gave_charity?: boolean | null
          goal_date?: string
          id?: string
          journal_entry?: string | null
          prayed_asr?: boolean | null
          prayed_dhuhr?: boolean | null
          prayed_fajr?: boolean | null
          prayed_isha?: boolean | null
          prayed_maghrib?: boolean | null
          quran_pages?: number | null
          read_quran?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
