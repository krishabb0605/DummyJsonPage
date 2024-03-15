export const getAllUsersData = async () => {
  const responseOfUsersData = await fetch(
    "https://dummyjson.com/users?limit=100"
  );
  const usersData = await responseOfUsersData.json();
  return usersData.users;
};

export const getUserDataById = async (userId) => {
  console.log("userId", userId);
  const responseOfUsers = await fetch(`https://dummyjson.com/users/${userId}`);
  const uData = await responseOfUsers.json();
  return uData;
};

export const searchUsersDataByQuery = async (searchQuery, usersAllData) => {
  try {
    let searchData = await fetch(
      `https://dummyjson.com/users/search?q=${searchQuery}&&limit=100`
    );
    let filteredUsersData = await searchData.json();
    return filteredUsersData.users;
  } catch (e) {
    console.log("Error", e);
  }
  return usersAllData.filter(
    (userData) =>
      userData.firstName.toLowerCase().includes(searchQuery) ||
      userData.lastName.toLowerCase().includes(searchQuery) ||
      userData.email.toLowerCase().includes(searchQuery)
  );
};
