import { Dismiss } from "flowbite";
/**
 * Displays a customizable notification alert in the DOM.
 * @param {string} message - The main content message to display.
 * @param {'success' | 'danger' | 'warning' | 'info'} [type='info'] - Determines the color scheme and background classes.
 */
export function showNotification(message, type = "info") {
  const wlwsNotificationContainer = document.getElementById(
    "wlws_main_container_notification",
  );

  if (!wlwsNotificationContainer) {
    console.error(
      "Error: Notification container element with ID 'wlws_notification_container' not found.",
    );
    return;
  }
  const alertContainer = document.createElement("div");
  const srOnlySpan = document.createElement("span");
  const dismissButton = document.createElement("button");
  const alertContainerTimerLine = document.createElement("div");
  let alertContainerTimerLineWidth = 1;
  const svgIconMain = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );

  const svgIconClose = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  //base alert container classes
  alertContainer.className =
    "flex sticky top-0 right-0 items-center justify-between p-4 text-sm rounded-md w-full md:w-1/2 z-[99999] mb-5";
  alertContainer.setAttribute("role", "alert");
  //base dismiss button classes
  dismissButton.className =
    "inline-flex justify-center items-center bg-transparent";

  //base alertTimer classes
  alertContainerTimerLine.classList =
    "absolute bottom-0 rounded-full h-1 right-0";
  switch (type) {
    case "success":
      alertContainer.classList.add(
        "text-fg-success-strong",
        "bg-success-medium",
      );
      srOnlySpan.textContent = "Success";
      dismissButton.classList.add(
        "focus:ring-success-medium",
        "hover:bg-hover:bg-success-medium",
      );
      svgIconMain.setAttribute("fill", "none");
      svgIconMain.innerHTML =
        '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 11.5 11 13l4-3.5M12 20a16.405 16.405 0 0 1-5.092-5.804A16.694 16.694 0 0 1 5 6.666L12 4l7 2.667a16.695 16.695 0 0 1-1.908 7.529A16.406 16.406 0 0 1 12 20Z"/> ';
      alertContainerTimerLine.classList.add("bg-emerald-500");
      break;
    case "danger":
      alertContainer.classList.add("text-fg-danger-strong", "bg-danger-soft");
      srOnlySpan.textContent = "Danger";
      dismissButton.classList.add(
        "focus:ring-danger-medium",
        "hover:bg-hover:bg-danger-medium",
      );
      svgIconMain.setAttribute("fill", "none");
      svgIconMain.innerHTML =
        '	     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/> ';
      alertContainerTimerLine.classList.add("bg-rose-500");

      break;
    case "warning":
      alertContainer.classList.add("text-fg-warning", "bg-warning-soft");
      srOnlySpan.textContent = "Warning";
      dismissButton.classList.add(
        "focus:ring-warning-medium",
        "hover:bg-hover:bg-warning-medium",
      );
      svgIconMain.setAttribute("fill", "currentColor");
      svgIconMain.innerHTML =
        '<path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM6 6a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 6 6Zm-2 4H3a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 18 6Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/> ';

      alertContainerTimerLine.classList.add("bg-yellow-500");
      break;
    case "info":
    default:
      alertContainer.classList.add("text-fg-brand-strong", "bg-brand-softer");
      srOnlySpan.textContent = "Info";
      dismissButton.classList.add(
        "focus:ring-brand-medium",
        "hover:bg-hover:bg-brand-softer",
      );
      svgIconMain.setAttribute("fill", "none");
      svgIconMain.innerHTML =
        '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/> ';
      alertContainerTimerLine.classList.add("bg-blue-200");

      break;
  }

  alertContainer.id = `notification-${Date.now()}`;
  svgIconMain.setAttribute("class", "size-10 text-black");
  svgIconMain.setAttribute("aria-hidden", "true");
  svgIconMain.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgIconMain.setAttribute("viewBox", "0 0 24 24");
  alertContainer.appendChild(svgIconMain);
  srOnlySpan.className = "sr-only";
  alertContainer.appendChild(srOnlySpan);
  const messageContentDiv = document.createElement("div");
  messageContentDiv.className = "ms-2 text-lg md:text-base font-bold";
  messageContentDiv.innerHTML = message;
  alertContainer.appendChild(messageContentDiv);
  dismissButton.type = "button";
  dismissButton.setAttribute("aria-label", "Close");
  const closeSpan = document.createElement("span");
  closeSpan.className = "sr-only";
  closeSpan.textContent = "Close";
  svgIconClose.setAttribute("class", "text-black");
  svgIconClose.setAttribute("aria-hidden", "true");
  svgIconClose.setAttribute("width", "24px");
  svgIconClose.setAttribute("height", "24px");
  svgIconClose.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgIconClose.setAttribute("view-box", "0 0 24 24");
  svgIconClose.innerHTML =
    '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>';
  dismissButton.appendChild(closeSpan);
  dismissButton.appendChild(svgIconClose);
  alertContainer.appendChild(dismissButton);
  alertContainer.appendChild(alertContainerTimerLine);
  setInterval(() => {
    if (alertContainerTimerLineWidth !== 100) {
      alertContainerTimerLineWidth++;
      alertContainerTimerLine.style.width = `${alertContainerTimerLineWidth}%`;
    }
  }, 20);

  wlwsNotificationContainer.append(alertContainer);
  const dismis = new Dismiss(alertContainer, dismissButton);
  setTimeout(function () {
    dismis.hide();
  }, 2000);
}
