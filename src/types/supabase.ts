export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          name: string
          id: number | null
          color?: string | null
          icon?: string | null
          created_at?: string
          user?: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          icon: string
          id: number
          name?: string
          user?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          icon?: string | null
          id: number
          name?: string
          user?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          name: string
          id: number | null
          category?: string | null
          completed: boolean | null
          created_at?: string
          is_urgent?: boolean
          user?: string | null
        }
        Insert: {
          category?: string | null
          completed?: boolean | null
          content?: string | null
          created_at?: string
          id: number
          user?: string | null
        }
        Update: {
          category?: string | null
          completed?: boolean | null
          content?: string | null
          created_at?: string
          id: number
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["name"]
          }
        ]
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
