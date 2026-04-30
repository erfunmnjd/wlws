<?php

namespace database;

class wl_database_create
{
    public static function init()
    {
        global $wpdb;

        // نام جدول (پیشوند wp_ یا هر پیشوندی که وردپرس دارد)
        $table_name = $wpdb->prefix . 'wlws_options';

        // تعریف ساختار جدول
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$table_name} (
        id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        option_name varchar(255) NOT NULL,
        phone varchar(20) NOT NULL,
        sms_sent_at datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
        PRIMARY KEY (id),
        KEY user_id (user_id)
    ) {$charset_collate};";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta( $sql );
    }
}