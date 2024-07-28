

import useSupabase from "@/config/supabaseClient";
import { ref } from "vue";

// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user
const user = ref(null);

export default function useAuthUser() {
    const { supabase } = useSupabase();

    /**
     * Login with email and password
     */
    const login = async ({ email, password }) => {
        const { user, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return user;
    };

    /**
     * Login with refresh token
     * Useful for logging in after email confirmations
     */
    const loginWithRefreshToken = async (token) => {
        const { user, error } = await supabase.auth.signInWithIdToken({ refreshToken: token });
        if (error) throw error;
        return user;
    };

    /**
     * Login with google, github, etc
     */
    const loginWithSocialProvider = async (token) => {
        const { user, error } = await supabase.auth.signInWithOAuth({ provider });
        if (error) throw error;
        return user;
    };

    /**
     * Logout
     */
    const logout = async () => {
        const { error } = supabase.auth.signOut();
        if (error) throw error;
    };

    /**
     * Check if the user is logged in or not
     */
    const isLoggedIn = () => {
        return !!user.value;
    };

    /**
     * Register
     */
    const register = async ({ email, password, ...meta }) => {
        const { user, error } = await supabase.auth.signUp(
            { email, password },

        );
        if (error) throw error;
        return user;
    };

    /**
     * Update user email, password, or meta data
     */
    const update = async (data) => {
        const { user, error } = await supabase.auth.update(data);
        if (error) throw error;
        return user;
    };

    /**
     * Send user an email to reset their password
     * (ie. support "Forgot Password?")
     */
    const sendPasswordRestEmail = async (email) => {
        const { user, error } = await supabase.auth.resetPasswordForEmail(
            email
        );
        if (error) throw error;
        return user;
    };

    const getUser = () => {

        return user.value;
    };

    /**
     * Will be useful for informing the application what to do
     * when Supabase redirects a user back to app
     * after confirming email address
     */
    const maybeHandleEmailConfirmation = async (route) => { };


    return {
        user,
        login,
        loginWithSocialProvider,
        loginWithRefreshToken,
        isLoggedIn,
        logout,
        register,
        update,
        sendPasswordRestEmail,
        maybeHandleEmailConfirmation,
        getUser
    };
}