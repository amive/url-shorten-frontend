const deleteShortUrl = async (urlId) => {
  const showCustomNotification = (message, isSuccess) => {
    const notification = document.getElementById("successNotification");
    notification.innerText = message;
    notification.style.backgroundColor = isSuccess ? "#4caf50" : "#f44336";
    notification.style.fontSize = "15px";
    notification.classList.remove("hidden");
    setTimeout(() => {
      notification.classList.add("hidden");
    }, 3000);
  };

  if (!urlId) {
    console.error("Invalid URL ID!");
    showCustomNotification("Invalid URL ID!", false);
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("User   is not authenticated!");
    showCustomNotification("User   is not authenticated!", false);
    return;
  }

  try {
    const response = await fetch(
      `https://www.shorten-url-api.infobrains.club/api/private/urls/${urlId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error(
        `Failed to delete URL: ${
          errorData.message || response.statusText
        } (Try refreshing).`
      );
      showCustomNotification(
        `Failed to delete URL: ${
          errorData.message || response.statusText
        } (Try refreshing).`,
        false
      );
      return;
    }

    const urlElement = document.querySelector(`#url-${urlId}`);
    if (urlElement) {
      urlElement.remove();
    }

    showCustomNotification("URL deleted successfully!", true);
    getShortUrls();
  } catch (error) {
    console.error(error);
    showCustomNotification(`Error deleting the URL: ${error.message}`, false);
  }
};
