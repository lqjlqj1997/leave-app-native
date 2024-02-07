import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { useEffect } from "react";

import { useTokenStore } from "@/global-store/TokenStore";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

const queryClient = new QueryClient();

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

export default function RootLayout() {
    const { token, loadFromAysncStorage } = useTokenStore();

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

