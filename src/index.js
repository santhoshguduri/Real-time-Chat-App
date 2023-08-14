import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "./Context/AuthContext";
import { ChatContextProvider } from "./Context/ChatContext";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);
