import React from "react";
import Activity from "../scenes/Activity/Activity";
import AuthConfirmCode from "../scenes/Auth/AuthConfirmCode";
import AuthPhoneNumber from "../scenes/Auth/AuthPhoneNumber";
import Event from "../scenes/Event/Event";
import EventCreateGuests from "../scenes/Event/EventCreateGuests";
import EventCreate from "../scenes/EventCreate/EventCreate";
import Feedback from "../scenes/Feedback/Feedback";
import HomeScreen from "../scenes/Home/Home";
import OnBoardingAvatar from "../scenes/OnBoarding/OnBoardingAvatar";
import OnBoardingInterests from "../scenes/OnBoarding/OnBoardingInterests";
import OnBoardingName from "../scenes/OnBoarding/OnBoardingName";
import ProfileFollowers from "../scenes/Profile/ProfileFollowers";
import ProfileFollowing from "../scenes/Profile/ProfileFollowing";
import Stream from "../scenes/Stream/Stream";
import StreamInvites from "../scenes/Stream/StreamInvites";
import StreamMembers from "../scenes/Stream/StreamMembers";
import StackEvent from "./StackEvent";
import StackInvites from "./StackInvites";
import StackStream from "./StackStream";
import TabsNavigator from "./TabsNavigator";
import UserProfile from "../scenes/Profile/UserProfile";
import HeaderLeft from "../core/HeaderLeft";
import StackSettings from "./StackSettings";
import MeEditInterests from "../scenes/Me/MeEditInterests";
import MeEditField from "../scenes/Me/MeEditField";
import MeScreen from "../scenes/Me/Me";
import InviteFriends from "../scenes/InviteFriends/InviteFriends";
import InvitesSent from "../scenes/InvitesSent/InvitesSent";
import ExploreScreen from "../scenes/Explore/Explore";
import SettingsScreen from "../scenes/Settings/Settings";

export const Main = {
  navigatorProps: { mode: "modal", screenOptions: { headerShown: false } },
  screens: [
    { name: "Home", component: TabsNavigator },
    { name: "Stream", component: StackStream },
    { name: "Event", component: StackEvent },
    { name: "Invite Friends", component: StackInvites },
    { name: "Feedback", component: Feedback },
  ],
};

export const Auth = {
  navigatorProps: { screenOptions: { headerShown: false } },
  screens: [
    { name: "Auth Phone", component: AuthPhoneNumber },
    { name: "Auth Confirm Code", component: AuthConfirmCode },
  ],
};

export const Events = {
  navigatorProps: {},
  screens: [
    { name: "Event", component: Event },
    { name: "Event Create", component: EventCreate },
    { name: "Event Create Guests", component: EventCreateGuests },
  ],
};

export const OnBoarding = {
  navigatorProps: { screenOptions: { headerShown: false } },
  screens: [
    { name: "Name", component: OnBoardingName },
    { name: "Profile Picture", component: OnBoardingAvatar },
    { name: "Pick Your Interests", component: OnBoardingInterests },
  ],
};

export const Streams = {
  navigatorProps: { mode: "modal" },
  screens: [
    {
      name: "Stream",
      component: Stream,
      options: { headerTransparent: true },
    },
    { name: "Stream Invite", component: StreamInvites },
    { name: "Stream Members", component: StreamMembers },
  ],
};

export const Home = {
  navigatorProps: {},
  screens: [{ name: "Home", component: HomeScreen }],
};

export const Activities = {
  navigatorProps: {},
  screens: [
    { name: "Activity", component: Activity },
    { name: "User Profile", component: UserProfile },
    { name: "Followers", component: ProfileFollowers },
    { name: "Followings", component: ProfileFollowing },
  ],
};

export const Me = {
  navigatorProps: {
    screenOptions: { headerLeft: () => <HeaderLeft /> },
  },
  screens: [
    { name: "Me", component: MeScreen, options: { headerLeft: () => null } },
    { name: "Followers", component: ProfileFollowers },
    { name: "Following", component: ProfileFollowing },
    { name: "User Profile", component: UserProfile },
    {
      name: "Settings",
      component: StackSettings,
      options: { headerShown: false },
    },
    { name: "Edit Interests", component: MeEditInterests },
    { name: "Edit Field", component: MeEditField },
  ],
};

export const Invites = {
  navigatorProps: {},
  screens: [
    { name: "Invite Friends", component: InviteFriends },
    { name: "Invites Sent", component: InvitesSent },
  ],
};

export const Explore = {
  navigatorProps: {
    screenOptions: {
      headerLeft: () => <HeaderLeft />,
    },
  },
  screens: [
    { name: "Explore", component: ExploreScreen },
    { name: "User Profile", component: UserProfile },
    { name: "Followers", component: ProfileFollowers },
    { name: "Following", component: ProfileFollowing },
  ],
};

export const Settings = {
  navigatorProps: {},
  screens: [{ name: "Settings", component: SettingsScreen }],
};
