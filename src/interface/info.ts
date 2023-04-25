export interface UserInfo {
  name: string;
  fartherName?: string;
  motherName?: string;
}

export interface Info {
  broom: UserInfo;
  bride: UserInfo;
  location: {
    name: string;
  };
  time: string;
}
