jQuery(document).ready(function ($) {
	const wlws_setting_button_container = $("#wlws_setting_button_container")
	const wlws_setting_div_container = $("#wlws_setting_div_container")
	const wlws_settings = $("form#wlws_settings")
	const wlws_loading_box = $("#wlws_loading_box")
	const wlws_submit_button = $("#wlws_submit_button")
	let ids = [];
	$.getJSON(`${wlws.plugin_url}/src/json/panel.json`).done(async function (data) {
		const panel = data.panel;
		for (const element of panel) {
			ids.push(wlws.prefix + element.id);
			const button = create_button(element.id, element.button)
			const container = await create_container(element.id, element.container)
			wlws_setting_button_container.append(button);
			wlws_setting_div_container.append(container);
			if (ids.length === 1) {
				update_active(element.id)
			}
		}
		wlws_settings.removeClass('blur-3xl')
		wlws_loading_box.addClass("hidden")
	})
	
	function create_button(id, button) {
		const created_button = $("<button>",{
			class:"w-11/12 font-bold text-right p-3 wlws_panel_button",
			text:button.label,
			id:id+"_button",
			type:"button",
		})
		created_button.on("click", function () {
			update_active(id)
		})
		return created_button;
	}
	
	async function create_container(id, container) {
		const create_container = $("<div></div>")
		create_container.addClass("w-full h-full bg-sky-50 rounded-2xl hidden wlws_panel_container overflow-y-auto ")
		create_container.attr("id", id + "_container");
		const container_inputs = await create_inputs(container.inputs);
		create_container.append(container_inputs);
		return create_container
	}
	
	async function create_inputs(inputs) {
		let generated_inputs = $("<div class='grid grid-cols-2'></div>");
		 for (const input of inputs) {
			 let input_value= await get_input_value(input.id)
			let input_container = $("<div>",{
				class:"p-5 border-8 rounded-2xl bg-white border-sky-50"
			});
			
			$("<label>",{
				class:"block mb-2.5 text-sm font-medium w-full",
				for:input.id,
				text:input.label,
			}).appendTo(input_container);
			
			if (input.type === "select") {
				let select = $("<select>",{
					id: input.id,
					name:input.id,
					class:"mt-1 w-full rounded-lg border-gray-300 p-2"
				})
				let options = input.options;
				options.forEach(option => {
					let optn = $("<option>",{
						text: option.label,
						value:option.value,
						selected: option.value === input_value
					});
					optn.text(option.label);
					optn.val(option.value);
					select.append(optn)
				})
				input_container.append(select)
			}else if(input.type === "checkbox") {
				input_container.addClass("flex flex-row gap-5 items-center justify-between")
				let checkbox = $(`<input>` , {
					id: input.id,
					type: input.type,
					checked: input_value === "on",
					class:"ring-blue-600 w-full p-2"
				}).appendTo(input_container);
				let hiddenCheckBox = $("<input>",{
					name:input.id,
					type:"hidden",
					value: input_value === "on" ? "on" : "off",
				}).appendTo(input_container)
				checkbox.on("change", function () {
					let el = $(this)
					if (el.is(":checked")){
						hiddenCheckBox.val("on")
					}else{
						hiddenCheckBox.val("off")
					}
				})
			}else if (input.type === "radio"){
				const radio_container = $("<fieldset>",{
					class : "w-full flex flex-row items-center justify-between",
				})
				input.labels.forEach(label => {
					const radio_c = $("<div>",{
						class:"w-full flex gap-2 items-center justify-evenly",
					});
					$("<label>" , {
						text : label.label,
						for: label.value,
					}).appendTo(radio_c)
					$("<input>" , {
						type: "radio",
						id: label.id,
						name: input.id,
						value: label.value,
						checked: input_value === label.value,
					}).appendTo(radio_c)
					radio_container.append(radio_c)
					input_container.append(radio_container)
				})
			}else{
				$(`<input>` , {
					id: input.id,
					name: input.id,
					type: input.type,
					value: input_value,
					class:"rounded bg-white w-full p-2"
				}).appendTo(input_container);
			}
			generated_inputs.append(input_container);
		}
		return generated_inputs;
	}
	wlws_settings.on("submit", async function (e){
		e.preventDefault();
		wlws_submit_button.prop("disabled", true).toggleClass("cursor-pointer cursor-not-allowed active").find("svg").toggleClass("hidden");
		let form = wlws_settings.serializeArray();
		await $.ajax({
			url:wlws.ajax_url,
			method:"POST",
			data :{
				'action':'wlws_setting_save',
				form
			},
		})
		wlws_submit_button.prop("disabled", false).toggleClass("cursor-pointer cursor-not-allowed active").find("svg").toggleClass("hidden");
	})
	function get_input_value(id) {
		return  new Promise((resolve, reject) => {
			$.ajax({
				url:wlws.ajax_url,
				method:"POST",
				dataType:'json',
				data:{
					action:'wlws_get_setting_values',
					name:wlws.prefix+id,
				},
				success: (res) => {
					resolve(res.data.value);
				},
				error: (err) => {
					reject(err);
				}
			})
		})
	}
	function update_active(selected) {
		const wlws_panel_button = $('.wlws_panel_button');
		const wlws_panel_container = $('.wlws_panel_container');
		wlws_panel_button.removeClass("!bg-sky-700");
		$(`#${selected}_button`).addClass("!bg-sky-700 ");
		wlws_panel_container.slideUp();
		$(`#${selected}_container`).slideDown();
	}
})