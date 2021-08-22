export class User {
    id: string;
    externalPlatformInfo: ExternalPlatform;
    friends: string[];        // user’s running friends
    userGroups: string[];      // user’s running friends
    creationTime: Date;
  }
  
  export class ExternalPlatform {
    naver?: UserInfo;
    kakao?: UserInfo;
    google?: UserInfo;
    apple?: UserInfo;
  }
  
  export class UserInfo {
    emailAddress: string;
  }