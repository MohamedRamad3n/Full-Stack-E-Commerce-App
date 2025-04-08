import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "./components/ui/provider";
import "./index.css";
import { Provider as ReduxProvider } from 'react-redux'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./app/store";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
 <ReduxProvider store={store}>
 <QueryClientProvider client={queryClient}>
    <Provider>
      <App />
    </Provider>
  </QueryClientProvider>
  </ReduxProvider>
);
