<?php

namespace Erfun\Wlws\panel;

use Erfun\Wlws\ajax\wlws_setting_manager;

class wlws_main_panel
{
    public $main_slug;
    public $auth;
    public function __construct()
    {
        $this->main_slug = 'wlws_main_panel';
        $this->auth = 'wlws_auth';
    }

    public function run(){
        $this->create_main_panel();
        add_action("admin_head" ,function (){
            wp_enqueue_style($this->main_slug, wlws_plugin_url. 'src/css/wlws_main_panel.css');
            wp_enqueue_script($this->main_slug."alpine" , wlws_plugin_url. 'src/js/wlws_main_panel.js' ,['jquery'], '1.1.1' );
            wp_localize_script($this->main_slug."alpine" , 'wlws' ,[
                'plugin_url' => wlws_plugin_url ,
                'ajax_url'=> admin_url('admin-ajax.php'),
                'prefix' => (new wlws_setting_manager)->prefix
                ]);
        });
    }
    function create_main_panel(): void
    {
        add_action("admin_menu" , function (){
            add_menu_page("ورود پیامکی", "ورود پیامکی وبیکا", "administrator", $this->main_slug , [$this , "auth_submenu_html"]);
        });
    }
    function auth_submenu_html(): string
    {
        ob_start();
        echo <<<HTML
<div id="wlws_loading_box" class="absolute top-1/2 translate-y-1/2 right-1/2 translate-x-1/2 text-black z-50">
<div class="flex items-center p-2 gap-2 ">
    <p class="!text-2xl font-bold animate-pulse">لطفا کمی صبر کنید </p>
    <div class="flex gap-0.5 pt-2 animate-pulse">
        <div class="animate-bounce size-2 bg-black rounded-full"></div>
        <div style="animation-delay: 0.5s" class="animate-bounce size-2 bg-black rounded-full"></div>
        <div class="animate-bounce size-2 bg-black rounded-full"></div>
    </div>
</div>
</div>
<form id="wlws_settings" class="relative flex fle-row flex-wrap w-11/12 gap-5 bg-sky-300 p-5 pr-0 mx-auto rounded-2xl text-white font-bold blur-3xl">
    <div class="w-1/7">
        <div id="wlws_setting_button_container" class="w-full rounded-tl-3xl rounded-bl-3xl py-5 bg-sky-800 [&_button]:bg-sky-500 [&_button]:hover:bg-sky-700 [&_button]:first:rounded-tl-lg [&_button]:last:rounded-bl-lg">
        </div>
    </div>
    <div id="wlws_setting_div_container" class="w-5/6 rounded-3xl p-5 col-span-4 bg-white text-black h-96 overflow-hidden"></div>
    <div class="w-full flex items-center justify-center">
        <button id="wlws_submit_button" type="submit" class="bg-sky-800 p-1 rounded-3xl w-2/5 flex items-center justify-center gap-2 peer cursor-pointer">
            <p>ذخیره تغییرات</p>
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5 animate-spin hidden" viewBox="0 0 512 512"><path d="M320 146s24.36-12-64-12a160 160 0 10160 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 58l80 80-80 80"/></svg>
        </button>
    </div>
</form>
HTML;
        ob_flush();
        return ob_end_clean();
    }
}