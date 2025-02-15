import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { Alert } from "react-native";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  
    async function trySignInAnonymously() {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (data.session) {
          console.log("already signed in")
          return
        }
        const {  data: anonData, error: anonError } = await supabase.auth.signInAnonymously();
        if (anonError) {
          Alert.alert(anonError.message);
        }
        if (anonData) {
          console.log(anonData);
        }
      } catch (error) {
        console.log(error);
      }
    }

  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      if (res.error) {
        console.log(res.error.message);
        return;
      }

      setSession(res.data.session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);


  return {
    session,
    signInAnonymously: trySignInAnonymously
  }
}