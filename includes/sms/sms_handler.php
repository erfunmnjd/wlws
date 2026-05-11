<?php

namespace Erfun\Wlws\sms;

use Erfun\Wlws\ajax\wlws_setting_manager;

class sms_handler
{
    protected string $API_key;
    protected string $endpoint;
    protected string $prefix;
    protected string $lenght;
    protected string $password;
    public function __construct()
    {
        $this->prefix = new wlws_setting_manager()->prefix;
        $this->API_key = get_option($this->prefix . "auth_key");
        $this->endpoint = get_option($this->prefix . "sms_service");
        $this->lenght = get_option($this->prefix . "pass_lenght", 4);
        $this->password = $this->generate_random_password($this->lenght);
    }
    // @param lengh = lengh of generated password
    function generate_random_password($lenght): string
    {
        $preGenerated = rand(1000000000, 9999999999);
        return substr($preGenerated, 0, (int)$lenght);
    }

    public function send_otp_code($phone)
    {
        //@TODO connect to send PASS
        if ($this->API_key && $this->endpoint) {
            if (isset($_COOKIE["otp_code_$phone "])) {
                wp_send_json_error(["message" => "کد otp قبلی هنوز منقضی نشده است."]);
            } else {
                $otp_code_encrypt = password_hash($this->password, PASSWORD_DEFAULT);
                setcookie("otp_code_$phone", $otp_code_encrypt, time() + 120, '/');
                wp_send_json_success(["message" => "کد برای شما پیامک شد", $this->password]);
            }
        } else {
            wp_send_json_error(["message" => "درحال حاظر درگاه پیامکی انتخاب نشده است"]);
        }
    }
    public function verify_otp_code($phone, $otp)
    {
        if ($this->API_key && $this->endpoint) {
            $otp_code = $_COOKIE["otp_code_$phone"];
            if (isset($otp_code)) {
                $verify = password_verify($otp, $otp_code);
                if ($verify) {
                    //@TODO doing signup thinks
                    wp_send_json_success(["message" => "ثبت نام با موفقیت انجام شد"]);
                } else {
                    wp_send_json_error(["message" => "کد وارد شده صحیح نمیباشد."]);
                }
            } else {
                wp_send_json_error(["message" => "کد امنیتی منقضی شده است"]);
            }
        } else {
            wp_send_json_error(["message" => "درحال حاظر درگاه پیامکی انتخاب نشده است"]);
        }
    }
}
