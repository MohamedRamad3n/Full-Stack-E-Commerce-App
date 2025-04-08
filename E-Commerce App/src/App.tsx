import { Toaster } from "./components/ui/toaster";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;
