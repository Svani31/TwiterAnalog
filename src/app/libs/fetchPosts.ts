
export const GetPosts = async () => {
    try {
      const response = await fetch(`/api/post`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };
  