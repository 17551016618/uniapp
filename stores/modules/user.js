import { defineStore } from "pinia";

import { login } from "@/api/login";

import { getToken, setToken, removeToken } from "@/utils/auth";

import config from "@/config/index.js";
export const useUserStore = defineStore(
  "user",
  {
    state: () => {
      return {
        token: "",
      };
    },
    actions: {
      Login(userInfo) {
        const username = userInfo.username.trim();
        const password = userInfo.password.trim();
        return new Promise((resolve, reject) => {
          login(username, password)
            .then((res) => {
              setToken(res.token);
              this.SET_TOKEN(res.token);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      SET_TOKEN(token) {
        this.token = token;
      },
    },
  },
  {
    persist: {
      storage: {
        getItem: uni.getStorageSync,
        setItem: uni.setStorageSync,
      },
    },
  }
);
