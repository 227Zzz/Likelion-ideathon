import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HomeScreen } from "./components/HomeScreen";
import { ChatScreen } from "./components/ChatScreen";
import { CommunityScreen } from "./components/CommunityScreen";
import { MyPageScreen } from "./components/MyPageScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomeScreen },
      { path: "chat", Component: ChatScreen },
      { path: "community", Component: CommunityScreen },
      { path: "mypage", Component: MyPageScreen },
    ],
  },
]);
