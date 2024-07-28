import useSupabase from "@/config/supabaseClient";
import { useAuthStore } from "@/stores/user";

export default function useAuthUser() {
    const { supabase } = useSupabase();
    const user = useAuthStore();

    const login = async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        console.log(data);
        user.setUser(data.user);
        localStorage.setItem('blog_app_token', data.session.access_token);
        localStorage.setItem('blog_app_refresh_token', data.session.refresh_token);
        return data;
    };

    const loginWithToken = async (token) => {
        const { data, error } = await supabase.auth.signInWithIdToken({ provider: "email", token: token });
        if (error) throw error;
        user.setUser(data.user);

        return data;
    };

    const logout = async () => {
        const { error } = supabase.auth.signOut();
        if (error) throw error;
        localStorage.removeItem('blog_app_token');
        localStorage.removeItem('blog_app_refresh_token');
        user.setUser(null);
        return true;
    };

    const register = async ({ email, password, ...meta }) => {
        const { data, error } = await supabase.auth.signUp(
            { email, password });
        if (error) throw error;
        localStorage.setItem('blog_app_token', data.session.access_token);
        localStorage.setItem('blog_app_refresh_token', data.session.refresh_token);
        console.log(data);
        return data;
    };

    const update = async (user) => {
        const { data, error } = await supabase.auth.update(user);
        if (error) throw error;
        return data;
    };


    const sendPasswordRestEmail = async (email) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(
            email
        );
        if (error) throw error;
        return data;
    };

    return {
        login,
        loginWithToken,
        logout,
        register,
        update,
        sendPasswordRestEmail,
    };
}