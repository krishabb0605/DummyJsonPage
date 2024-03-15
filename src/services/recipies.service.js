export const getRecipiesData = async () => {
  const data = await fetch("https://dummyjson.com/recipes?limit=100");
  const data1 = await data.json();
  return data1.recipes;
};
