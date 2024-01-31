import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { create } from "zustand";

// interface tokenState {
//     accessToken: string;
//     refreshToken: string;
//     setAccessToken: (token: string) => void;
//     setRefreshToken: (token: string) => void;
//     loadFromAysncStorage: () => void;
//     // refreshAccessToken: () => void;
// }

// export const useTokenStore = create<tokenState>((set, get) => ({
//     accessToken: "",
//     refreshToken: "",
//     setAccessToken: (token: string) => {
//         set((state) => ({ ...state, accessToken: token }));
//     },
//     setRefreshToken: (token: string) => {
//         set((state) => ({ ...state, refreshToken: token }));
//     },
//     loadFromAysncStorage: async () => {
//         let accessToken = await AsyncStorage.getItem("accessToken");
//         let refreshToken = await AsyncStorage.getItem("refreshToken");
//         set((state) => ({
//             accessToken: accessToken ?? "",
//             refreshToken: refreshToken ?? "",
//         }));
//     },
//     // refreshAccessToken: async () => {
//     //     let refreshToken = get().refreshToken
//     //     let accessToken = await (await axios.post(refreshToken)).data

//     //     set((state) => ({
//     //         ...state,
//     //         accessToken: accessToken ?? ""
//     //     }));
//     // },
// }));

interface tokenState {
    token: string;
    setToken: (token: string) => void;
    loadFromAysncStorage: () => void;
}

export const useTokenStore = create<tokenState>((set, get) => ({
    token: "",
    setToken: async (token: string) => {
        try {
            await AsyncStorage.setItem("token", token);
            set((state) => ({ token: token }));
        } catch (e) {
            // saving error
            console.log(e);
        }
    },
    loadFromAysncStorage: async () => {
        if (get().token) return;
        try {
            let token = await AsyncStorage.getItem("token");
            
            set((state) => ({
                token: token ?? "",
            }));
        } catch (e) {
            // saving error
            console.log(e);
        }
    },
}));
