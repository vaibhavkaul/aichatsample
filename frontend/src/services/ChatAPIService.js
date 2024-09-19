class ChatService {
  static baseUrl = "/api";

  static async fetchChatResponse(input, lastMessages) {
    const url = `${ChatService.baseUrl}/chat`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input, conversation: lastMessages }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching chat response:", error);
      throw error;
    }
  }

  static async fetchTalkResponse(chatMessageText) {
    const url = `${ChatService.baseUrl}/talk`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: chatMessageText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.blob();
      return data;
    } catch (error) {
      console.error("Error fetching chat response:", error);
      throw error;
    }
  }
}

export default ChatService;
