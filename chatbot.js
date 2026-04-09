document.getElementById("chatbot-btn").addEventListener("click", async () => {  
  try {  

      const container = document.getElementById("results-chatbot");  
      container.innerHTML = `<p>Loading...</p>`;

    const pageData = {
      title: document.title,
      url: window.location.href,
      html: document.documentElement.outerHTML
    };

    const aiResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      "model": "gemma3:4b",
      prompt: `You are an UI/UX expert. Provide a brief response on search engine optimization improvements on the following page data: ${JSON.stringify({pageData})}`,
       stream: false
    })
  });
  
  if (!aiResponse.ok) {
        alert("Failed to chat with AI. Not ol");  

  }
  const data = await aiResponse.json();
 
    // Display the response 
  container.innerHTML = `<p>${data?.response}</p>`



  } catch (error) {  
    console.error("AI Chat failed:", error);  
    alert("Failed to chat with AI." + error);  
  }  
});  
