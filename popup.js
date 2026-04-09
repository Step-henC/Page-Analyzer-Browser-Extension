

document.getElementById("analyze").addEventListener("click", async() => {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, { action: "analyze"}, (response) => {
    const resultContainer = document.getElementById("results");

    if (!response) {
      resultContainer.innerText = "Unable to analyze this page.";
      return;
    }

    const { title, description, headings, linkCount, domain } = response;

    const anchorList = '<ul>' + linkCount.map(anchor => `<li>${anchor}</li>`).join('') + '</ul>';

    resultContainer.innerHTML = `
    <strong>Domain: </strong>${domain}<br/>
    <strong>Title: </strong>${title}<br/>
    <strong>Description: </strong>${description}<br/>
    <strong>Headings:</strong>${
      headings.length ? headings.join(", ") : "No headings found"
    }<br/>
    <strong>Links:</strong> ${anchorList}` ;
  });
});
