import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";
import { useRecoilState, useResetRecoilState } from "recoil";
import { signingState } from "../atoms/signingState";
import { removeCookie, setCookie } from "../util/cookieUtil";
import { loginPost } from "../api/memberApi";
import { cartState } from "../atoms/cartState";

const useCustomLogin = () => {
  const [loginState, setLoginState] = useRecoilState(signingState);

  const resetState = useResetRecoilState(signingState);

  const resetCartState = useResetRecoilState(cartState);

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const loginState = useSelector((state) => state.loginSlice);

  const isLogin = loginState.email ? true : false; //로그인 여부

  const doLogin = async (loginParam) => {
    //로그인 함수
    // const action = await dispatch(loginPostAsync(loginParam));
    // return action.payload;

    const result = await loginPost(loginParam);

    saveAsCookie(result);

    return result;
  };

  const saveAsCookie = (data) => {
    setCookie("member", JSON.stringify(data), 1);
    setLoginState(data);
  };

  const doLogout = () => {
    //로그아웃 함수
    // dispatch(logout());

    removeCookie("member");
    resetState();
    resetCartState();
  };

  const moveToPath = (path) => {
    //페이지 이동
    navigate({ pathname: path }, { replace: true });
  };

  const moveToLogin = () => {
    //로그인 페이지로 이동
    navigate({ pathname: "/member/login" }, { replace: true });
  };

  const moveToLoginReturn = () => {
    //로그인 페이지로 이동 컴포넌트
    return <Navigate replace to="/member/login" />;
  };

  return {
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToLoginReturn,
    saveAsCookie,
  };
};

export default useCustomLogin;
