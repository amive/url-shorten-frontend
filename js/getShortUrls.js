const shortenUrlList = document.getElementById("shorten-list");

const getShortUrls = async () => {
  const url = "https://www.shorten-url-api.infobrains.club/api/private/urls";
  const token = localStorage.getItem("token");
  const page = 1;
  const limit = 10;

  const response = await fetch(`${url}?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const jsonResponse = await response.json();

  if (response.status === 500) {
    alert("Internal server error");
  }

  if (response.status === 401) {
    alert("Unauthorized");
    localStorage.removeItem("token");
    window.location.href = "/index.html";
  }

  if (response.status === 200) {
    const data = jsonResponse.data;

    function toggleDetailsAndActions(li) {
      const details = li.querySelector(".shorten-url__details");
      const actions = li.querySelector(".shorten-url__actions");
      const shortened = li.querySelector(".shorten-url__short");

      const isHidden = details.classList.contains("hidden");
      details.classList.toggle("hidden", !isHidden);
      actions.classList.toggle("hidden", !isHidden);
      shortened.classList.toggle("hidden", !isHidden);
    }

    shortenUrlList.innerHTML = "";

    data.forEach((shortUrl) => {
      const li = document.createElement("li");
      li.classList.add("shorten-url");

      li.innerHTML = `
        <div class="shorten-url__info">
            <p class="shorten-url__original"><strong>Original:</strong> ${
              shortUrl.originalUrl
            }</p>
            <p class="shorten-url__short hidden"><strong>Shortened:</strong> 
                <a href="${
                  shortUrl.shortUrl
                }" target="_blank" rel="noopener noreferrer">${
        shortUrl.shortUrl
      }</a>
            </p>
            <p class="shorten-url__clicks"><strong>Clicks:</strong> ${
              shortUrl.clicks
            }</p>
            <button class="toggle-details">Details</button>
            <div class="shorten-url__details hidden">
                <p><strong>Created:</strong> ${new Date(
                  shortUrl.createdAt
                ).toLocaleDateString()}</p>
                <p><strong>Updated:</strong> ${new Date(
                  shortUrl.updatedAt
                ).toLocaleDateString()}</p>
            </div>
        </div>
        <div class="shorten-url__actions hidden">
            <button class="edit-btn">Edit</button>
            <input type="text" class="shorten-url__update-input hidden" placeholder="New URL" />
            <a class="update-btn hidden" onclick="updateShortUrl('${
              shortUrl.id
            }')">Update</a>
           <a class="delete-btn hidden" onclick="deleteShortUrl('${
             shortUrl.id
           }')">Delete</a>
        </div>
      `;

      const detailsButton = li.querySelector(".toggle-details");

      detailsButton.addEventListener("click", () => {
        toggleDetailsAndActions(li);

        const details = li.querySelector(".shorten-url__details");

        if (!details.classList.contains("hidden")) {
          details.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }
      });

      const editButton = li.querySelector(".edit-btn");
      const newUrlInput = li.querySelector(".shorten-url__update-input");
      const updateButton = li.querySelector(".update-btn");
      const deleteButton = li.querySelector(".delete-btn");

      editButton.addEventListener("click", () => {
        newUrlInput.classList.toggle("hidden");
        updateButton.classList.toggle("hidden");
        deleteButton.classList.toggle("hidden");
      });

      updateButton.addEventListener("click", async () => {
        const newUrl = newUrlInput.value;
        if (newUrl) {
          try {
            await updateShortUrl(shortUrl.id, newUrl);
            showAlert("URL updated successfully!", "success");
            getShortUrls();

            const shortenResult = document.getElementById("shorten-result");
          } catch (error) {
            console.error(error);
            showAlert("Failed to update URL!", "error");
          }
        } else {
          showAlert("Please enter a new URL!", "error");
        }
      });

      shortenUrlList.appendChild(li);
    });
  }
};

const showAlert = (message, type) => {
  const alertBox = document.createElement("div");
  alertBox.textContent = message;
  alertBox.className = type === "success" ? "alert-success" : "alert-error";
  alertBox.style.backgroundColor = type === "success" ? "#4caf50" : "#f44336";
  document.body.appendChild(alertBox);
  setTimeout(() => {
    alertBox.remove();
  }, 3000);
};

getShortUrls();
