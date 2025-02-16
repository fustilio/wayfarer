import { Session } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { Alert } from 'react-native';

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  async function trySignInAnonymously() {
    console.log('trySignInAnonymously');
    try {
      console.log("running trySignInAnonymously")
      const { data, error } = await supabase.auth.getSession();
      console.log("should log something")
      console.log("JSON", JSON.stringify({
        data, error
      }))
      if (data.session) {
        console.log('already signed in');
        return;
      }
      console.log('signing in anonymously');
      const { data: anonData, error: anonError } =
        await supabase.auth.signInAnonymously();

        console.log("JSON", JSON.stringify({
          anonData, anonError
        }))
      if (anonError) {
        Alert.alert(anonError.message);
      }
      if (anonData) {
        console.log(JSON.stringify({
          anonData
        }));
      }
    } catch (error) {
      console.error("error", JSON.stringify(error))
    }
  }

  useEffect(() => {
    console.log("usesession mounted")
    supabase.auth.getSession().then((res) => {

      console.log("get session ", JSON.stringify({ res }));
      if (res.error) {
        console.log(res.error.message);
        return;
      }

      setSession(res.data.session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("onAuthStateChange",   {
        event: _event,
        session
      })
      setSession(session);
    });
  }, []);

  return {
    session,
    trySignInAnonymously,
  };
}
