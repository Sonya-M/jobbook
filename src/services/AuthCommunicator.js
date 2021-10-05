import * as service from "./service.js";

export default class AuthCommunicator {
  static login(email, password) {
    return service.authenticate(email, password);
  }

  /**
   * @param {function} callBack optional callback to be called after
   * clearing the access token from storage
   */
  static clearSession(callBack) {
    service.clearToken();
    if (callBack) callBack();
  }

  /**
   * Checks sessionStorage for access token to determin if a user is logged in.
   * @returns true if a user is logged in, false otherwise
   */
  static isLoggedIn() {
    const token = sessionStorage.getItem("accessToken");
    if (token) return true;
    return false;
  }

}

