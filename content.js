function analyzePage() {
  const title = document.title || "No title found: "
  const description = document.querySelector('meta[name="description"]')?.content || "No description found.";
  const headings = [...document.querySelectorAll("h1, h2, h3")].map((h) => {
    return h.innerText.trim();
  });
  const links = [...document.querySelectorAll("a")].map(el => el.outerHTML);

  return {
    title,
    description,
    headings,
    linkCount: links,
    domain: location.hostname
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "analyze") {
    sendResponse(analyzePage());
  }
});
