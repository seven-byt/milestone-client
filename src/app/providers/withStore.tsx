import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { setupStore } from "../../store";

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <Provider store={setupStore()}>{children}</Provider>
);
