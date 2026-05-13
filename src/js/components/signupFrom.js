import $ from "jquery";
export default () => {
  const closeModalButton = $("<button>", {
    class: "absolute top-0 right-2 bg-transparent text-white size-10 p-0 ",
    "aria-label": "close",
    "@click": "modal.hide()",
    html: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>',
  });
  const mainContainer = $("<div>", {
    class:
      "hidden flex flex-col items-center justify-center gap-5 w-full md:max-w-md h-screen md:h-1/2 overflow-y-auto overflow-x-hidden p-4 md:p-20 rounded-lg bg-sky-600 relative",
    "x-data": "wlws_send_otp",
  });
  const loadingContainer = $("<div>", {
    ":class": "loading ? 'flex' : 'hidden'",
    class:
      "absolute w-full h-full top-0 right-0 bg-white/50 backdrop-blue-lg z-50 items-center justify-center",
  });
  loadingContainer.append(
    '<svg xmlns="http://www.w3.org/2000/svg" class="size-10 animate-spin blur-none" viewBox="0 0 512 512"><path d="M320 146s24.36-12-64-12a160 160 0 10160 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 58l80 80-80 80"/></svg>',
  );
  ///step-1
  const step_1 = $("<div>", {
    class: "w-full border-b-2 border-white rounded-lg relative",
    "x-show": "step === 1",
  });
  step_1.append(
    $("<input>", {
      "x-model": "phone",
      "x-bind:disabled": "loading",
      "x-mask": "09999999999",
      class: "peer border-none text-white placeholder:text-white",
      plcaholder: " ",
      name: "wlws_signup_with_button_phone_number",
      type: "text",
    }),
  );
  step_1.append(
    $("<label>", {
      class:
        "transition-all absolute text-white bottom-7 text-lg peer-focus:text-lg peer-focus:bottom-7 peer-placeholder-shown:bottom-2 peer-placeholder-shown:text-sm",
      for: "wlws_signup_with_button_phone_number",
      text: "شماره تماس",
    }),
  );
  const step_1_button = $("<button>", {
    "x-show": "step === 1",
    "@click": "sendOtp",
    type: "button",
    text: "ارسال کد",
    class: "bg-sky-300 p-2 rounded-lg font-bold w-full",
  });

  //step 2
  const step_2 = $("<div>", {
    class: "w-full border-b-2 border-white rounded-lg relative",
    "x-show": "step === 2",
  });
  step_2.append(
    $("<input>", {
      "x-model": "code",
      autocomplete: "one-time-code",
      inputmode: "numbric",
      pattern: "\d{6}",
      "x-mask:dynamic": "otpCodeLenght",
      "x-bind:disabled": "loading",
      class:
        "peer appearance-none border-none text-white placeholder:text-white",
      plcaholder: " ",
      name: "wlws_signup_with_button_phone_code",
      type: "text",
    }),
  );
  step_2.append(
    $("<label>", {
      class:
        "transition-all absolute text-white bottom-7 text-lg peer-focus:text-lg peer-focus:bottom-7 peer-placeholder-shown:bottom-2 peer-placeholder-shown:text-sm",
      for: "wlws_signup_with_button_phone_code",
      text: "کد ارسال شده",
    }),
  );
  const step_2_button = $("<button>", {
    "@click": "verifyOtp",
    "x-show": "step === 2",
    type: "button",
    text: "تایید",
    class: "bg-sky-300 p-2 rounded-lg font-bold w-full",
  });
  const timerOtpCode = $("<span>", {
    "x-show": "timer",
    class: "text-white font-bold text-center",
    text: "زمان باقیمانده: ",
  }).append(
    $("<strong>", {
      "x-text": "timerCountDown",
    }),
  );
  const resendOtpCode = $("<button>", {
    "x-show": "timeout",
    class: "text-white font-bold text-center bg-transparent",
    "x-bind:disabled": "!timeout",
    "@click": "resendOtpCode",
    text: "ارسال مجدد کد",
  });

  mainContainer.append(closeModalButton);
  mainContainer.append(loadingContainer);
  mainContainer.append(timerOtpCode);
  mainContainer.append(resendOtpCode);
  mainContainer.append(step_1);
  mainContainer.append(step_1_button);
  mainContainer.append(step_2);
  mainContainer.append(step_2_button);

  return mainContainer[0];
};
