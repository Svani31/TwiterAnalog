
export const getChat = async (myUserId: string, reciverUserId: string) => {
  try {
    const respons = await fetch(`/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        myUserId,
        reciverUserId,
      }),
    });
    if (!respons.ok) throw new Error("Something Went Wrong");
    const data = await respons.json();
    return data;
  } catch (error) {
    throw error;
  }
};
