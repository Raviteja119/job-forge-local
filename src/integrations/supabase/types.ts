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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      "Available jobs": {
        Row: {
          category_id: number
          user_id: number
        }
        Insert: {
          category_id?: number
          user_id: number
        }
        Update: {
          category_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Available jobs_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: true
            referencedRelation: "category"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "Available jobs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          },
        ]
      }
      category: {
        Row: {
          category_id: number
          category_name: string
        }
        Insert: {
          category_id?: number
          category_name: string
        }
        Update: {
          category_id?: number
          category_name?: string
        }
        Relationships: []
      }
      company: {
        Row: {
          comp_id: number
          comp_name: string
          comp_type: string | null
          contact_email: string | null
          contact_name: string | null
          contact_number: number | null
        }
        Insert: {
          comp_id?: number
          comp_name: string
          comp_type?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_number?: number | null
        }
        Update: {
          comp_id?: number
          comp_name?: string
          comp_type?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_number?: number | null
        }
        Relationships: []
      }
      "Post a Job": {
        Row: {
          Benefits_perks: string | null
          category_id: number | null
          city: string | null
          comp_id: number | null
          duration: number | null
          job_id: number
          job_title: string
          job_type: string | null
          pay_structure: string | null
          pay_type: string | null
          Requirements: string | null
          Skills_Required: string | null
          state: string | null
          work_location: string | null
          working_hours: string | null
        }
        Insert: {
          Benefits_perks?: string | null
          category_id?: number | null
          city?: string | null
          comp_id?: number | null
          duration?: number | null
          job_id?: number
          job_title: string
          job_type?: string | null
          pay_structure?: string | null
          pay_type?: string | null
          Requirements?: string | null
          Skills_Required?: string | null
          state?: string | null
          work_location?: string | null
          working_hours?: string | null
        }
        Update: {
          Benefits_perks?: string | null
          category_id?: number | null
          city?: string | null
          comp_id?: number | null
          duration?: number | null
          job_id?: number
          job_title?: string
          job_type?: string | null
          pay_structure?: string | null
          pay_type?: string | null
          Requirements?: string | null
          Skills_Required?: string | null
          state?: string | null
          work_location?: string | null
          working_hours?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Post a Job_comp_id_fkey"
            columns: ["comp_id"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["comp_id"]
          },
        ]
      }
      Profile: {
        Row: {
          Address: string | null
          email_id: string | null
          Jobs_Applied: number | null
          Jobs_Completed: number | null
          Mobile_number: number | null
          Rating: number | null
          Success_Rate: number | null
          user_id: number
          user_name: string
        }
        Insert: {
          Address?: string | null
          email_id?: string | null
          Jobs_Applied?: number | null
          Jobs_Completed?: number | null
          Mobile_number?: number | null
          Rating?: number | null
          Success_Rate?: number | null
          user_id?: number
          user_name: string
        }
        Update: {
          Address?: string | null
          email_id?: string | null
          Jobs_Applied?: number | null
          Jobs_Completed?: number | null
          Mobile_number?: number | null
          Rating?: number | null
          Success_Rate?: number | null
          user_id?: number
          user_name?: string
        }
        Relationships: []
      }
      User: {
        Row: {
          email_id: string | null
          Mobile_number: number | null
          password: string | null
          user_id: number
          user_name: string
        }
        Insert: {
          email_id?: string | null
          Mobile_number?: number | null
          password?: string | null
          user_id?: number
          user_name: string
        }
        Update: {
          email_id?: string | null
          Mobile_number?: number | null
          password?: string | null
          user_id?: number
          user_name?: string
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
