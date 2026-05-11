import Alpine from "alpinejs";
import { mask } from "@alpinejs/mask";
import { showNotification } from "./components/alert";
import "../css/minimal-tw.css";
import "flowbite";
window.Alpine = Alpine;
Alpine.plugin(mask);
document.addEventListener("DOMContentLoaded", () => {
  const notifContainer = document.createElement("div");
  notifContainer.id = "wlws_main_container";
  notifContainer.classList = "absolute top-0 w-full";
  document.body.prepend(notifContainer);
});
document.addEventListener("alpine:init", () => {
  Alpine.data("wlws_send_otp", () => ({
    wlws: window.wlws,
    loading: false,
    success: false,
    step: 1,
    finalStep: 3,
    phone: null,
    code: null,
    data: null,
    timer: false,
    timeout: false,
    timerCountDown: "00:00",
    otpCodeLenght() {
      let lenght = "9";
      let maxLength = window.wlws.otp_lenght || 4;
      return lenght.repeat(maxLength);
    },
    async sendOtp() {
      this.loading = true;
      this.success = false;
      try {
        let form = new FormData();
        this.timeout = false;
        form.append("action", "wlws_signup_otp_send");
        form.append("phone_number", this.phone);
        form.append("_ajax_nonce", this.wlws.nonce);
        const data = await fetch(this.wlws.ajax_url, {
          method: "POST",
          dataType: "json",
          body: form,
        });

        this.data = await data.json();

        if (!this.data.success) {
          showNotification(this.data.data.message, "warning");
        } else {
          this.step++;
          this.timer = true;
          showNotification(this.data.data.message, "success");
        }

        this.success = true;
      } catch (error) {
        console.error("خطا هنگام ارسال OTP:", error);
        alert(`عملیات ناموفق بود: ${error.message}`);
        this.success = false;
      } finally {
        this.loading = false;
      }
      if (this.timer) {
        const startTimer = (seconds) => {
          let remaining = seconds;
          const tick = () => {
            const m = Math.floor(remaining / 60)
              .toString()
              .padStart(2, "0");
            const s = (remaining % 60).toString().padStart(2, "0");
            this.timerCountDown = `${m}:${s}`;
            if (remaining > 0) {
              remaining--;
              setTimeout(tick, 1000);
            } else {
              this.timer = false;
              this.timeout = true;
            }
          };
          tick();
        };
        startTimer(120);
      }
    },
    async verifyOtp() {
      this.loading = true;
      this.success = false;
      try {
        let form = new FormData();
        this.timeout = false;
        form.append("action", "wlws_signup_otp_verify");
        form.append("phone_number", this.phone);
        form.append("code", this.code);
        form.append("_ajax_nonce", this.wlws.nonce);
        const data = await fetch(this.wlws.ajax_url, {
          method: "POST",
          dataType: "json",
          body: form,
        });

        this.data = await data.json();

        if (!this.data.success) {
          showNotification(this.data.data.message, "warning");
        } else {
          showNotification(this.data.data.message, "success");
        }

        this.success = true;
      } catch (error) {
        console.error("خطا هنگام ارسال OTP:", error);
        alert(`عملیات ناموفق بود: ${error.message}`);
        this.success = false;
      } finally {
        this.loading = false;
      }
    },
    resendOtpCode() {
      this.step = 1;
      this.sendOtp();
    },
  }));
});

Alpine.start();
