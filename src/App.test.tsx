import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import NotificationProvider from "./context/notifications/NotificationProvider";

test("renders App component without error", () => {
  render(
    <NotificationProvider>
      <App />
    </NotificationProvider>
  );
  // No need for any assertions as the test will fail if there are any errors during rendering
});
