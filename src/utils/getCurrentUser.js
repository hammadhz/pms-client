import { decodeToken } from "react-jwt";
import Cookie from "js-cookie";

export function getCurrentUser() {
  try {
    const jwt = Cookie.get("accessToken");
    return decodeToken(jwt);
  } catch (err) {
    console.log(err);
  }
}
