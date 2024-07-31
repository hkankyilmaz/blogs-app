import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import useSupabase from "@/config/supabaseClient";
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue';
export const useAuthStore = defineStore('user', () => {

    const { supabase } = useSupabase();
    const router = useRouter()


    const user = ref(null)

    const setUser = (newUser) => {
        user.value = newUser
    }

    const isLoggedIn = () => {
        return !!user.value
    }

    const getUser = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        console.log(data)
        setUser(data.user)
        return data;
    }

    const login = async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            message.error(error.message)
            throw error;
        } else {
            message.success('Login successfully')
            setUser(data.user)
            router.push('/')
            return data;
        }
    };

    const loginWithToken = async (token) => {
        const { data, error } = await supabase.auth.signInWithIdToken({ provider: "email", token: token });
        if (error) throw error;
        setUser(data.user)
        return data;
    };

    const logout = async () => {
        const { error } = supabase.auth.signOut();
        if (error) {
            message.error(error.message)
            throw error;
        } else {
            message.success('Logout successfully')
            router.push('/login')
            setUser(null)
            return true;

        }

    };

    const register = async ({ email, password, ...meta }) => {
        const { data, error } = await supabase.auth.signUp(
            { email, password });
        if (error) {
            message.error(error.message)
            throw error;
        }
        else {
            setUser(data.user)
            return data;
        }

    };

    const update = async (user) => {
        const { data, error } = await supabase.auth.update(user);
        if (error) {
            message.error(error.message)
            throw error;

        } else {
            message.success('Update successfully')
        }
        setUser(data.user)
        return data;
    };

    const sendPasswordRestEmail = async (email) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(
            email
        );
        if (error) {
            message.error(error.message)
            throw error;
        } else {
            message.success('Reset password email sent')
        }
        return data;
    };

    return { user, setUser, getUser, isLoggedIn, login, loginWithToken, logout, register, update, sendPasswordRestEmail }
})






