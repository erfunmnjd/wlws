<?php

namespace Erfun\Wlws\ajax;

use Erfun\Wlws\sms\sms_handler;

class wlws_otp_handle
{
    public $sms_handle;
    public function __construct()
    {
        $this->sms_handle = new sms_handler();
    }
    public function run(): void
    {
        add_action("wp_ajax_nopriv_wlws_signup_otp_send", [$this, "wlws_signup_otp_send_callback"]);
        add_action("wp_ajax_nopriv_wlws_signup_otp_verify", [$this, "wlws_signup_otp_verify_callback"]);
    }
    function wlws_signup_otp_send_callback(): void
    {
        //check if method is post
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $nonce = $_POST['_ajax_nonce'];
            $phone_number = $_POST['phone_number'];

            //verify NONCE
            if (wp_verify_nonce($nonce, "wlws_signup_standalone")) {

                // check phone number 
                if ($phone_number == 'null') {
                    wp_send_json_error(['message' => 'شماره تماس خود را وارد کنید']);
                } else {
                    //send otp code
                    $this->sms_handle->send_otp_code($phone_number);
                }
            } else {
                wp_send_json_error(['message' => 'مشکل مهم امنیتی']);
            }
        } else {
            wp_send_json_error('how did you get there');
        }
    }
    function wlws_signup_otp_verify_callback(): void
    {
        //check if method is post
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $nonce = $_POST['_ajax_nonce'];
            $phone_number = $_POST['phone_number'];
            $code = $_POST['code'];

            //verify NONCE
            if (wp_verify_nonce($nonce, "wlws_signup_standalone")) {

                // check phone number 
                if ($phone_number == 'null' && $code == 'null') {
                    wp_send_json_error(['message' => 'کد وارد شده صحیح نیست']);
                } else {
                    //send otp code
                    $this->sms_handle->verify_otp_code($phone_number, $code);
                }
            } else {
                wp_send_json_error(['message' => 'مشکل مهم امنیتی']);
            }
        } else {
            wp_send_json_error('how did you get there');
        }
    }
}
