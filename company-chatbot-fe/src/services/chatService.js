export const sendMessage = async (message, sessionId) => {
    const formData = new FormData();
    formData.append("session_id", sessionId);
    formData.append("message", message);

    const response = await fetch(`http://127.0.0.1:8000/chat`, {
        method: "POST",
        body: formData, 
    });

    if (!response.ok) {
        throw new Error("Failed to send message");
    }

    return await response.json(); 
};

export const initChatSession = async (jdId) => {
    const response = await fetch(`http://127.0.0.1:8000/init?jd_id=${encodeURIComponent(jdId)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to initialize session");
    }

    return await response.json();
};