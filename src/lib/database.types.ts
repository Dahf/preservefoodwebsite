export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  auth: {
    Tables: {
      audit_log_entries: {
        Row: {
          created_at: string | null
          id: string
          instance_id: string | null
          ip_address: string
          payload: Json | null
        }
        Insert: {
          created_at?: string | null
          id: string
          instance_id?: string | null
          ip_address?: string
          payload?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          instance_id?: string | null
          ip_address?: string
          payload?: Json | null
        }
        Relationships: []
      }
      flow_state: {
        Row: {
          auth_code: string
          auth_code_issued_at: string | null
          authentication_method: string
          code_challenge: string
          code_challenge_method: Database['auth']['Enums']['code_challenge_method']
          created_at: string | null
          id: string
          provider_access_token: string | null
          provider_refresh_token: string | null
          provider_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          auth_code: string
          auth_code_issued_at?: string | null
          authentication_method: string
          code_challenge: string
          code_challenge_method: Database['auth']['Enums']['code_challenge_method']
          created_at?: string | null
          id: string
          provider_access_token?: string | null
          provider_refresh_token?: string | null
          provider_type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          auth_code?: string
          auth_code_issued_at?: string | null
          authentication_method?: string
          code_challenge?: string
          code_challenge_method?: Database['auth']['Enums']['code_challenge_method']
          created_at?: string | null
          id?: string
          provider_access_token?: string | null
          provider_refresh_token?: string | null
          provider_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      identities: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          identity_data: Json
          last_sign_in_at: string | null
          provider: string
          provider_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          identity_data: Json
          last_sign_in_at?: string | null
          provider: string
          provider_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          identity_data?: Json
          last_sign_in_at?: string | null
          provider?: string
          provider_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'identities_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      instances: {
        Row: {
          created_at: string | null
          id: string
          raw_base_config: string | null
          updated_at: string | null
          uuid: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          raw_base_config?: string | null
          updated_at?: string | null
          uuid?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          raw_base_config?: string | null
          updated_at?: string | null
          uuid?: string | null
        }
        Relationships: []
      }
      mfa_amr_claims: {
        Row: {
          authentication_method: string
          created_at: string
          id: string
          session_id: string
          updated_at: string
        }
        Insert: {
          authentication_method: string
          created_at: string
          id: string
          session_id: string
          updated_at: string
        }
        Update: {
          authentication_method?: string
          created_at?: string
          id?: string
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'mfa_amr_claims_session_id_fkey'
            columns: ['session_id']
            isOneToOne: false
            referencedRelation: 'sessions'
            referencedColumns: ['id']
          }
        ]
      }
      mfa_challenges: {
        Row: {
          created_at: string
          factor_id: string
          id: string
          ip_address: unknown
          otp_code: string | null
          verified_at: string | null
          web_authn_session_data: Json | null
        }
        Insert: {
          created_at: string
          factor_id: string
          id: string
          ip_address: unknown
          otp_code?: string | null
          verified_at?: string | null
          web_authn_session_data?: Json | null
        }
        Update: {
          created_at?: string
          factor_id?: string
          id?: string
          ip_address?: unknown
          otp_code?: string | null
          verified_at?: string | null
          web_authn_session_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: 'mfa_challenges_auth_factor_id_fkey'
            columns: ['factor_id']
            isOneToOne: false
            referencedRelation: 'mfa_factors'
            referencedColumns: ['id']
          }
        ]
      }
      mfa_factors: {
        Row: {
          created_at: string
          factor_type: Database['auth']['Enums']['factor_type']
          friendly_name: string | null
          id: string
          last_challenged_at: string | null
          last_webauthn_challenge_data: Json | null
          phone: string | null
          secret: string | null
          status: Database['auth']['Enums']['factor_status']
          updated_at: string
          user_id: string
          web_authn_aaguid: string | null
          web_authn_credential: Json | null
        }
        Insert: {
          created_at: string
          factor_type: Database['auth']['Enums']['factor_type']
          friendly_name?: string | null
          id: string
          last_challenged_at?: string | null
          last_webauthn_challenge_data?: Json | null
          phone?: string | null
          secret?: string | null
          status: Database['auth']['Enums']['factor_status']
          updated_at: string
          user_id: string
          web_authn_aaguid?: string | null
          web_authn_credential?: Json | null
        }
        Update: {
          created_at?: string
          factor_type?: Database['auth']['Enums']['factor_type']
          friendly_name?: string | null
          id?: string
          last_challenged_at?: string | null
          last_webauthn_challenge_data?: Json | null
          phone?: string | null
          secret?: string | null
          status?: Database['auth']['Enums']['factor_status']
          updated_at?: string
          user_id?: string
          web_authn_aaguid?: string | null
          web_authn_credential?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: 'mfa_factors_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      oauth_authorizations: {
        Row: {
          approved_at: string | null
          authorization_code: string | null
          authorization_id: string
          client_id: string
          code_challenge: string | null
          code_challenge_method: Database['auth']['Enums']['code_challenge_method'] | null
          created_at: string
          expires_at: string
          id: string
          redirect_uri: string
          resource: string | null
          response_type: Database['auth']['Enums']['oauth_response_type']
          scope: string
          state: string | null
          status: Database['auth']['Enums']['oauth_authorization_status']
          user_id: string | null
        }
        Insert: {
          approved_at?: string | null
          authorization_code?: string | null
          authorization_id: string
          client_id: string
          code_challenge?: string | null
          code_challenge_method?: Database['auth']['Enums']['code_challenge_method'] | null
          created_at?: string
          expires_at?: string
          id: string
          redirect_uri: string
          resource?: string | null
          response_type?: Database['auth']['Enums']['oauth_response_type']
          scope: string
          state?: string | null
          status?: Database['auth']['Enums']['oauth_authorization_status']
          user_id?: string | null
        }
        Update: {
          approved_at?: string | null
          authorization_code?: string | null
          authorization_id?: string
          client_id?: string
          code_challenge?: string | null
          code_challenge_method?: Database['auth']['Enums']['code_challenge_method'] | null
          created_at?: string
          expires_at?: string
          id?: string
          redirect_uri?: string
          resource?: string | null
          response_type?: Database['auth']['Enums']['oauth_response_type']
          scope?: string
          state?: string | null
          status?: Database['auth']['Enums']['oauth_authorization_status']
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'oauth_authorizations_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'oauth_clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'oauth_authorizations_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      oauth_clients: {
        Row: {
          client_name: string | null
          client_secret_hash: string | null
          client_type: Database['auth']['Enums']['oauth_client_type']
          client_uri: string | null
          created_at: string
          deleted_at: string | null
          grant_types: string
          id: string
          logo_uri: string | null
          redirect_uris: string
          registration_type: Database['auth']['Enums']['oauth_registration_type']
          updated_at: string
        }
        Insert: {
          client_name?: string | null
          client_secret_hash?: string | null
          client_type?: Database['auth']['Enums']['oauth_client_type']
          client_uri?: string | null
          created_at?: string
          deleted_at?: string | null
          grant_types: string
          id: string
          logo_uri?: string | null
          redirect_uris: string
          registration_type: Database['auth']['Enums']['oauth_registration_type']
          updated_at?: string
        }
        Update: {
          client_name?: string | null
          client_secret_hash?: string | null
          client_type?: Database['auth']['Enums']['oauth_client_type']
          client_uri?: string | null
          created_at?: string
          deleted_at?: string | null
          grant_types?: string
          id?: string
          logo_uri?: string | null
          redirect_uris?: string
          registration_type?: Database['auth']['Enums']['oauth_registration_type']
          updated_at?: string
        }
        Relationships: []
      }
      oauth_consents: {
        Row: {
          client_id: string
          granted_at: string
          id: string
          revoked_at: string | null
          scopes: string
          user_id: string
        }
        Insert: {
          client_id: string
          granted_at?: string
          id: string
          revoked_at?: string | null
          scopes: string
          user_id: string
        }
        Update: {
          client_id?: string
          granted_at?: string
          id?: string
          revoked_at?: string | null
          scopes?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'oauth_consents_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'oauth_clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'oauth_consents_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      one_time_tokens: {
        Row: {
          created_at: string
          id: string
          relates_to: string
          token_hash: string
          token_type: Database['auth']['Enums']['one_time_token_type']
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id: string
          relates_to: string
          token_hash: string
          token_type: Database['auth']['Enums']['one_time_token_type']
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          relates_to?: string
          token_hash?: string
          token_type?: Database['auth']['Enums']['one_time_token_type']
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'one_time_tokens_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      refresh_tokens: {
        Row: {
          created_at: string | null
          id: number
          instance_id: string | null
          parent: string | null
          revoked: boolean | null
          session_id: string | null
          token: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          instance_id?: string | null
          parent?: string | null
          revoked?: boolean | null
          session_id?: string | null
          token?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          instance_id?: string | null
          parent?: string | null
          revoked?: boolean | null
          session_id?: string | null
          token?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'refresh_tokens_session_id_fkey'
            columns: ['session_id']
            isOneToOne: false
            referencedRelation: 'sessions'
            referencedColumns: ['id']
          }
        ]
      }
      saml_providers: {
        Row: {
          attribute_mapping: Json | null
          created_at: string | null
          entity_id: string
          id: string
          metadata_url: string | null
          metadata_xml: string
          name_id_format: string | null
          sso_provider_id: string
          updated_at: string | null
        }
        Insert: {
          attribute_mapping?: Json | null
          created_at?: string | null
          entity_id: string
          id: string
          metadata_url?: string | null
          metadata_xml: string
          name_id_format?: string | null
          sso_provider_id: string
          updated_at?: string | null
        }
        Update: {
          attribute_mapping?: Json | null
          created_at?: string | null
          entity_id?: string
          id?: string
          metadata_url?: string | null
          metadata_xml?: string
          name_id_format?: string | null
          sso_provider_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'saml_providers_sso_provider_id_fkey'
            columns: ['sso_provider_id']
            isOneToOne: false
            referencedRelation: 'sso_providers'
            referencedColumns: ['id']
          }
        ]
      }
      saml_relay_states: {
        Row: {
          created_at: string | null
          flow_state_id: string | null
          for_email: string | null
          id: string
          redirect_to: string | null
          request_id: string
          sso_provider_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          flow_state_id?: string | null
          for_email?: string | null
          id: string
          redirect_to?: string | null
          request_id: string
          sso_provider_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          flow_state_id?: string | null
          for_email?: string | null
          id?: string
          redirect_to?: string | null
          request_id?: string
          sso_provider_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'saml_relay_states_flow_state_id_fkey'
            columns: ['flow_state_id']
            isOneToOne: false
            referencedRelation: 'flow_state'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'saml_relay_states_sso_provider_id_fkey'
            columns: ['sso_provider_id']
            isOneToOne: false
            referencedRelation: 'sso_providers'
            referencedColumns: ['id']
          }
        ]
      }
      schema_migrations: {
        Row: {
          version: string
        }
        Insert: {
          version: string
        }
        Update: {
          version?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          aal: Database['auth']['Enums']['aal_level'] | null
          created_at: string | null
          factor_id: string | null
          id: string
          ip: unknown
          not_after: string | null
          oauth_client_id: string | null
          refresh_token_counter: number | null
          refresh_token_hmac_key: string | null
          refreshed_at: string | null
          tag: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          aal?: Database['auth']['Enums']['aal_level'] | null
          created_at?: string | null
          factor_id?: string | null
          id: string
          ip?: unknown
          not_after?: string | null
          oauth_client_id?: string | null
          refresh_token_counter?: number | null
          refresh_token_hmac_key?: string | null
          refreshed_at?: string | null
          tag?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          aal?: Database['auth']['Enums']['aal_level'] | null
          created_at?: string | null
          factor_id?: string | null
          id?: string
          ip?: unknown
          not_after?: string | null
          oauth_client_id?: string | null
          refresh_token_counter?: number | null
          refresh_token_hmac_key?: string | null
          refreshed_at?: string | null
          tag?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sessions_oauth_client_id_fkey'
            columns: ['oauth_client_id']
            isOneToOne: false
            referencedRelation: 'oauth_clients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sessions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      sso_domains: {
        Row: {
          created_at: string | null
          domain: string
          id: string
          sso_provider_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          domain: string
          id: string
          sso_provider_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          domain?: string
          id?: string
          sso_provider_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'sso_domains_sso_provider_id_fkey'
            columns: ['sso_provider_id']
            isOneToOne: false
            referencedRelation: 'sso_providers'
            referencedColumns: ['id']
          }
        ]
      }
      sso_providers: {
        Row: {
          created_at: string | null
          disabled: boolean | null
          id: string
          resource_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          disabled?: boolean | null
          id: string
          resource_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          disabled?: boolean | null
          id?: string
          resource_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          aud: string | null
          banned_until: string | null
          confirmation_sent_at: string | null
          confirmation_token: string | null
          confirmed_at: string | null
          created_at: string | null
          deleted_at: string | null
          email: string | null
          email_change: string | null
          email_change_confirm_status: number | null
          email_change_sent_at: string | null
          email_change_token_current: string | null
          email_change_token_new: string | null
          email_confirmed_at: string | null
          encrypted_password: string | null
          id: string
          instance_id: string | null
          invited_at: string | null
          is_anonymous: boolean
          is_sso_user: boolean
          is_super_admin: boolean | null
          last_sign_in_at: string | null
          phone: string | null
          phone_change: string | null
          phone_change_sent_at: string | null
          phone_change_token: string | null
          phone_confirmed_at: string | null
          raw_app_meta_data: Json | null
          raw_user_meta_data: Json | null
          reauthentication_sent_at: string | null
          reauthentication_token: string | null
          recovery_sent_at: string | null
          recovery_token: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          aud?: string | null
          banned_until?: string | null
          confirmation_sent_at?: string | null
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          email_change?: string | null
          email_change_confirm_status?: number | null
          email_change_sent_at?: string | null
          email_change_token_current?: string | null
          email_change_token_new?: string | null
          email_confirmed_at?: string | null
          encrypted_password?: string | null
          id: string
          instance_id?: string | null
          invited_at?: string | null
          is_anonymous?: boolean
          is_sso_user?: boolean
          is_super_admin?: boolean | null
          last_sign_in_at?: string | null
          phone?: string | null
          phone_change?: string | null
          phone_change_sent_at?: string | null
          phone_change_token?: string | null
          phone_confirmed_at?: string | null
          raw_app_meta_data?: Json | null
          raw_user_meta_data?: Json | null
          reauthentication_sent_at?: string | null
          reauthentication_token?: string | null
          recovery_sent_at?: string | null
          recovery_token?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          aud?: string | null
          banned_until?: string | null
          confirmation_sent_at?: string | null
          confirmation_token?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          email_change?: string | null
          email_change_confirm_status?: number | null
          email_change_sent_at?: string | null
          email_change_token_current?: string | null
          email_change_token_new?: string | null
          email_confirmed_at?: string | null
          encrypted_password?: string | null
          id?: string
          instance_id?: string | null
          invited_at?: string | null
          is_anonymous?: boolean
          is_sso_user?: boolean
          is_super_admin?: boolean | null
          last_sign_in_at?: string | null
          phone?: string | null
          phone_change?: string | null
          phone_change_sent_at?: string | null
          phone_change_token?: string | null
          phone_confirmed_at?: string | null
          raw_app_meta_data?: Json | null
          raw_user_meta_data?: Json | null
          reauthentication_sent_at?: string | null
          reauthentication_token?: string | null
          recovery_sent_at?: string | null
          recovery_token?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      email: { Args: never; Returns: string }
      jwt: { Args: never; Returns: Json }
      role: { Args: never; Returns: string }
      uid: { Args: never; Returns: string }
    }
    Enums: {
      aal_level: 'aal1' | 'aal2' | 'aal3'
      code_challenge_method: 's256' | 'plain'
      factor_status: 'unverified' | 'verified'
      factor_type: 'totp' | 'webauthn' | 'phone'
      oauth_authorization_status: 'pending' | 'approved' | 'denied' | 'expired'
      oauth_client_type: 'public' | 'confidential'
      oauth_registration_type: 'dynamic' | 'manual'
      oauth_response_type: 'code'
      one_time_token_type:
        | 'confirmation_token'
        | 'reauthentication_token'
        | 'recovery_token'
        | 'email_change_token_new'
        | 'email_change_token_current'
        | 'phone_change_token'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      group_meals: {
        Row: {
          created_at: string | null
          groupid: number | null
          id: string
          is_active: boolean | null
          mealid: number | null
        }
        Insert: {
          created_at?: string | null
          groupid?: number | null
          id?: string
          is_active?: boolean | null
          mealid?: number | null
        }
        Update: {
          created_at?: string | null
          groupid?: number | null
          id?: string
          is_active?: boolean | null
          mealid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'group_meals_groupid_fkey'
            columns: ['groupid']
            isOneToOne: false
            referencedRelation: 'groups'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'group_meals_mealid_fkey'
            columns: ['mealid']
            isOneToOne: false
            referencedRelation: 'meals'
            referencedColumns: ['id']
          }
        ]
      }
      group_products: {
        Row: {
          created_at: string | null
          expiration_date: string | null
          groupid: number | null
          id: number
          is_active: boolean | null
          place: string | null
          price: number | null
          productid: string | null
          status: string | null
          userid: string
        }
        Insert: {
          created_at?: string | null
          expiration_date?: string | null
          groupid?: number | null
          id?: number
          is_active?: boolean | null
          place?: string | null
          price?: number | null
          productid?: string | null
          status?: string | null
          userid: string
        }
        Update: {
          created_at?: string | null
          expiration_date?: string | null
          groupid?: number | null
          id?: number
          is_active?: boolean | null
          place?: string | null
          price?: number | null
          productid?: string | null
          status?: string | null
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: 'group_products_groupid_fkey'
            columns: ['groupid']
            isOneToOne: false
            referencedRelation: 'groups'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'group_products_productid_fkey'
            columns: ['productid']
            isOneToOne: false
            referencedRelation: 'product_search_results'
            referencedColumns: ['code']
          },
          {
            foreignKeyName: 'group_products_productid_fkey'
            columns: ['productid']
            isOneToOne: false
            referencedRelation: 'product_search_results'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'group_products_productid_fkey'
            columns: ['productid']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['code']
          },
          {
            foreignKeyName: 'group_products_userid_fkey1'
            columns: ['userid']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      group_shoppinglists: {
        Row: {
          created_at: string
          groupid: number | null
          id: number
          productid: string | null
        }
        Insert: {
          created_at?: string
          groupid?: number | null
          id?: number
          productid?: string | null
        }
        Update: {
          created_at?: string
          groupid?: number | null
          id?: number
          productid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'group_shoppinglists_groupid_fkey'
            columns: ['groupid']
            isOneToOne: false
            referencedRelation: 'groups'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'group_shoppinglists_productid_fkey'
            columns: ['productid']
            isOneToOne: false
            referencedRelation: 'product_search_results'
            referencedColumns: ['code']
          },
          {
            foreignKeyName: 'group_shoppinglists_productid_fkey'
            columns: ['productid']
            isOneToOne: false
            referencedRelation: 'product_search_results'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'group_shoppinglists_productid_fkey'
            columns: ['productid']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['code']
          }
        ]
      }
      groups: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      ingredients: {
        Row: {
          ai_keywords: string[] | null
          created_at: string
          id: number
          ingredient_embedding: string | null
          ingredient_tsvector: unknown
          name: string
        }
        Insert: {
          ai_keywords?: string[] | null
          created_at?: string
          id?: number
          ingredient_embedding?: string | null
          ingredient_tsvector?: unknown
          name: string
        }
        Update: {
          ai_keywords?: string[] | null
          created_at?: string
          id?: number
          ingredient_embedding?: string | null
          ingredient_tsvector?: unknown
          name?: string
        }
        Relationships: []
      }
      installs: {
        Row: {
          expo_tokens: string[] | null
          user_id: string
        }
        Insert: {
          expo_tokens?: string[] | null
          user_id: string
        }
        Update: {
          expo_tokens?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      invites: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string | null
          fromid: string | null
          groupid: number | null
          id: number
          status: string | null
          userid: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at?: string | null
          fromid?: string | null
          groupid?: number | null
          id?: number
          status?: string | null
          userid?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string | null
          fromid?: string | null
          groupid?: number | null
          id?: number
          status?: string | null
          userid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'invites_fromid_fkey'
            columns: ['fromid']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'invites_groupid_fkey'
            columns: ['groupid']
            isOneToOne: false
            referencedRelation: 'groups'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'invites_userid_fkey'
            columns: ['userid']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      meal_ingredient: {
        Row: {
          ingredientid: number
          mealid: number
          quantity: number | null
          unit: string | null
        }
        Insert: {
          ingredientid: number
          mealid: number
          quantity?: number | null
          unit?: string | null
        }
        Update: {
          ingredientid?: number
          mealid?: number
          quantity?: number | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'mealingredient_ingredient_fk'
            columns: ['ingredientid']
            isOneToOne: false
            referencedRelation: 'ingredients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'mealingredient_mealid_fkey'
            columns: ['mealid']
            isOneToOne: false
            referencedRelation: 'meals'
            referencedColumns: ['id']
          }
        ]
      }
      mealproduct: {
        Row: {
          created_at: string | null
          groupid: number | null
          id: string
          mealid: number | null
          productid: number | null
        }
        Insert: {
          created_at?: string | null
          groupid?: number | null
          id?: string
          mealid?: number | null
          productid?: number | null
        }
        Update: {
          created_at?: string | null
          groupid?: number | null
          id?: string
          mealid?: number | null
          productid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'mealproduct_groupid_fkey'
            columns: ['groupid']
            isOneToOne: false
            referencedRelation: 'groups'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'mealproduct_mealid_fkey'
            columns: ['mealid']
            isOneToOne: false
            referencedRelation: 'meals'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'mealproduct_productid_fkey'
            columns: ['productid']
            isOneToOne: false
            referencedRelation: 'group_products'
            referencedColumns: ['id']
          }
        ]
      }
      meals: {
        Row: {
          calories: number | null
          carbohydrates: number | null
          category: string
          description: string
          difficulty: string | null
          energy: number | null
          fat: number | null
          id: number
          image: string
          name: string
          protein: number | null
          servingsize: string
          sodium: number | null
          steps: string[] | null
          sugar: number | null
          time: number | null
          type: string | null
        }
        Insert: {
          calories?: number | null
          carbohydrates?: number | null
          category: string
          description: string
          difficulty?: string | null
          energy?: number | null
          fat?: number | null
          id?: number
          image: string
          name: string
          protein?: number | null
          servingsize: string
          sodium?: number | null
          steps?: string[] | null
          sugar?: number | null
          time?: number | null
          type?: string | null
        }
        Update: {
          calories?: number | null
          carbohydrates?: number | null
          category?: string
          description?: string
          difficulty?: string | null
          energy?: number | null
          fat?: number | null
          id?: number
          image?: string
          name?: string
          protein?: number | null
          servingsize?: string
          sodium?: number | null
          steps?: string[] | null
          sugar?: number | null
          time?: number | null
          type?: string | null
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          quiet_hours: Json
          recommendations: boolean
          reengagement: boolean
          shopping_mealplan: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          quiet_hours?: Json
          recommendations?: boolean
          reengagement?: boolean
          shopping_mealplan?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          quiet_hours?: Json
          recommendations?: boolean
          reengagement?: boolean
          shopping_mealplan?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications_queue: {
        Row: {
          attempts: number
          content_id: string
          created_at: string
          id: number
          last_error: string | null
          payload: Json
          schedule_after: string
          type: string
          user_id: string
        }
        Insert: {
          attempts?: number
          content_id: string
          created_at?: string
          id?: number
          last_error?: string | null
          payload?: Json
          schedule_after: string
          type: string
          user_id: string
        }
        Update: {
          attempts?: number
          content_id?: string
          created_at?: string
          id?: number
          last_error?: string | null
          payload?: Json
          schedule_after?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications_sent: {
        Row: {
          content_id: string
          sent_at: string
          type: string
          user_id: string
        }
        Insert: {
          content_id: string
          sent_at?: string
          type: string
          user_id: string
        }
        Update: {
          content_id?: string
          sent_at?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          abbreviated_product_name: string | null
          acidity_100g: string | null
          'added-salt_100g': string | null
          'added-sugars_100g': string | null
          additives: string | null
          additives_en: string | null
          additives_n: number | null
          additives_tags: string | null
          alcohol_100g: string | null
          allergens: string | null
          allergens_en: string | null
          'alpha-linolenic-acid_100g': string | null
          'arachidic-acid_100g': string | null
          'arachidonic-acid_100g': string | null
          'behenic-acid_100g': string | null
          'beta-carotene_100g': string | null
          'beta-glucan_100g': string | null
          bicarbonate_100g: string | null
          biotin_100g: string | null
          brand_owner: string | null
          brands: string | null
          brands_en: string | null
          brands_tags: string | null
          'butyric-acid_100g': string | null
          caffeine_100g: string | null
          calcium_100g: string | null
          'capric-acid_100g': string | null
          'caproic-acid_100g': string | null
          'caprylic-acid_100g': string | null
          carbohydrates_100g: string | null
          'carbohydrates-total_100g': string | null
          'carbon-footprint_100g': string | null
          'carbon-footprint-from-meat-or-fish_100g': string | null
          carnitine_100g: string | null
          casein_100g: string | null
          categories: string | null
          categories_en: string | null
          categories_tags: string | null
          'cerotic-acid_100g': string | null
          chloride_100g: string | null
          chlorophyl_100g: string | null
          cholesterol_100g: string | null
          choline_100g: string | null
          chromium_100g: string | null
          cities: string | null
          cities_tags: string | null
          cocoa_100g: string | null
          code: string
          'collagen-meat-protein-ratio_100g': string | null
          completeness: number | null
          copper_100g: string | null
          countries: string | null
          countries_en: string | null
          countries_tags: string | null
          created_datetime: string | null
          created_t: number | null
          creator: string | null
          data_quality_errors_tags: string | null
          'dihomo-gamma-linolenic-acid_100g': string | null
          'docosahexaenoic-acid_100g': string | null
          'eicosapentaenoic-acid_100g': string | null
          'elaidic-acid_100g': string | null
          emb_codes: string | null
          emb_codes_tags: string | null
          energy_100g: string | null
          'energy-from-fat_100g': string | null
          'energy-kcal_100g': string | null
          'energy-kj_100g': string | null
          environmental_score_grade: string | null
          environmental_score_score: string | null
          'erucic-acid_100g': string | null
          erythritol_100g: string | null
          fat_100g: string | null
          fiber_100g: string | null
          first_packaging_code_geo: string | null
          fluoride_100g: string | null
          folates_100g: string | null
          food_groups: string | null
          food_groups_en: string | null
          food_groups_tags: string | null
          fructose_100g: string | null
          'fruits-vegetables-nuts_100g': string | null
          'fruits-vegetables-nuts-dried_100g': string | null
          'fruits-vegetables-nuts-estimate_100g': string | null
          'fruits-vegetables-nuts-estimate-from-ingredients_100g': string | null
          galactose_100g: string | null
          'gamma-linolenic-acid_100g': string | null
          generic_name: string | null
          generic_names: string[] | null
          glucose_100g: string | null
          'glycemic-index_100g': string | null
          'gondoic-acid_100g': string | null
          image_ingredients_small_url: string | null
          image_ingredients_url: string | null
          image_nutrition_small_url: string | null
          image_nutrition_url: string | null
          image_small_url: string | null
          image_url: string | null
          ingredients_analysis_tags: string | null
          ingredients_tags: string | null
          ingredients_text: string | null
          inositol_100g: string | null
          'insoluble-fiber_100g': string | null
          iodine_100g: string | null
          iron_100g: string | null
          labels: string | null
          labels_en: string | null
          labels_tags: string | null
          lactose_100g: string | null
          last_image_datetime: string | null
          last_image_t: number | null
          last_modified_by: string | null
          last_modified_datetime: string | null
          last_modified_t: number | null
          last_updated_datetime: string | null
          last_updated_t: number | null
          'lauric-acid_100g': string | null
          'lignoceric-acid_100g': string | null
          'linoleic-acid_100g': string | null
          magnesium_100g: string | null
          main_category: string | null
          main_category_en: string | null
          maltodextrins_100g: string | null
          maltose_100g: string | null
          manganese_100g: string | null
          manufacturing_places: string | null
          manufacturing_places_tags: string | null
          'mead-acid_100g': string | null
          'melissic-acid_100g': string | null
          methylsulfonylmethane_100g: string | null
          molybdenum_100g: string | null
          'monounsaturated-fat_100g': string | null
          'montanic-acid_100g': string | null
          'myristic-acid_100g': string | null
          'nervonic-acid_100g': string | null
          nitrate_100g: string | null
          no_nutrition_data: string | null
          nova_group: number | null
          nucleotides_100g: string | null
          nutrient_levels_tags: string | null
          nutriscore_grade: string | null
          nutriscore_score: string | null
          'nutrition-score-fr_100g': string | null
          'nutrition-score-uk_100g': string | null
          'oleic-acid_100g': string | null
          'omega-3-fat_100g': string | null
          'omega-6-fat_100g': string | null
          'omega-9-fat_100g': string | null
          origins: string | null
          origins_en: string | null
          origins_tags: string | null
          owner: string | null
          packaging: string | null
          packaging_en: string | null
          packaging_tags: string | null
          packaging_text: string | null
          'palmitic-acid_100g': string | null
          'pantothenic-acid_100g': string | null
          ph_100g: string | null
          phosphorus_100g: string | null
          phylloquinone_100g: string | null
          pnns_groups: string | null
          pnns_groups_2: string | null
          polyols_100g: string | null
          'polyunsaturated-fat_100g': string | null
          popularity_tags: string | null
          potassium_100g: string | null
          product_name: string | null
          product_quantity: number | null
          proteins_100g: string | null
          purchase_places: string | null
          quantity: string | null
          salt_100g: string | null
          'saturated-fat_100g': string | null
          selenium_100g: string | null
          'serum-proteins_100g': string | null
          serving_quantity: number | null
          serving_size: string | null
          silica_100g: string | null
          sodium_100g: string | null
          'soluble-fiber_100g': string | null
          starch_100g: string | null
          states: string | null
          states_en: string | null
          states_tags: string | null
          'stearic-acid_100g': string | null
          stores: string | null
          sucrose_100g: string | null
          sugars_100g: string | null
          sulphate_100g: string | null
          taurine_100g: string | null
          traces: string | null
          traces_en: string | null
          traces_tags: string | null
          'trans-fat_100g': string | null
          unique_scans_n: number | null
          'unsaturated-fat_100g': string | null
          url: string | null
          'vitamin-a_100g': string | null
          'vitamin-b1_100g': string | null
          'vitamin-b12_100g': string | null
          'vitamin-b2_100g': string | null
          'vitamin-b6_100g': string | null
          'vitamin-b9_100g': string | null
          'vitamin-c_100g': string | null
          'vitamin-d_100g': string | null
          'vitamin-e_100g': string | null
          'vitamin-k_100g': string | null
          'vitamin-pp_100g': string | null
          'water-hardness_100g': string | null
          zinc_100g: string | null
        }
        Insert: {
          abbreviated_product_name?: string | null
          acidity_100g?: string | null
          'added-salt_100g'?: string | null
          'added-sugars_100g'?: string | null
          additives?: string | null
          additives_en?: string | null
          additives_n?: number | null
          additives_tags?: string | null
          alcohol_100g?: string | null
          allergens?: string | null
          allergens_en?: string | null
          'alpha-linolenic-acid_100g'?: string | null
          'arachidic-acid_100g'?: string | null
          'arachidonic-acid_100g'?: string | null
          'behenic-acid_100g'?: string | null
          'beta-carotene_100g'?: string | null
          'beta-glucan_100g'?: string | null
          bicarbonate_100g?: string | null
          biotin_100g?: string | null
          brand_owner?: string | null
          brands?: string | null
          brands_en?: string | null
          brands_tags?: string | null
          'butyric-acid_100g'?: string | null
          caffeine_100g?: string | null
          calcium_100g?: string | null
          'capric-acid_100g'?: string | null
          'caproic-acid_100g'?: string | null
          'caprylic-acid_100g'?: string | null
          carbohydrates_100g?: string | null
          'carbohydrates-total_100g'?: string | null
          'carbon-footprint_100g'?: string | null
          'carbon-footprint-from-meat-or-fish_100g'?: string | null
          carnitine_100g?: string | null
          casein_100g?: string | null
          categories?: string | null
          categories_en?: string | null
          categories_tags?: string | null
          'cerotic-acid_100g'?: string | null
          chloride_100g?: string | null
          chlorophyl_100g?: string | null
          cholesterol_100g?: string | null
          choline_100g?: string | null
          chromium_100g?: string | null
          cities?: string | null
          cities_tags?: string | null
          cocoa_100g?: string | null
          code: string
          'collagen-meat-protein-ratio_100g'?: string | null
          completeness?: number | null
          copper_100g?: string | null
          countries?: string | null
          countries_en?: string | null
          countries_tags?: string | null
          created_datetime?: string | null
          created_t?: number | null
          creator?: string | null
          data_quality_errors_tags?: string | null
          'dihomo-gamma-linolenic-acid_100g'?: string | null
          'docosahexaenoic-acid_100g'?: string | null
          'eicosapentaenoic-acid_100g'?: string | null
          'elaidic-acid_100g'?: string | null
          emb_codes?: string | null
          emb_codes_tags?: string | null
          energy_100g?: string | null
          'energy-from-fat_100g'?: string | null
          'energy-kcal_100g'?: string | null
          'energy-kj_100g'?: string | null
          environmental_score_grade?: string | null
          environmental_score_score?: string | null
          'erucic-acid_100g'?: string | null
          erythritol_100g?: string | null
          fat_100g?: string | null
          fiber_100g?: string | null
          first_packaging_code_geo?: string | null
          fluoride_100g?: string | null
          folates_100g?: string | null
          food_groups?: string | null
          food_groups_en?: string | null
          food_groups_tags?: string | null
          fructose_100g?: string | null
          'fruits-vegetables-nuts_100g'?: string | null
          'fruits-vegetables-nuts-dried_100g'?: string | null
          'fruits-vegetables-nuts-estimate_100g'?: string | null
          'fruits-vegetables-nuts-estimate-from-ingredients_100g'?: string | null
          galactose_100g?: string | null
          'gamma-linolenic-acid_100g'?: string | null
          generic_name?: string | null
          generic_names?: string[] | null
          glucose_100g?: string | null
          'glycemic-index_100g'?: string | null
          'gondoic-acid_100g'?: string | null
          image_ingredients_small_url?: string | null
          image_ingredients_url?: string | null
          image_nutrition_small_url?: string | null
          image_nutrition_url?: string | null
          image_small_url?: string | null
          image_url?: string | null
          ingredients_analysis_tags?: string | null
          ingredients_tags?: string | null
          ingredients_text?: string | null
          inositol_100g?: string | null
          'insoluble-fiber_100g'?: string | null
          iodine_100g?: string | null
          iron_100g?: string | null
          labels?: string | null
          labels_en?: string | null
          labels_tags?: string | null
          lactose_100g?: string | null
          last_image_datetime?: string | null
          last_image_t?: number | null
          last_modified_by?: string | null
          last_modified_datetime?: string | null
          last_modified_t?: number | null
          last_updated_datetime?: string | null
          last_updated_t?: number | null
          'lauric-acid_100g'?: string | null
          'lignoceric-acid_100g'?: string | null
          'linoleic-acid_100g'?: string | null
          magnesium_100g?: string | null
          main_category?: string | null
          main_category_en?: string | null
          maltodextrins_100g?: string | null
          maltose_100g?: string | null
          manganese_100g?: string | null
          manufacturing_places?: string | null
          manufacturing_places_tags?: string | null
          'mead-acid_100g'?: string | null
          'melissic-acid_100g'?: string | null
          methylsulfonylmethane_100g?: string | null
          molybdenum_100g?: string | null
          'monounsaturated-fat_100g'?: string | null
          'montanic-acid_100g'?: string | null
          'myristic-acid_100g'?: string | null
          'nervonic-acid_100g'?: string | null
          nitrate_100g?: string | null
          no_nutrition_data?: string | null
          nova_group?: number | null
          nucleotides_100g?: string | null
          nutrient_levels_tags?: string | null
          nutriscore_grade?: string | null
          nutriscore_score?: string | null
          'nutrition-score-fr_100g'?: string | null
          'nutrition-score-uk_100g'?: string | null
          'oleic-acid_100g'?: string | null
          'omega-3-fat_100g'?: string | null
          'omega-6-fat_100g'?: string | null
          'omega-9-fat_100g'?: string | null
          origins?: string | null
          origins_en?: string | null
          origins_tags?: string | null
          owner?: string | null
          packaging?: string | null
          packaging_en?: string | null
          packaging_tags?: string | null
          packaging_text?: string | null
          'palmitic-acid_100g'?: string | null
          'pantothenic-acid_100g'?: string | null
          ph_100g?: string | null
          phosphorus_100g?: string | null
          phylloquinone_100g?: string | null
          pnns_groups?: string | null
          pnns_groups_2?: string | null
          polyols_100g?: string | null
          'polyunsaturated-fat_100g'?: string | null
          popularity_tags?: string | null
          potassium_100g?: string | null
          product_name?: string | null
          product_quantity?: number | null
          proteins_100g?: string | null
          purchase_places?: string | null
          quantity?: string | null
          salt_100g?: string | null
          'saturated-fat_100g'?: string | null
          selenium_100g?: string | null
          'serum-proteins_100g'?: string | null
          serving_quantity?: number | null
          serving_size?: string | null
          silica_100g?: string | null
          sodium_100g?: string | null
          'soluble-fiber_100g'?: string | null
          starch_100g?: string | null
          states?: string | null
          states_en?: string | null
          states_tags?: string | null
          'stearic-acid_100g'?: string | null
          stores?: string | null
          sucrose_100g?: string | null
          sugars_100g?: string | null
          sulphate_100g?: string | null
          taurine_100g?: string | null
          traces?: string | null
          traces_en?: string | null
          traces_tags?: string | null
          'trans-fat_100g'?: string | null
          unique_scans_n?: number | null
          'unsaturated-fat_100g'?: string | null
          url?: string | null
          'vitamin-a_100g'?: string | null
          'vitamin-b1_100g'?: string | null
          'vitamin-b12_100g'?: string | null
          'vitamin-b2_100g'?: string | null
          'vitamin-b6_100g'?: string | null
          'vitamin-b9_100g'?: string | null
          'vitamin-c_100g'?: string | null
          'vitamin-d_100g'?: string | null
          'vitamin-e_100g'?: string | null
          'vitamin-k_100g'?: string | null
          'vitamin-pp_100g'?: string | null
          'water-hardness_100g'?: string | null
          zinc_100g?: string | null
        }
        Update: {
          abbreviated_product_name?: string | null
          acidity_100g?: string | null
          'added-salt_100g'?: string | null
          'added-sugars_100g'?: string | null
          additives?: string | null
          additives_en?: string | null
          additives_n?: number | null
          additives_tags?: string | null
          alcohol_100g?: string | null
          allergens?: string | null
          allergens_en?: string | null
          'alpha-linolenic-acid_100g'?: string | null
          'arachidic-acid_100g'?: string | null
          'arachidonic-acid_100g'?: string | null
          'behenic-acid_100g'?: string | null
          'beta-carotene_100g'?: string | null
          'beta-glucan_100g'?: string | null
          bicarbonate_100g?: string | null
          biotin_100g?: string | null
          brand_owner?: string | null
          brands?: string | null
          brands_en?: string | null
          brands_tags?: string | null
          'butyric-acid_100g'?: string | null
          caffeine_100g?: string | null
          calcium_100g?: string | null
          'capric-acid_100g'?: string | null
          'caproic-acid_100g'?: string | null
          'caprylic-acid_100g'?: string | null
          carbohydrates_100g?: string | null
          'carbohydrates-total_100g'?: string | null
          'carbon-footprint_100g'?: string | null
          'carbon-footprint-from-meat-or-fish_100g'?: string | null
          carnitine_100g?: string | null
          casein_100g?: string | null
          categories?: string | null
          categories_en?: string | null
          categories_tags?: string | null
          'cerotic-acid_100g'?: string | null
          chloride_100g?: string | null
          chlorophyl_100g?: string | null
          cholesterol_100g?: string | null
          choline_100g?: string | null
          chromium_100g?: string | null
          cities?: string | null
          cities_tags?: string | null
          cocoa_100g?: string | null
          code?: string
          'collagen-meat-protein-ratio_100g'?: string | null
          completeness?: number | null
          copper_100g?: string | null
          countries?: string | null
          countries_en?: string | null
          countries_tags?: string | null
          created_datetime?: string | null
          created_t?: number | null
          creator?: string | null
          data_quality_errors_tags?: string | null
          'dihomo-gamma-linolenic-acid_100g'?: string | null
          'docosahexaenoic-acid_100g'?: string | null
          'eicosapentaenoic-acid_100g'?: string | null
          'elaidic-acid_100g'?: string | null
          emb_codes?: string | null
          emb_codes_tags?: string | null
          energy_100g?: string | null
          'energy-from-fat_100g'?: string | null
          'energy-kcal_100g'?: string | null
          'energy-kj_100g'?: string | null
          environmental_score_grade?: string | null
          environmental_score_score?: string | null
          'erucic-acid_100g'?: string | null
          erythritol_100g?: string | null
          fat_100g?: string | null
          fiber_100g?: string | null
          first_packaging_code_geo?: string | null
          fluoride_100g?: string | null
          folates_100g?: string | null
          food_groups?: string | null
          food_groups_en?: string | null
          food_groups_tags?: string | null
          fructose_100g?: string | null
          'fruits-vegetables-nuts_100g'?: string | null
          'fruits-vegetables-nuts-dried_100g'?: string | null
          'fruits-vegetables-nuts-estimate_100g'?: string | null
          'fruits-vegetables-nuts-estimate-from-ingredients_100g'?: string | null
          galactose_100g?: string | null
          'gamma-linolenic-acid_100g'?: string | null
          generic_name?: string | null
          generic_names?: string[] | null
          glucose_100g?: string | null
          'glycemic-index_100g'?: string | null
          'gondoic-acid_100g'?: string | null
          image_ingredients_small_url?: string | null
          image_ingredients_url?: string | null
          image_nutrition_small_url?: string | null
          image_nutrition_url?: string | null
          image_small_url?: string | null
          image_url?: string | null
          ingredients_analysis_tags?: string | null
          ingredients_tags?: string | null
          ingredients_text?: string | null
          inositol_100g?: string | null
          'insoluble-fiber_100g'?: string | null
          iodine_100g?: string | null
          iron_100g?: string | null
          labels?: string | null
          labels_en?: string | null
          labels_tags?: string | null
          lactose_100g?: string | null
          last_image_datetime?: string | null
          last_image_t?: number | null
          last_modified_by?: string | null
          last_modified_datetime?: string | null
          last_modified_t?: number | null
          last_updated_datetime?: string | null
          last_updated_t?: number | null
          'lauric-acid_100g'?: string | null
          'lignoceric-acid_100g'?: string | null
          'linoleic-acid_100g'?: string | null
          magnesium_100g?: string | null
          main_category?: string | null
          main_category_en?: string | null
          maltodextrins_100g?: string | null
          maltose_100g?: string | null
          manganese_100g?: string | null
          manufacturing_places?: string | null
          manufacturing_places_tags?: string | null
          'mead-acid_100g'?: string | null
          'melissic-acid_100g'?: string | null
          methylsulfonylmethane_100g?: string | null
          molybdenum_100g?: string | null
          'monounsaturated-fat_100g'?: string | null
          'montanic-acid_100g'?: string | null
          'myristic-acid_100g'?: string | null
          'nervonic-acid_100g'?: string | null
          nitrate_100g?: string | null
          no_nutrition_data?: string | null
          nova_group?: number | null
          nucleotides_100g?: string | null
          nutrient_levels_tags?: string | null
          nutriscore_grade?: string | null
          nutriscore_score?: string | null
          'nutrition-score-fr_100g'?: string | null
          'nutrition-score-uk_100g'?: string | null
          'oleic-acid_100g'?: string | null
          'omega-3-fat_100g'?: string | null
          'omega-6-fat_100g'?: string | null
          'omega-9-fat_100g'?: string | null
          origins?: string | null
          origins_en?: string | null
          origins_tags?: string | null
          owner?: string | null
          packaging?: string | null
          packaging_en?: string | null
          packaging_tags?: string | null
          packaging_text?: string | null
          'palmitic-acid_100g'?: string | null
          'pantothenic-acid_100g'?: string | null
          ph_100g?: string | null
          phosphorus_100g?: string | null
          phylloquinone_100g?: string | null
          pnns_groups?: string | null
          pnns_groups_2?: string | null
          polyols_100g?: string | null
          'polyunsaturated-fat_100g'?: string | null
          popularity_tags?: string | null
          potassium_100g?: string | null
          product_name?: string | null
          product_quantity?: number | null
          proteins_100g?: string | null
          purchase_places?: string | null
          quantity?: string | null
          salt_100g?: string | null
          'saturated-fat_100g'?: string | null
          selenium_100g?: string | null
          'serum-proteins_100g'?: string | null
          serving_quantity?: number | null
          serving_size?: string | null
          silica_100g?: string | null
          sodium_100g?: string | null
          'soluble-fiber_100g'?: string | null
          starch_100g?: string | null
          states?: string | null
          states_en?: string | null
          states_tags?: string | null
          'stearic-acid_100g'?: string | null
          stores?: string | null
          sucrose_100g?: string | null
          sugars_100g?: string | null
          sulphate_100g?: string | null
          taurine_100g?: string | null
          traces?: string | null
          traces_en?: string | null
          traces_tags?: string | null
          'trans-fat_100g'?: string | null
          unique_scans_n?: number | null
          'unsaturated-fat_100g'?: string | null
          url?: string | null
          'vitamin-a_100g'?: string | null
          'vitamin-b1_100g'?: string | null
          'vitamin-b12_100g'?: string | null
          'vitamin-b2_100g'?: string | null
          'vitamin-b6_100g'?: string | null
          'vitamin-b9_100g'?: string | null
          'vitamin-c_100g'?: string | null
          'vitamin-d_100g'?: string | null
          'vitamin-e_100g'?: string | null
          'vitamin-k_100g'?: string | null
          'vitamin-pp_100g'?: string | null
          'water-hardness_100g'?: string | null
          zinc_100g?: string | null
        }
        Relationships: []
      }
      products_embedding: {
        Row: {
          name_embedding: string | null
          name_vector: unknown
          product_id: string
        }
        Insert: {
          name_embedding?: string | null
          name_vector?: unknown
          product_id: string
        }
        Update: {
          name_embedding?: string | null
          name_vector?: unknown
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'products_embedding_product_id_fkey'
            columns: ['product_id']
            isOneToOne: true
            referencedRelation: 'product_search_results'
            referencedColumns: ['code']
          },
          {
            foreignKeyName: 'products_embedding_product_id_fkey'
            columns: ['product_id']
            isOneToOne: true
            referencedRelation: 'product_search_results'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'products_embedding_product_id_fkey'
            columns: ['product_id']
            isOneToOne: true
            referencedRelation: 'products'
            referencedColumns: ['code']
          }
        ]
      }
      profiles: {
        Row: {
          about: string | null
          allergens: string[] | null
          avatar_url: string | null
          dailyCalorieIntake: number
          details_complete: boolean | null
          email: string | null
          gender: string | null
          id: string
          is_premium: boolean
          joined_at: string | null
          name: string | null
          weight: number | null
        }
        Insert: {
          about?: string | null
          allergens?: string[] | null
          avatar_url?: string | null
          dailyCalorieIntake?: number
          details_complete?: boolean | null
          email?: string | null
          gender?: string | null
          id: string
          is_premium?: boolean
          joined_at?: string | null
          name?: string | null
          weight?: number | null
        }
        Update: {
          about?: string | null
          allergens?: string[] | null
          avatar_url?: string | null
          dailyCalorieIntake?: number
          details_complete?: boolean | null
          email?: string | null
          gender?: string | null
          id?: string
          is_premium?: boolean
          joined_at?: string | null
          name?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      stats: {
        Row: {
          created_at: string | null
          date: string
          groupid: number
          id: string
          mealid: string | null
          productid: number | null
        }
        Insert: {
          created_at?: string | null
          date: string
          groupid: number
          id?: string
          mealid?: string | null
          productid?: number | null
        }
        Update: {
          created_at?: string | null
          date?: string
          groupid?: number
          id?: string
          mealid?: string | null
          productid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'stats_groupid_fkey'
            columns: ['groupid']
            isOneToOne: false
            referencedRelation: 'groups'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'stats_mealid_fkey'
            columns: ['mealid']
            isOneToOne: false
            referencedRelation: 'group_meals'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'stats_productid_fkey'
            columns: ['productid']
            isOneToOne: false
            referencedRelation: 'group_products'
            referencedColumns: ['id']
          }
        ]
      }
      user_groups: {
        Row: {
          groupid: number | null
          id: string
          userid: string | null
        }
        Insert: {
          groupid?: number | null
          id?: string
          userid?: string | null
        }
        Update: {
          groupid?: number | null
          id?: string
          userid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'user_groups_groupid_fkey'
            columns: ['groupid']
            isOneToOne: false
            referencedRelation: 'groups'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'user_groups_userid_fkey1'
            columns: ['userid']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      product_search_results: {
        Row: {
          abbreviated_product_name: string | null
          acidity_100g: string | null
          'added-salt_100g': string | null
          'added-sugars_100g': string | null
          additives: string | null
          additives_en: string | null
          additives_n: number | null
          additives_tags: string | null
          alcohol_100g: string | null
          allergens: string | null
          allergens_en: string | null
          'alpha-linolenic-acid_100g': string | null
          'arachidic-acid_100g': string | null
          'arachidonic-acid_100g': string | null
          'behenic-acid_100g': string | null
          'beta-carotene_100g': string | null
          'beta-glucan_100g': string | null
          bicarbonate_100g: string | null
          biotin_100g: string | null
          brand_owner: string | null
          brands: string | null
          brands_en: string | null
          brands_tags: string | null
          'butyric-acid_100g': string | null
          caffeine_100g: string | null
          calcium_100g: string | null
          'capric-acid_100g': string | null
          'caproic-acid_100g': string | null
          'caprylic-acid_100g': string | null
          carbohydrates_100g: string | null
          'carbohydrates-total_100g': string | null
          'carbon-footprint_100g': string | null
          'carbon-footprint-from-meat-or-fish_100g': string | null
          carnitine_100g: string | null
          casein_100g: string | null
          categories: string | null
          categories_en: string | null
          categories_tags: string | null
          'cerotic-acid_100g': string | null
          chloride_100g: string | null
          chlorophyl_100g: string | null
          cholesterol_100g: string | null
          choline_100g: string | null
          chromium_100g: string | null
          cities: string | null
          cities_tags: string | null
          cocoa_100g: string | null
          code: string | null
          'collagen-meat-protein-ratio_100g': string | null
          completeness: number | null
          copper_100g: string | null
          countries: string | null
          countries_en: string | null
          countries_tags: string | null
          created_datetime: string | null
          created_t: number | null
          creator: string | null
          data_quality_errors_tags: string | null
          'dihomo-gamma-linolenic-acid_100g': string | null
          'docosahexaenoic-acid_100g': string | null
          'eicosapentaenoic-acid_100g': string | null
          'elaidic-acid_100g': string | null
          emb_codes: string | null
          emb_codes_tags: string | null
          energy_100g: string | null
          'energy-from-fat_100g': string | null
          'energy-kcal_100g': string | null
          'energy-kj_100g': string | null
          environmental_score_grade: string | null
          environmental_score_score: string | null
          'erucic-acid_100g': string | null
          erythritol_100g: string | null
          fat_100g: string | null
          fiber_100g: string | null
          first_packaging_code_geo: string | null
          fluoride_100g: string | null
          folates_100g: string | null
          food_groups: string | null
          food_groups_en: string | null
          food_groups_tags: string | null
          fructose_100g: string | null
          'fruits-vegetables-nuts_100g': string | null
          'fruits-vegetables-nuts-dried_100g': string | null
          'fruits-vegetables-nuts-estimate_100g': string | null
          'fruits-vegetables-nuts-estimate-from-ingredients_100g': string | null
          galactose_100g: string | null
          'gamma-linolenic-acid_100g': string | null
          generic_name: string | null
          generic_names: string[] | null
          glucose_100g: string | null
          'glycemic-index_100g': string | null
          'gondoic-acid_100g': string | null
          id: string | null
          image_ingredients_small_url: string | null
          image_ingredients_url: string | null
          image_nutrition_small_url: string | null
          image_nutrition_url: string | null
          image_small_url: string | null
          image_url: string | null
          ingredients_analysis_tags: string | null
          ingredients_tags: string | null
          ingredients_text: string | null
          inositol_100g: string | null
          'insoluble-fiber_100g': string | null
          iodine_100g: string | null
          iron_100g: string | null
          labels: string | null
          labels_en: string | null
          labels_tags: string | null
          lactose_100g: string | null
          last_image_datetime: string | null
          last_image_t: number | null
          last_modified_by: string | null
          last_modified_datetime: string | null
          last_modified_t: number | null
          last_updated_datetime: string | null
          last_updated_t: number | null
          'lauric-acid_100g': string | null
          'lignoceric-acid_100g': string | null
          'linoleic-acid_100g': string | null
          magnesium_100g: string | null
          main_category: string | null
          main_category_en: string | null
          maltodextrins_100g: string | null
          maltose_100g: string | null
          manganese_100g: string | null
          manufacturing_places: string | null
          manufacturing_places_tags: string | null
          'mead-acid_100g': string | null
          'melissic-acid_100g': string | null
          methylsulfonylmethane_100g: string | null
          molybdenum_100g: string | null
          'monounsaturated-fat_100g': string | null
          'montanic-acid_100g': string | null
          'myristic-acid_100g': string | null
          'nervonic-acid_100g': string | null
          nitrate_100g: string | null
          no_nutrition_data: string | null
          nova_group: number | null
          nucleotides_100g: string | null
          nutrient_levels_tags: string | null
          nutriscore_grade: string | null
          nutriscore_score: string | null
          'nutrition-score-fr_100g': string | null
          'nutrition-score-uk_100g': string | null
          'oleic-acid_100g': string | null
          'omega-3-fat_100g': string | null
          'omega-6-fat_100g': string | null
          'omega-9-fat_100g': string | null
          origins: string | null
          origins_en: string | null
          origins_tags: string | null
          owner: string | null
          packaging: string | null
          packaging_en: string | null
          packaging_tags: string | null
          packaging_text: string | null
          'palmitic-acid_100g': string | null
          'pantothenic-acid_100g': string | null
          ph_100g: string | null
          phosphorus_100g: string | null
          phylloquinone_100g: string | null
          pnns_groups: string | null
          pnns_groups_2: string | null
          polyols_100g: string | null
          'polyunsaturated-fat_100g': string | null
          popularity_tags: string | null
          potassium_100g: string | null
          product_name: string | null
          product_quantity: number | null
          proteins_100g: string | null
          purchase_places: string | null
          quantity: string | null
          salt_100g: string | null
          'saturated-fat_100g': string | null
          selenium_100g: string | null
          'serum-proteins_100g': string | null
          serving_quantity: number | null
          serving_size: string | null
          silica_100g: string | null
          sodium_100g: string | null
          'soluble-fiber_100g': string | null
          starch_100g: string | null
          states: string | null
          states_en: string | null
          states_tags: string | null
          'stearic-acid_100g': string | null
          stores: string | null
          sucrose_100g: string | null
          sugars_100g: string | null
          sulphate_100g: string | null
          taurine_100g: string | null
          traces: string | null
          traces_en: string | null
          traces_tags: string | null
          'trans-fat_100g': string | null
          unique_scans_n: number | null
          'unsaturated-fat_100g': string | null
          url: string | null
          'vitamin-a_100g': string | null
          'vitamin-b1_100g': string | null
          'vitamin-b12_100g': string | null
          'vitamin-b2_100g': string | null
          'vitamin-b6_100g': string | null
          'vitamin-b9_100g': string | null
          'vitamin-c_100g': string | null
          'vitamin-d_100g': string | null
          'vitamin-e_100g': string | null
          'vitamin-k_100g': string | null
          'vitamin-pp_100g': string | null
          'water-hardness_100g': string | null
          zinc_100g: string | null
        }
        Insert: {
          abbreviated_product_name?: string | null
          acidity_100g?: string | null
          'added-salt_100g'?: string | null
          'added-sugars_100g'?: string | null
          additives?: string | null
          additives_en?: string | null
          additives_n?: number | null
          additives_tags?: string | null
          alcohol_100g?: string | null
          allergens?: string | null
          allergens_en?: string | null
          'alpha-linolenic-acid_100g'?: string | null
          'arachidic-acid_100g'?: string | null
          'arachidonic-acid_100g'?: string | null
          'behenic-acid_100g'?: string | null
          'beta-carotene_100g'?: string | null
          'beta-glucan_100g'?: string | null
          bicarbonate_100g?: string | null
          biotin_100g?: string | null
          brand_owner?: string | null
          brands?: string | null
          brands_en?: string | null
          brands_tags?: string | null
          'butyric-acid_100g'?: string | null
          caffeine_100g?: string | null
          calcium_100g?: string | null
          'capric-acid_100g'?: string | null
          'caproic-acid_100g'?: string | null
          'caprylic-acid_100g'?: string | null
          carbohydrates_100g?: string | null
          'carbohydrates-total_100g'?: string | null
          'carbon-footprint_100g'?: string | null
          'carbon-footprint-from-meat-or-fish_100g'?: string | null
          carnitine_100g?: string | null
          casein_100g?: string | null
          categories?: string | null
          categories_en?: string | null
          categories_tags?: string | null
          'cerotic-acid_100g'?: string | null
          chloride_100g?: string | null
          chlorophyl_100g?: string | null
          cholesterol_100g?: string | null
          choline_100g?: string | null
          chromium_100g?: string | null
          cities?: string | null
          cities_tags?: string | null
          cocoa_100g?: string | null
          code?: string | null
          'collagen-meat-protein-ratio_100g'?: string | null
          completeness?: number | null
          copper_100g?: string | null
          countries?: string | null
          countries_en?: string | null
          countries_tags?: string | null
          created_datetime?: string | null
          created_t?: number | null
          creator?: string | null
          data_quality_errors_tags?: string | null
          'dihomo-gamma-linolenic-acid_100g'?: string | null
          'docosahexaenoic-acid_100g'?: string | null
          'eicosapentaenoic-acid_100g'?: string | null
          'elaidic-acid_100g'?: string | null
          emb_codes?: string | null
          emb_codes_tags?: string | null
          energy_100g?: string | null
          'energy-from-fat_100g'?: string | null
          'energy-kcal_100g'?: string | null
          'energy-kj_100g'?: string | null
          environmental_score_grade?: string | null
          environmental_score_score?: string | null
          'erucic-acid_100g'?: string | null
          erythritol_100g?: string | null
          fat_100g?: string | null
          fiber_100g?: string | null
          first_packaging_code_geo?: string | null
          fluoride_100g?: string | null
          folates_100g?: string | null
          food_groups?: string | null
          food_groups_en?: string | null
          food_groups_tags?: string | null
          fructose_100g?: string | null
          'fruits-vegetables-nuts_100g'?: string | null
          'fruits-vegetables-nuts-dried_100g'?: string | null
          'fruits-vegetables-nuts-estimate_100g'?: string | null
          'fruits-vegetables-nuts-estimate-from-ingredients_100g'?: string | null
          galactose_100g?: string | null
          'gamma-linolenic-acid_100g'?: string | null
          generic_name?: string | null
          generic_names?: string[] | null
          glucose_100g?: string | null
          'glycemic-index_100g'?: string | null
          'gondoic-acid_100g'?: string | null
          id?: string | null
          image_ingredients_small_url?: string | null
          image_ingredients_url?: string | null
          image_nutrition_small_url?: string | null
          image_nutrition_url?: string | null
          image_small_url?: string | null
          image_url?: string | null
          ingredients_analysis_tags?: string | null
          ingredients_tags?: string | null
          ingredients_text?: string | null
          inositol_100g?: string | null
          'insoluble-fiber_100g'?: string | null
          iodine_100g?: string | null
          iron_100g?: string | null
          labels?: string | null
          labels_en?: string | null
          labels_tags?: string | null
          lactose_100g?: string | null
          last_image_datetime?: string | null
          last_image_t?: number | null
          last_modified_by?: string | null
          last_modified_datetime?: string | null
          last_modified_t?: number | null
          last_updated_datetime?: string | null
          last_updated_t?: number | null
          'lauric-acid_100g'?: string | null
          'lignoceric-acid_100g'?: string | null
          'linoleic-acid_100g'?: string | null
          magnesium_100g?: string | null
          main_category?: string | null
          main_category_en?: string | null
          maltodextrins_100g?: string | null
          maltose_100g?: string | null
          manganese_100g?: string | null
          manufacturing_places?: string | null
          manufacturing_places_tags?: string | null
          'mead-acid_100g'?: string | null
          'melissic-acid_100g'?: string | null
          methylsulfonylmethane_100g?: string | null
          molybdenum_100g?: string | null
          'monounsaturated-fat_100g'?: string | null
          'montanic-acid_100g'?: string | null
          'myristic-acid_100g'?: string | null
          'nervonic-acid_100g'?: string | null
          nitrate_100g?: string | null
          no_nutrition_data?: string | null
          nova_group?: number | null
          nucleotides_100g?: string | null
          nutrient_levels_tags?: string | null
          nutriscore_grade?: string | null
          nutriscore_score?: string | null
          'nutrition-score-fr_100g'?: string | null
          'nutrition-score-uk_100g'?: string | null
          'oleic-acid_100g'?: string | null
          'omega-3-fat_100g'?: string | null
          'omega-6-fat_100g'?: string | null
          'omega-9-fat_100g'?: string | null
          origins?: string | null
          origins_en?: string | null
          origins_tags?: string | null
          owner?: string | null
          packaging?: string | null
          packaging_en?: string | null
          packaging_tags?: string | null
          packaging_text?: string | null
          'palmitic-acid_100g'?: string | null
          'pantothenic-acid_100g'?: string | null
          ph_100g?: string | null
          phosphorus_100g?: string | null
          phylloquinone_100g?: string | null
          pnns_groups?: string | null
          pnns_groups_2?: string | null
          polyols_100g?: string | null
          'polyunsaturated-fat_100g'?: string | null
          popularity_tags?: string | null
          potassium_100g?: string | null
          product_name?: string | null
          product_quantity?: number | null
          proteins_100g?: string | null
          purchase_places?: string | null
          quantity?: string | null
          salt_100g?: string | null
          'saturated-fat_100g'?: string | null
          selenium_100g?: string | null
          'serum-proteins_100g'?: string | null
          serving_quantity?: number | null
          serving_size?: string | null
          silica_100g?: string | null
          sodium_100g?: string | null
          'soluble-fiber_100g'?: string | null
          starch_100g?: string | null
          states?: string | null
          states_en?: string | null
          states_tags?: string | null
          'stearic-acid_100g'?: string | null
          stores?: string | null
          sucrose_100g?: string | null
          sugars_100g?: string | null
          sulphate_100g?: string | null
          taurine_100g?: string | null
          traces?: string | null
          traces_en?: string | null
          traces_tags?: string | null
          'trans-fat_100g'?: string | null
          unique_scans_n?: number | null
          'unsaturated-fat_100g'?: string | null
          url?: string | null
          'vitamin-a_100g'?: string | null
          'vitamin-b1_100g'?: string | null
          'vitamin-b12_100g'?: string | null
          'vitamin-b2_100g'?: string | null
          'vitamin-b6_100g'?: string | null
          'vitamin-b9_100g'?: string | null
          'vitamin-c_100g'?: string | null
          'vitamin-d_100g'?: string | null
          'vitamin-e_100g'?: string | null
          'vitamin-k_100g'?: string | null
          'vitamin-pp_100g'?: string | null
          'water-hardness_100g'?: string | null
          zinc_100g?: string | null
        }
        Update: {
          abbreviated_product_name?: string | null
          acidity_100g?: string | null
          'added-salt_100g'?: string | null
          'added-sugars_100g'?: string | null
          additives?: string | null
          additives_en?: string | null
          additives_n?: number | null
          additives_tags?: string | null
          alcohol_100g?: string | null
          allergens?: string | null
          allergens_en?: string | null
          'alpha-linolenic-acid_100g'?: string | null
          'arachidic-acid_100g'?: string | null
          'arachidonic-acid_100g'?: string | null
          'behenic-acid_100g'?: string | null
          'beta-carotene_100g'?: string | null
          'beta-glucan_100g'?: string | null
          bicarbonate_100g?: string | null
          biotin_100g?: string | null
          brand_owner?: string | null
          brands?: string | null
          brands_en?: string | null
          brands_tags?: string | null
          'butyric-acid_100g'?: string | null
          caffeine_100g?: string | null
          calcium_100g?: string | null
          'capric-acid_100g'?: string | null
          'caproic-acid_100g'?: string | null
          'caprylic-acid_100g'?: string | null
          carbohydrates_100g?: string | null
          'carbohydrates-total_100g'?: string | null
          'carbon-footprint_100g'?: string | null
          'carbon-footprint-from-meat-or-fish_100g'?: string | null
          carnitine_100g?: string | null
          casein_100g?: string | null
          categories?: string | null
          categories_en?: string | null
          categories_tags?: string | null
          'cerotic-acid_100g'?: string | null
          chloride_100g?: string | null
          chlorophyl_100g?: string | null
          cholesterol_100g?: string | null
          choline_100g?: string | null
          chromium_100g?: string | null
          cities?: string | null
          cities_tags?: string | null
          cocoa_100g?: string | null
          code?: string | null
          'collagen-meat-protein-ratio_100g'?: string | null
          completeness?: number | null
          copper_100g?: string | null
          countries?: string | null
          countries_en?: string | null
          countries_tags?: string | null
          created_datetime?: string | null
          created_t?: number | null
          creator?: string | null
          data_quality_errors_tags?: string | null
          'dihomo-gamma-linolenic-acid_100g'?: string | null
          'docosahexaenoic-acid_100g'?: string | null
          'eicosapentaenoic-acid_100g'?: string | null
          'elaidic-acid_100g'?: string | null
          emb_codes?: string | null
          emb_codes_tags?: string | null
          energy_100g?: string | null
          'energy-from-fat_100g'?: string | null
          'energy-kcal_100g'?: string | null
          'energy-kj_100g'?: string | null
          environmental_score_grade?: string | null
          environmental_score_score?: string | null
          'erucic-acid_100g'?: string | null
          erythritol_100g?: string | null
          fat_100g?: string | null
          fiber_100g?: string | null
          first_packaging_code_geo?: string | null
          fluoride_100g?: string | null
          folates_100g?: string | null
          food_groups?: string | null
          food_groups_en?: string | null
          food_groups_tags?: string | null
          fructose_100g?: string | null
          'fruits-vegetables-nuts_100g'?: string | null
          'fruits-vegetables-nuts-dried_100g'?: string | null
          'fruits-vegetables-nuts-estimate_100g'?: string | null
          'fruits-vegetables-nuts-estimate-from-ingredients_100g'?: string | null
          galactose_100g?: string | null
          'gamma-linolenic-acid_100g'?: string | null
          generic_name?: string | null
          generic_names?: string[] | null
          glucose_100g?: string | null
          'glycemic-index_100g'?: string | null
          'gondoic-acid_100g'?: string | null
          id?: string | null
          image_ingredients_small_url?: string | null
          image_ingredients_url?: string | null
          image_nutrition_small_url?: string | null
          image_nutrition_url?: string | null
          image_small_url?: string | null
          image_url?: string | null
          ingredients_analysis_tags?: string | null
          ingredients_tags?: string | null
          ingredients_text?: string | null
          inositol_100g?: string | null
          'insoluble-fiber_100g'?: string | null
          iodine_100g?: string | null
          iron_100g?: string | null
          labels?: string | null
          labels_en?: string | null
          labels_tags?: string | null
          lactose_100g?: string | null
          last_image_datetime?: string | null
          last_image_t?: number | null
          last_modified_by?: string | null
          last_modified_datetime?: string | null
          last_modified_t?: number | null
          last_updated_datetime?: string | null
          last_updated_t?: number | null
          'lauric-acid_100g'?: string | null
          'lignoceric-acid_100g'?: string | null
          'linoleic-acid_100g'?: string | null
          magnesium_100g?: string | null
          main_category?: string | null
          main_category_en?: string | null
          maltodextrins_100g?: string | null
          maltose_100g?: string | null
          manganese_100g?: string | null
          manufacturing_places?: string | null
          manufacturing_places_tags?: string | null
          'mead-acid_100g'?: string | null
          'melissic-acid_100g'?: string | null
          methylsulfonylmethane_100g?: string | null
          molybdenum_100g?: string | null
          'monounsaturated-fat_100g'?: string | null
          'montanic-acid_100g'?: string | null
          'myristic-acid_100g'?: string | null
          'nervonic-acid_100g'?: string | null
          nitrate_100g?: string | null
          no_nutrition_data?: string | null
          nova_group?: number | null
          nucleotides_100g?: string | null
          nutrient_levels_tags?: string | null
          nutriscore_grade?: string | null
          nutriscore_score?: string | null
          'nutrition-score-fr_100g'?: string | null
          'nutrition-score-uk_100g'?: string | null
          'oleic-acid_100g'?: string | null
          'omega-3-fat_100g'?: string | null
          'omega-6-fat_100g'?: string | null
          'omega-9-fat_100g'?: string | null
          origins?: string | null
          origins_en?: string | null
          origins_tags?: string | null
          owner?: string | null
          packaging?: string | null
          packaging_en?: string | null
          packaging_tags?: string | null
          packaging_text?: string | null
          'palmitic-acid_100g'?: string | null
          'pantothenic-acid_100g'?: string | null
          ph_100g?: string | null
          phosphorus_100g?: string | null
          phylloquinone_100g?: string | null
          pnns_groups?: string | null
          pnns_groups_2?: string | null
          polyols_100g?: string | null
          'polyunsaturated-fat_100g'?: string | null
          popularity_tags?: string | null
          potassium_100g?: string | null
          product_name?: string | null
          product_quantity?: number | null
          proteins_100g?: string | null
          purchase_places?: string | null
          quantity?: string | null
          salt_100g?: string | null
          'saturated-fat_100g'?: string | null
          selenium_100g?: string | null
          'serum-proteins_100g'?: string | null
          serving_quantity?: number | null
          serving_size?: string | null
          silica_100g?: string | null
          sodium_100g?: string | null
          'soluble-fiber_100g'?: string | null
          starch_100g?: string | null
          states?: string | null
          states_en?: string | null
          states_tags?: string | null
          'stearic-acid_100g'?: string | null
          stores?: string | null
          sucrose_100g?: string | null
          sugars_100g?: string | null
          sulphate_100g?: string | null
          taurine_100g?: string | null
          traces?: string | null
          traces_en?: string | null
          traces_tags?: string | null
          'trans-fat_100g'?: string | null
          unique_scans_n?: number | null
          'unsaturated-fat_100g'?: string | null
          url?: string | null
          'vitamin-a_100g'?: string | null
          'vitamin-b1_100g'?: string | null
          'vitamin-b12_100g'?: string | null
          'vitamin-b2_100g'?: string | null
          'vitamin-b6_100g'?: string | null
          'vitamin-b9_100g'?: string | null
          'vitamin-c_100g'?: string | null
          'vitamin-d_100g'?: string | null
          'vitamin-e_100g'?: string | null
          'vitamin-k_100g'?: string | null
          'vitamin-pp_100g'?: string | null
          'water-hardness_100g'?: string | null
          zinc_100g?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      enqueue_notification_safe: {
        Args: {
          p_content_id: string
          p_payload: Json
          p_schedule_after: string
          p_type: string
          p_user_id: string
        }
        Returns: undefined
      }
      get_top_ingredient_for_product: {
        Args: { product_id: string }
        Returns: {
          ingredient: string
          similarity: number
        }[]
      }
      hybrid_search_ingredients: {
        Args: {
          fulltext_weight?: number
          match_limit?: number
          product_id: string
          query_text: string
          semantic_weight?: number
          similarity_threshold?: number
        }
        Returns: {
          fulltext_score: number
          hybrid_score: number
          id: number
          ingredient_embedding: string
          ingredient_tsvector: unknown
          name: string
          semantic_score: number
        }[]
      }
      is_user_in_group: { Args: { target_group_id: number }; Returns: boolean }
      norm_ingredient: { Args: { t: string }; Returns: string }
      search_products: {
        Args: { result_limit?: number; search_term?: string }
        Returns: {
          abbreviated_product_name: string | null
          acidity_100g: string | null
          'added-salt_100g': string | null
          'added-sugars_100g': string | null
          additives: string | null
          additives_en: string | null
          additives_n: number | null
          additives_tags: string | null
          alcohol_100g: string | null
          allergens: string | null
          allergens_en: string | null
          'alpha-linolenic-acid_100g': string | null
          'arachidic-acid_100g': string | null
          'arachidonic-acid_100g': string | null
          'behenic-acid_100g': string | null
          'beta-carotene_100g': string | null
          'beta-glucan_100g': string | null
          bicarbonate_100g: string | null
          biotin_100g: string | null
          brand_owner: string | null
          brands: string | null
          brands_en: string | null
          brands_tags: string | null
          'butyric-acid_100g': string | null
          caffeine_100g: string | null
          calcium_100g: string | null
          'capric-acid_100g': string | null
          'caproic-acid_100g': string | null
          'caprylic-acid_100g': string | null
          carbohydrates_100g: string | null
          'carbohydrates-total_100g': string | null
          'carbon-footprint_100g': string | null
          'carbon-footprint-from-meat-or-fish_100g': string | null
          carnitine_100g: string | null
          casein_100g: string | null
          categories: string | null
          categories_en: string | null
          categories_tags: string | null
          'cerotic-acid_100g': string | null
          chloride_100g: string | null
          chlorophyl_100g: string | null
          cholesterol_100g: string | null
          choline_100g: string | null
          chromium_100g: string | null
          cities: string | null
          cities_tags: string | null
          cocoa_100g: string | null
          code: string | null
          'collagen-meat-protein-ratio_100g': string | null
          completeness: number | null
          copper_100g: string | null
          countries: string | null
          countries_en: string | null
          countries_tags: string | null
          created_datetime: string | null
          created_t: number | null
          creator: string | null
          data_quality_errors_tags: string | null
          'dihomo-gamma-linolenic-acid_100g': string | null
          'docosahexaenoic-acid_100g': string | null
          'eicosapentaenoic-acid_100g': string | null
          'elaidic-acid_100g': string | null
          emb_codes: string | null
          emb_codes_tags: string | null
          energy_100g: string | null
          'energy-from-fat_100g': string | null
          'energy-kcal_100g': string | null
          'energy-kj_100g': string | null
          environmental_score_grade: string | null
          environmental_score_score: string | null
          'erucic-acid_100g': string | null
          erythritol_100g: string | null
          fat_100g: string | null
          fiber_100g: string | null
          first_packaging_code_geo: string | null
          fluoride_100g: string | null
          folates_100g: string | null
          food_groups: string | null
          food_groups_en: string | null
          food_groups_tags: string | null
          fructose_100g: string | null
          'fruits-vegetables-nuts_100g': string | null
          'fruits-vegetables-nuts-dried_100g': string | null
          'fruits-vegetables-nuts-estimate_100g': string | null
          'fruits-vegetables-nuts-estimate-from-ingredients_100g': string | null
          galactose_100g: string | null
          'gamma-linolenic-acid_100g': string | null
          generic_name: string | null
          generic_names: string[] | null
          glucose_100g: string | null
          'glycemic-index_100g': string | null
          'gondoic-acid_100g': string | null
          id: string | null
          image_ingredients_small_url: string | null
          image_ingredients_url: string | null
          image_nutrition_small_url: string | null
          image_nutrition_url: string | null
          image_small_url: string | null
          image_url: string | null
          ingredients_analysis_tags: string | null
          ingredients_tags: string | null
          ingredients_text: string | null
          inositol_100g: string | null
          'insoluble-fiber_100g': string | null
          iodine_100g: string | null
          iron_100g: string | null
          labels: string | null
          labels_en: string | null
          labels_tags: string | null
          lactose_100g: string | null
          last_image_datetime: string | null
          last_image_t: number | null
          last_modified_by: string | null
          last_modified_datetime: string | null
          last_modified_t: number | null
          last_updated_datetime: string | null
          last_updated_t: number | null
          'lauric-acid_100g': string | null
          'lignoceric-acid_100g': string | null
          'linoleic-acid_100g': string | null
          magnesium_100g: string | null
          main_category: string | null
          main_category_en: string | null
          maltodextrins_100g: string | null
          maltose_100g: string | null
          manganese_100g: string | null
          manufacturing_places: string | null
          manufacturing_places_tags: string | null
          'mead-acid_100g': string | null
          'melissic-acid_100g': string | null
          methylsulfonylmethane_100g: string | null
          molybdenum_100g: string | null
          'monounsaturated-fat_100g': string | null
          'montanic-acid_100g': string | null
          'myristic-acid_100g': string | null
          'nervonic-acid_100g': string | null
          nitrate_100g: string | null
          no_nutrition_data: string | null
          nova_group: number | null
          nucleotides_100g: string | null
          nutrient_levels_tags: string | null
          nutriscore_grade: string | null
          nutriscore_score: string | null
          'nutrition-score-fr_100g': string | null
          'nutrition-score-uk_100g': string | null
          'oleic-acid_100g': string | null
          'omega-3-fat_100g': string | null
          'omega-6-fat_100g': string | null
          'omega-9-fat_100g': string | null
          origins: string | null
          origins_en: string | null
          origins_tags: string | null
          owner: string | null
          packaging: string | null
          packaging_en: string | null
          packaging_tags: string | null
          packaging_text: string | null
          'palmitic-acid_100g': string | null
          'pantothenic-acid_100g': string | null
          ph_100g: string | null
          phosphorus_100g: string | null
          phylloquinone_100g: string | null
          pnns_groups: string | null
          pnns_groups_2: string | null
          polyols_100g: string | null
          'polyunsaturated-fat_100g': string | null
          popularity_tags: string | null
          potassium_100g: string | null
          product_name: string | null
          product_quantity: number | null
          proteins_100g: string | null
          purchase_places: string | null
          quantity: string | null
          salt_100g: string | null
          'saturated-fat_100g': string | null
          selenium_100g: string | null
          'serum-proteins_100g': string | null
          serving_quantity: number | null
          serving_size: string | null
          silica_100g: string | null
          sodium_100g: string | null
          'soluble-fiber_100g': string | null
          starch_100g: string | null
          states: string | null
          states_en: string | null
          states_tags: string | null
          'stearic-acid_100g': string | null
          stores: string | null
          sucrose_100g: string | null
          sugars_100g: string | null
          sulphate_100g: string | null
          taurine_100g: string | null
          traces: string | null
          traces_en: string | null
          traces_tags: string | null
          'trans-fat_100g': string | null
          unique_scans_n: number | null
          'unsaturated-fat_100g': string | null
          url: string | null
          'vitamin-a_100g': string | null
          'vitamin-b1_100g': string | null
          'vitamin-b12_100g': string | null
          'vitamin-b2_100g': string | null
          'vitamin-b6_100g': string | null
          'vitamin-b9_100g': string | null
          'vitamin-c_100g': string | null
          'vitamin-d_100g': string | null
          'vitamin-e_100g': string | null
          'vitamin-k_100g': string | null
          'vitamin-pp_100g': string | null
          'water-hardness_100g': string | null
          zinc_100g: string | null
        }[]
        SetofOptions: {
          from: '*'
          to: 'product_search_results'
          isOneToOne: false
          isSetofReturn: true
        }
      }
      update_product_embeddings: { Args: { updates: Json }; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          type: Database['storage']['Enums']['buckettype']
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database['storage']['Enums']['buckettype']
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database['storage']['Enums']['buckettype']
          updated_at?: string | null
        }
        Relationships: []
      }
      buckets_analytics: {
        Row: {
          created_at: string
          format: string
          id: string
          type: Database['storage']['Enums']['buckettype']
          updated_at: string
        }
        Insert: {
          created_at?: string
          format?: string
          id: string
          type?: Database['storage']['Enums']['buckettype']
          updated_at?: string
        }
        Update: {
          created_at?: string
          format?: string
          id?: string
          type?: Database['storage']['Enums']['buckettype']
          updated_at?: string
        }
        Relationships: []
      }
      buckets_vectors: {
        Row: {
          created_at: string
          id: string
          type: Database['storage']['Enums']['buckettype']
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          type?: Database['storage']['Enums']['buckettype']
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          type?: Database['storage']['Enums']['buckettype']
          updated_at?: string
        }
        Relationships: []
      }
      iceberg_namespaces: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'iceberg_namespaces_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets_analytics'
            referencedColumns: ['id']
          }
        ]
      }
      iceberg_tables: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          location: string
          name: string
          namespace_id: string
          updated_at: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id?: string
          location: string
          name: string
          namespace_id: string
          updated_at?: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          location?: string
          name?: string
          namespace_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'iceberg_tables_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets_analytics'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'iceberg_tables_namespace_id_fkey'
            columns: ['namespace_id']
            isOneToOne: false
            referencedRelation: 'iceberg_namespaces'
            referencedColumns: ['id']
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          level: number | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'objects_bucketId_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          }
        ]
      }
      prefixes: {
        Row: {
          bucket_id: string
          created_at: string | null
          level: number
          name: string
          updated_at: string | null
        }
        Insert: {
          bucket_id: string
          created_at?: string | null
          level?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string
          created_at?: string | null
          level?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'prefixes_bucketId_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          }
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          }
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: 's3_multipart_uploads_parts_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 's3_multipart_uploads_parts_upload_id_fkey'
            columns: ['upload_id']
            isOneToOne: false
            referencedRelation: 's3_multipart_uploads'
            referencedColumns: ['id']
          }
        ]
      }
      vector_indexes: {
        Row: {
          bucket_id: string
          created_at: string
          data_type: string
          dimension: number
          distance_metric: string
          id: string
          metadata_configuration: Json | null
          name: string
          updated_at: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          data_type: string
          dimension: number
          distance_metric: string
          id?: string
          metadata_configuration?: Json | null
          name: string
          updated_at?: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          data_type?: string
          dimension?: number
          distance_metric?: string
          id?: string
          metadata_configuration?: Json | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'vector_indexes_bucket_id_fkey'
            columns: ['bucket_id']
            isOneToOne: false
            referencedRelation: 'buckets_vectors'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_prefixes: {
        Args: { _bucket_id: string; _name: string }
        Returns: undefined
      }
      can_insert_object: {
        Args: { bucketid: string; metadata: Json; name: string; owner: string }
        Returns: undefined
      }
      delete_leaf_prefixes: {
        Args: { bucket_ids: string[]; names: string[] }
        Returns: undefined
      }
      delete_prefix: {
        Args: { _bucket_id: string; _name: string }
        Returns: boolean
      }
      extension: { Args: { name: string }; Returns: string }
      filename: { Args: { name: string }; Returns: string }
      foldername: { Args: { name: string }; Returns: string[] }
      get_level: { Args: { name: string }; Returns: number }
      get_prefix: { Args: { name: string }; Returns: string }
      get_prefixes: { Args: { name: string }; Returns: string[] }
      get_size_by_bucket: {
        Args: never
        Returns: {
          bucket_id: string
          size: number
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
          prefix_param: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_token?: string
          prefix_param: string
          start_after?: string
        }
        Returns: {
          id: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      lock_top_prefixes: {
        Args: { bucket_ids: string[]; names: string[] }
        Returns: undefined
      }
      operation: { Args: never; Returns: string }
      search: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_legacy_v1: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_v1_optimised: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_v2: {
        Args: {
          bucket_name: string
          levels?: number
          limits?: number
          prefix: string
          sort_column?: string
          sort_column_after?: string
          sort_order?: string
          start_after?: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      buckettype: 'STANDARD' | 'ANALYTICS' | 'VECTOR'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
  ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  auth: {
    Enums: {
      aal_level: ['aal1', 'aal2', 'aal3'],
      code_challenge_method: ['s256', 'plain'],
      factor_status: ['unverified', 'verified'],
      factor_type: ['totp', 'webauthn', 'phone'],
      oauth_authorization_status: ['pending', 'approved', 'denied', 'expired'],
      oauth_client_type: ['public', 'confidential'],
      oauth_registration_type: ['dynamic', 'manual'],
      oauth_response_type: ['code'],
      one_time_token_type: [
        'confirmation_token',
        'reauthentication_token',
        'recovery_token',
        'email_change_token_new',
        'email_change_token_current',
        'phone_change_token',
      ],
    },
  },
  public: {
    Enums: {},
  },
  storage: {
    Enums: {
      buckettype: ['STANDARD', 'ANALYTICS', 'VECTOR'],
    },
  },
} as const
