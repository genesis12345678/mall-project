import { atom } from "recoil";
import { getCookie } from "../util/cookieUtil";

const initState = {
  email: "",
  nickname: "",
  social: false,
  accessToken: "",
  refreshToken: "",
};

const loadMemberCookie = () => {
  const memberInfo = getCookie("member");

  if (memberInfo && memberInfo.nickname) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }

  return memberInfo;
};

export const signingState = atom({
  key: "signingState",
  default: loadMemberCookie() || initState,
});

// export default signingState;
