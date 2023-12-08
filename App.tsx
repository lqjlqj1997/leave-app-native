// In App.js in a new project

import * as React from "react";
import Router from "./router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router />
        </QueryClientProvider>
    );
}

export default App;
