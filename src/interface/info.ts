export interface UserInfo {
  name: string;
  fartherName?: string;
  motherName?: string;
}

export interface Info {
  groom: UserInfo;
  bride: UserInfo;
  location: {
    name: string;
  };
  time: string;
}
