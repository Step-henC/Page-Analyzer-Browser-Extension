document.getElementById("screenshoot").addEventListener("click", async () => {  
  try {  
    // Capture the visible part of the active tab  
    const screenshotUrl = await new Promise((resolve) => {  
      // null gets the active tab
      chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {  
        resolve(dataUrl);  
      });  
    });  
 
    // Display the screenshot in the popup  
    const container = document.getElementById("results-snap");  
    container.innerHTML = ""; // Clear previous screenshots  
    const img = document.createElement("img");  
    img.src = screenshotUrl;  
    img.style.maxWidth = "100%";  
    img.addEventListener('click', () => {
    chrome.downloads.download({
      url: screenshotUrl,
      filename: `${new Date().toISOString()}.png`, // Save to screenshots
      conflictAction: "uniquify" // Avoid overrites
    })
  });
    container.appendChild(img);  



  } catch (error) {  
    console.error("Capture failed:", error);  
    alert("Failed to capture screenshot. Check permissions.");  
  }  
});  

