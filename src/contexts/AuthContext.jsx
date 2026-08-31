import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async (sessionUser) => {
      if (!sessionUser) {
        setIsAdmin(false);
        return;
      }
      console.log("Checking admin status for:", sessionUser.email);
      const { data, error } = await supabase.from('profiles').select('is_admin').eq('id', sessionUser.id).single();
      console.log("Profile data returned:", data, "Error:", error);
      if (data) setIsAdmin(data.is_admin);
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      fetchProfile(session?.user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      fetchProfile(session?.user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signInWithGoogle: () => supabase.auth.signInWithOAuth({ provider: 'google' }),
    signInWithOtp: (email) => supabase.auth.signInWithOtp({ email }),
    signOut: () => supabase.auth.signOut(),
    user,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
