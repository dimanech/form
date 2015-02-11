;
var scripts = scripts || {};

jQuery.validator.addMethod("lettersonly", function(value, element) {
	return this.optional(element) || /^[a-z," "]+$/i.test(value);
}, "Letters only please");

scripts.Common = {
	detecting: function () {
		$('html').removeClass('no-js');
	},

	isModernBrowser: function () {
		if ( // modernizer alternative
			'querySelector' in document &&
			'localStorage' in window &&
			'addEventListener' in window 
			) {
			return true;
		} else {
			return false;
		}
	},

	jsPlaceholderInit: function () {
		$('input[placeholder], textarea[placeholder]').placeholder();
	},

	jqueryValidateInit: function () {
		$('#form-declaration').validate({
			errorClass: "invalid",
			wrapper: "div class='form__msg'",
			errorElement: "p",
			errorPlacement: function(error, element) {
				error.insertBefore(element);
			},
			submitHandler: function(form) {
				form.submit();
			}
		});

		//$(".js-validate-digits").rules( "add", {
		//	required: true,
		//	minlength: 2,
		//	digits: true,
		//	messages: {
		//		required: "Required input",
		//		minlength: jQuery.format("Please, at least {0} characters are necessary"),
		//		digits: jQuery.format("Please, at least {0} digits are necessary")
		//	}
		//});
		//
		//$(".js-validate-letters").rules( "add", {
		//	required: true,
		//	minlength: 2,
		//	digits: false,
		//	messages: {
		//		required: "Required input",
		//		minlength: jQuery.format("Please, at least {0} digits are necessary"),
		//		digits: jQuery.format("Please, at least {0} digits are necessary")
		//	}
		//});
	},

	toggleFormSection: function() {
		var ctrlInput = $(".js-related-control").find("input[type='checkbox']");

		function disableOnChecked (el, checked) {
			var sectionBlc = el.parents(".js-related-control").next(".js-related-section");

			sectionBlc[checked ? "removeClass" : "addClass"]("i-inputs_disabled");
			sectionBlc.find("input, select, textarea").attr("disabled", !checked);
		}

		ctrlInput.each(function() {
			var self = $(this),
				ctrlInputInit = self.is(":checked");

			disableOnChecked(self, ctrlInputInit);
		});

		ctrlInput.on('click', function() {
			disableOnChecked($(this), this.checked);
		});
	},

	inputActions: function() {
		var inputs = $('input[data-inp-act], select[data-inp-act]');

		inputs.wrap("<span class='form__input-w-ico'></span>");
		$('<i class="form__input-w-ico__ico form__input-act"></i>').insertAfter(inputs);

		inputs.each(function() {
			var input = $(this),
				inputId = input.attr('id'),
				inputActions = input.data('inp-act').split(',');

			$.each(inputActions, function (key, value) {
				$(input.next('.form__input-w-ico__ico'))
					.append('<label class="i-ico i-ico_'+ value +'" role="button" title="'+ value +'">' +
				'<input type="checkbox" name="'+ inputId + '_' + value +'" tabindex="-1" /></label>');
			});
		});

		$(".form__input-act input[type='checkbox']").on('click', function() {
			$(this).parent().toggleClass('js-ico-checked');
		});
	},

	cloneyaInit: function () {
		$('.js-clone-wrapper').cloneya({
			limit: 10,
			cloneThis: '.js-toclone',
			valueClone: false,
			dataClone: false,
			deepClone: false,
			cloneButton: '.js-clone',
			deleteButton: '.js-clone-delete',
			clonePosition: 'after',
			serializeID: true,
			ignore: 'label.error, .small-note',
			defaultRender: false
		});

		//$('.js-clone').on('click', function(e) {
		//	e.preventDefault();
		//	$('.js-clone-wrapper').trigger('clone_clone');
		//});
		//
		//$('.js-clone-delete').on('click', function(e) {
		//	e.preventDefault();
		//	$('.js-clone-wrapper').trigger('clone_delete');
		//});
	},

	addAutoComplete: function(elem, source) {
		var elemPar = $(elem).parent();

		$(elem).autocomplete({
			source: source,
			appendTo: elemPar
		});
	},

	init: function () {
		var scripts = this;

		scripts.detecting();

		$(function () {
//			if (!scripts.isModernBrowser) {
//
//			}

			//scripts.jqueryValidateInit();
			scripts.toggleFormSection();
			scripts.inputActions();
			scripts.cloneyaInit();
			scripts.addAutoComplete("#general__name", ['Аграфена', 'Акакий', 'fffff']);
			scripts.addAutoComplete("#general__surname", ['Аграфений', 'Акакиевна', 'fffff']);
		});

		return scripts;
	}
};

scripts.Common.init();
