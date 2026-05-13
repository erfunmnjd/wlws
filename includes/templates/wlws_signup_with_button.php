<?php

namespace Erfun\Wlws\templates;

use Erfun\Wlws\ajax\wlws_setting_manager;

class wlws_signup_with_button
{
    protected wlws_setting_manager $setting;
    public function __construct()
    {
        $this->setting = new wlws_setting_manager();
    }
    public function run()
    {
        add_shortcode("wlws_signin_with_button", [$this, "wlws_singin_with_button_shortcode"]);
    }
    function wlws_singin_with_button_shortcode()
    {

        wp_enqueue_script('wlws_signup_with_button', wlws_plugin_url . 'src/js/output/signupWithButton.bundle.js', [], '1.0', ['strategy' => 'defer']);
        wp_localize_script("wlws_signup_with_button", 'wlws', [
            'plugin_url' => wlws_plugin_url,
            'ajax_url' => admin_url('admin-ajax.php'),
            'prefix' => $this->setting->prefix,
            'nonce' => wp_create_nonce('wlws_signup'),
            'otp_lenght' => get_option($this->setting->prefix . "pass_lenght", 4)
        ]);


        $button_style = get_option($this->setting->prefix . "button_style", "text");
        $button = "";
        if (is_user_logged_in()) {
            $panel_url = get_permalink(get_option('woocommerce_myaccount_page_id'));;
            $button = "<a href='$panel_url'>حساب کاربری</a>";
        } else {
            if ($button_style == "icon") {
                $button = '
                <button id="signup_button" class="bg-transparent p-3">
                    <svg class="size-10 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                </button>';
            } else {
                $button = "<button id='signup_button' class='bg-transparent border-b-2 p-3'>
            ورود
            </button>";
            }
        }
        ob_start();
        $HTML = $button;
        ob_end_flush();
        return $HTML;
    }
}
