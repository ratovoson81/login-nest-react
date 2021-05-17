import getIsLoggedIn from "../utils/getIsLoggedIn";

const requireLogin = async (
  to: { meta: { auth: any } },
  from: any,
  next: { (): void; redirect: (arg0: string) => void }
) => {
  if (!to.meta.auth) {
    if (await getIsLoggedIn()) {
      next.redirect("/home");
    }
    next();
  }
  if (to.meta.auth) {
    if (await getIsLoggedIn()) {
      next();
    }
    next.redirect("/");
  } else {
    next();
  }
};

export default requireLogin;
