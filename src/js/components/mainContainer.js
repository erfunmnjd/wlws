document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.createElement("div");
  const notifContainer = document.createElement("div");
  notifContainer.classList = "absolute top-0 w-full";
  mainContainer.classList =
    "absolute top-0 right-0 w-full min-h-screen flex items-center justify-center";
  mainContainer.id = "wlws_main_container";
  notifContainer.id = "wlws_main_container_notification";
  document.body.prepend(notifContainer, mainContainer);
});
