import { ClientRole } from "react-native-agora";

export type User = {
  _id: string;
  isLoading: Boolean;
  isUpdating: Boolean;
  isRefreshing: Boolean;
  user: UserProfile;
};

export type UserProfile = {
  _id: string;
  createdAt: string;
  isLive: Boolean;
  firstSteps: {
    goLive: Boolean;
    addAvatar: Boolean;
    addBio: Boolean;
    followUser: Boolean;
    inviteUser: Boolean;
    addInterests: Boolean;
    isCompleted: Boolean;
  };
  activeStreamID: string | "";
  avatar: string | "";
  cover: string | "";
  bio: string | "";
  onBoarding: {
    name: boolean;
    avatar: boolean;
    interests: boolean;
  };
  invite: {
    byUser: string | UserProfile;
    phoneNumber: string;
    createdAt: Date;
    avatar: string;
    name: string;
    fulfilled: boolean;
  };
  name: string | "";
  phoneNumber: string;
  streamID: number;
  firebaseUID: string;
  following: object[] | string[];
  followers: object[] | string[];
  totalElapsed: number;
  invites: number;
  activity: Activity[];
  role: number;
  messagesSeen: object;
  FCMToken: string | "";
  interests: Interest[];
  config: {
    notifications: {
      whenUserIInvitedJoined: boolean;
      whenUserInMyContactsJoins: boolean;
      whenUserIFollowJoinsARoom: boolean;
      whenUserIKnowJoinsRoom: boolean;
      generalUpdates: boolean;
    };
    stream: {
      smoothnessLevel: number;
      rednessLevel: number;
      lighteningContrastLevel: number;
      lighteningLevel: number;
    };
  };
};

export type Interest = {
  name: string;
  tag: string;
  emoji: string;
};

export type Activity = {
  type: string;
  user?: string;
  title: string;
  body: string;
  imageUrl: string;
  isPublic: boolean;
  otherUserID?: string;
  streamID?: string;
};

export type LiveStreamSpeaker = {
  streamID: string;
  _id: string;
  avatar: string;
  name: string;
  state: {
    video: 0 | 1 | 2 | 3 | 4;
    audio: 0 | 1 | 2 | 3 | 4;
  };
};

export type Language = {
  language: string;
  notifyMe: string;
  whenUserFollowsMe: string;
  whenUserIInvitedJoined: string;
  whenUserInMyContactsJoins: string;
  whenUserIFollowJoinsARoom: string;
  whenUserIKnowJoinsRoom: string;
  generalUpdates: string;
  accountSettings: string;
  accountSettingsGeneral: string;
  accountSettingsInviteFriends: string;
  accountSettingsInvitesLeft: string;
  accountSettingsPhoneNumber: string;
  accountSettingsNotifications: string;
  accountSettingsAppearance: string;
  accountSettingsLanguage: string;
  accountSettingsFeedback: string;
  accountSettingsFeedbackLabel: string;
  accountSettingsInformation: string;
  accountSettingsPrivacyPolicy: string;
  accountSettingsTermsOfService: string;
  accountSettingsSignOut: string;
  profileJoined: string;
  profileAgo: string;
  profileStreams: string;
  profileFollowers: string;
  profileFollowing: string;
  profileBioCTA: string;
  profileNominatedBy: string;
};

export type Widget = {
  createdAt?: Date;
  isActive: boolean;
  user?: string | UserProfile;
  type: "NOTE" | "QUESTION" | "POLL";
  data: object;
  streamID: string;
};

export type StreamInvite = {
  user: string;
  byUser: string;
};

export type Notification = {
  imageUrl: string;
  title: string;
  body: string;
  createdAt: Date;
  readAt: Date;
  type: string;
  link: {
    screen: string;
    params: object;
  };
};

export type Stream = {
  _id: string;
  streamID: string;
  activeSpeaker: number | null;
  meta: {
    name: string;
    description: string;
    imageURL: string;
  };
  raisedHands: string[];
  owners: string[];
  onStage: string[];
  members: string[];
  speakers: UserProfile[];
  audience: UserProfile[];
  audioMuted: number[];
  videoMuted: number[];
  isJoined: boolean;
  isLive: boolean;
  openModal: string;
};

export type Colors = {
  primaryLight: string;
  primary: string;
  primaryDark: string;
  secondaryLight: string;
  secondary: string;
  secondaryDark: string;
  cardAlt: string;
  card: string;
  text: string;
  textAlt: string;
  background: string;
  border: string;
  success: string;
  error: string;
  warning: string;
  notification: string;
};

export type Theme = {
  type: string;
  colors: Colors;
};

export type StreamLayout = {
  openModal: "";
};

export type Invite = {};

export type StreamState = {
  streamID: string;
  isJoined: boolean;
  isLive: boolean;
  meta: {
    name: string;
    description: string;
    imageURL: string;
  };
  invites: string[];
  members: string[];
  owners: string[];
  raisedHands: string[];
  onStage: string[];
  speakers: number[];
  audience: UserProfile[];
  audioMuted: number[];
  videoMuted: number[];
  activeSpeaker: number | null;
  role: ClientRole | null;
};

export type StreamLayoutState = {
  params: object;
  isZenMode: boolean;
  openModal: ModalTypes;
};

export type FeedbackTypes = "REPORT_USER" | "GENERAL";
export type ModalTypes =
  | "STREAM_MODALS/FILTERS"
  | "STREAM_MODALS/WIDGETS"
  | "GENERAL/SELECT";

export type Sizes = "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
