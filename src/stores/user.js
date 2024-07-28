import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import useAuthUser from '@/services/AuthService'


export const useAuthStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    getters: {
        getUser() {
            return this.user;
        },
        isLoggedIn() {
            return this.user.id;
        }
    },
    actions: {
        setUser(user) {
            this.user = user;
        },

    },

})






