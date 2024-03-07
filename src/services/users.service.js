export const getAllUsersData = async () => {
  const responseOfUsersData = await fetch(
    "https://dummyjson.com/users?limit=100"
  );
  const usersData = await responseOfUsersData.json();
  return usersData.users;
};

export const getUserDataById = async (userId) => {
  const responseOfUsers = await fetch(`https://dummyjson.com/users/${userId}`);
  const uData = await responseOfUsers.json();
  return uData;
};
