<?php

use Erfun\Wlws\ajax\wlws_otp_handle;
use Erfun\Wlws\ajax\wlws_setting_manager;
use Erfun\Wlws\templates\wlws_signup_standalone;
use Erfun\Wlws\panel\wlws_main_panel;
/**
 * Plugin Name: WLWS
 * Description: login with sms Wobika Made
 * Version: 1.0.1
 * Author: erfun from Wobika Team
 * Author URI: https://wobika.com
 * Text Domain: wlws
 * Domain Path: /languages
 * Requires at least: 5.0
 * Requires PHP: 7.2
 * License: GPLv2 or later
 */
define("wlws_plugin_url", plugin_dir_url(__FILE__));
require 'vendor/autoload.php';
(new wlws_main_panel)->run();
(new wlws_setting_manager())->run();
(new wlws_signup_standalone())->run();
(new wlws_otp_handle())->run();
add_action("init" , function (){
    wp_enqueue_script('wlws_notification_container' , wlws_plugin_url . 'src/js/wlws_notification_container.js');
});
