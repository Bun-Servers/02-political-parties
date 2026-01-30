export const handleMessage = (message: string) => {
  try {
    const jsonData = JSON.parse(message);
    console.log({ payload: jsonData });
  } catch (error) {}
};
