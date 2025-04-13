import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "./components/ui/provider";
import "./index.css";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./app/store";
import InternetConnectionProvider from "./provider/InternetConnectionProvider";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <InternetConnectionProvider>
          <App />
        </InternetConnectionProvider>
      </Provider>
    </QueryClientProvider>
  </ReduxProvider>
);
