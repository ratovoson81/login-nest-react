import QueryUser from "../../graphql/UserQuery";

async function getIsLoggedIn() {
  const me = await QueryUser.me().catch((err) => {
    console.error("error auth => ", err);
  });
  if (me) {
    return true;
  }
  return false;
}

export default getIsLoggedIn;
