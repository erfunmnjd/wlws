<?php
namespace Erfun\Wlws\ajax;
class wlws_setting_manager
{
    public string $prefix = "wlws_metadata_";
    public function run(): void
    {
        add_action("wp_ajax_wlws_setting_save", [$this,"wlws_setting_manage_function"]);
        add_action("wp_ajax_wlws_get_setting_values" , [$this , "wlws_get_setting_values_function"]);
    }

    function wlws_setting_manage_function(): void
    {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $form = $_POST["form"];
            foreach ($form as $key => $value) {
                $name="";
                $data="";
                foreach ($value as $key2 => $value2) {
                    if ($key2 === 'name'){
                        $name= $this->prefix.$value2;
                    }else{
                        $data = $value2;
                    }
                }
                update_option($name,$data , true);
            }
            wp_reset_query();
        }
    }
    function wlws_get_setting_values_function()
    {
        if ($_SERVER['REQUEST_METHOD'] == "POST") {
            $name = $_POST["name"];
            wp_send_json_success(["value"=>get_option($name)]);
        }else{
            return null;
        }
    }
}