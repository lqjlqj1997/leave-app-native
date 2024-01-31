import { useTokenStore } from "@/global-store/TokenStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function AppLayout() {    
    
    const { token,  loadFromAysncStorage } = useTokenStore();
    
    useEffect(() => {
        loadFromAysncStorage();
    }, []);

    console.log("token:", token);

    return (
        <QueryClientProvider client={queryClient}>
            <Slot />
        </QueryClientProvider>
    );
}
