<?php

namespace Erfun\Wlws\templates;

use Erfun\Wlws\ajax\wlws_setting_manager;

class wlws_signup_standalone
{
    public function run(): void
    {
        add_shortcode('wlws_signup_standalone', [$this, 'wlws_signup_standalone_shortcode']);
    }

    function wlws_signup_standalone_shortcode(): string
    {
        wp_enqueue_script('wlws_signup_standalone', wlws_plugin_url . 'src/js/output/signupStandAlone.bundle.js', [], '1.0', ['strategy' => 'defer']);
        wp_localize_script("wlws_signup_standalone", 'wlws', [
            'plugin_url' => wlws_plugin_url,
            'ajax_url' => admin_url('admin-ajax.php'),
            'prefix' => (new wlws_setting_manager)->prefix,
            'nonce' => wp_create_nonce('wlws_signup_standalone'),
            'otp_lenght' => get_option((new wlws_setting_manager)->prefix . "pass_lenght", 4)
        ]);

        ob_start();
        $HTML = <<<HTML
<div class="w-full bg-sky-600 max-w-md p-10 mx-auto rounded-lg relative" x-data="wlws_send_otp" >
    <div :class="loading ? 'flex' : 'hidden'" class="absolute rounded-lg w-full h-full top-0 right-0 bg-white/50 backdrop-blue-lg z-50 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-10 animate-spin blur-none" viewBox="0 0 512 512"><path d="M320 146s24.36-12-64-12a160 160 0 10160 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 58l80 80-80 80"/></svg>
    </div>
    <form @submit.prevent id="wlws_signup_standalone_form" class="w-full md:max-w-md flex flex-col gap-2" >
        <template x-if="step === 1">
            <div>
                 <div class="w-full border-b-2 border-white rounded-lg relative ">
                    <input 
                        x-model="phone" 
                        x-bind:disabled="loading" 
                        x-mask="09999999999" 
                        class="peer appearance-none border-none text-white placeholder:text-white" 
                        placeholder=" " 
                        name="wlws_signup_standalone_phone_number" 
                        type="text">
                    <label class="transition-all absolute text-white bottom-7 text-lg peer-focus:text-lg peer-focus:bottom-7 peer-placeholder-shown:bottom-2 peer-placeholder-shown:text-sm" for="wlws_signup_standalone_phone_number">شماره تماس</label>
                </div>
            </div>
        </template>
        <template  x-if="step === 2" >
            <div>
                 <div class="w-full border-b-2 border-white rounded-lg relative ">
                    <input otp x-model="code"
                            autocomplete="one-time-code"
                            x-bind:disabled="loading" 
                            inputmode="numeric"
                            maxlength="6"
                            pattern="\d{6}" 
                            x-mask:dynamic="otpCodeLenght"
                            class="peer appearance-none border-none text-white placeholder:text-white"
                            placeholder=" " 
                            name="wlws_signup_standalone_phone_number" 
                            type="text">
                    <label class="transition-all absolute text-white bottom-7 text-lg peer-focus:text-lg peer-focus:bottom-7 peer-placeholder-shown:bottom-2 peer-placeholder-shown:text-sm" for="wlws_signup_standalone_phone_number">کد ارسال شده</label>
                </div>
            </div>
        </template>
        <template x-if="timer">
            <p class="text-white font-bold text-center" >زمان باقیمانده  <strong x-text="timerCountDown"></strong> </p>
        </template>
        <template x-if="timeout">
            <button x-bind:disabled="!timeout" @click="resendOtpCode" class="font-bold text-center bg-transparent text-gray-50" >ارسال دوباره</button>
        </template>
        <template x-if="step === 1">
            <div class="w-full">
                <button type="button" @click="sendOtp" class="bg-sky-300 p-2 rounded-lg font-bold w-full" >ارسال کد</button>
            </div>
        </template>
        <template x-if="step === 2">
            <div class="w-full">
                <button type="button" @click="verifyOtp" class="bg-sky-300 p-2 rounded-lg font-bold w-full" >تایید کد ارسال شده</button>
            </div>
        </template>
    </form>
</div>
HTML;
        ob_end_flush();
        return $HTML;
    }
}
