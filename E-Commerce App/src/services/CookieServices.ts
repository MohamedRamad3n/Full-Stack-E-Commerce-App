import Cookies, { CookieSetOptions } from "universal-cookie";

const cookies = new Cookies();

class CookieService {
  //Get
  getCookie(name: string) {
    return cookies.get(name);
  }
  //Set
  setCookie(name: string, value: string, options: CookieSetOptions | undefined) {
    cookies.set(name, value, options);
  }
  //Remove
  removeCookie(name: string) {
    cookies.remove(name);
  }
}

export default new CookieService();
