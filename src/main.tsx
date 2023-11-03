import ReactDOM from "react-dom/client";
import App from "./app/App";
import { WithWebSocket } from "./app/providers/withWebSocket.tsx";
import { StoreProvider } from "./app/providers/withStore.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <WithWebSocket>
    <StoreProvider>
      <App />
    </StoreProvider>
  </WithWebSocket>
);
