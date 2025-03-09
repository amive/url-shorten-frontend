const updateUrlInUI = (urlId, newUrl) => {
  const urlElement = document.querySelector(`#url-${urlId}`);
  if (urlElement) {
    urlElement.textContent = newUrl;
  }
};
const updateShortUrl = async (urlId, newUrl) => {
  if (!urlId) {
    console.error("Invalid URL ID!");
    showAlert("Invalid URL ID!", "error");
    return;
  }

  if (!newUrl) return;
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("User is not authenticated!");
    showAlert("User is not authenticated!", "error");
    return;
  }

  try {
    const response = await fetch(
      `https://www.shorten-url-api.infobrains.club/api/private/urls/${urlId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: newUrl }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        `${errorData.message || response.statusText}`
      );
      showAlert(
        `${errorData.message || response.statusText}`,
        "error" //Update url error msg
      );
      return;
    }

    updateUrlInUI(urlId, newUrl);
    getShortUrls();
  } catch (error) {
    console.error(error);
    showAlert(`Error updating the URL: ${error.message}`, "error");
  }
};
