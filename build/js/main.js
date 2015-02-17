;
var scripts = scripts || {};

$.validator.addMethod("lettersonly", function(value, element) {
	return this.optional(element) || /^[а-яА-ЯёЁa-zA-Z]+$/i.test(value);
}, "Tільки букви, будьласка");

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

	toggleFormSection: function(enableOnValue) {
		var trueValue = (typeof enableOnValue === "undefined") ? "other" : enableOnValue,
			ctrlInput = $(".js-related-control").find("input[type='checkbox'], select");

		function enabled(el) {
			return (el.value == "other" || el.checked);
		}

		function toggleSection(el, checked) {
			var sectionBlc = el.parents(".js-related-control").next(".js-related-section");

			sectionBlc[checked ? "removeClass" : "addClass"]("i-inputs_disabled");
			sectionBlc.find("input, select, textarea").attr("disabled", !checked);
		}

		ctrlInput.each(function() {
			toggleSection($(this), enabled(this));
		});

		ctrlInput.on('change', function() {
			toggleSection($(this), enabled(this));
		});
	},

	inputActions: function() {
		var inputs = $('input[data-inp-act], select[data-inp-act], textarea[data-inp-act]');

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
			limit: 2000,
			cloneThis: '.js-toclone',
			valueClone: false,
			dataClone: false,
			deepClone: false,
			cloneButton: '.js-clone',
			deleteButton: '.js-clone-delete',
			clonePosition: 'after',
			serializeID: true,
			ignore: '.unhappyMessage, .js-clone-ignore',
			defaultRender: true,
			preserveChildCount: true
		});
	},

	addAutoComplete: function(elem, source) {
		var elemPar = $(elem).parent();

		$(elem).autocomplete({
			source: source,
			appendTo: elemPar
		});
	},

	dateSelectBoxesInit: function () {
		$().dateSelectBoxes({
			monthElement: $('#declaration__date_month'),
			dayElement: $('#declaration__date_day'),
			yearElement: $('#declaration__date_year'),
			keepLabels: true,
			yearLabel: 'Рік',
			monthLabel: 'Місяць',
			dayLabel: 'День'
		});
	},

	jqueryValidateInit: function () {

		var validateForm = $('#form-declaration'),
			validateSettings = {
				errorClass: "form__input_invalid",
				errorElement: "p",
				errorPlacement: function (error, element) {
					error.insertBefore(element).addClass('form__msg');
				}
			};

		jQuery.validator.addClassRules({
			'js-is-LettersOnly': {
				lettersonly: true
			},
			'js-is-DigitsOnly': {
				digits: true
			}
		});

		validateForm.validate(validateSettings);

		validateForm.on('reset', function () {
			validateForm.validate().resetForm();
		});

	},

	init: function () {
		var scripts = this;

		scripts.detecting();

		$(function () {
			scripts.jqueryValidateInit();
			scripts.toggleFormSection();
			scripts.inputActions();
			scripts.cloneyaInit();
			scripts.addAutoComplete("#general__name", ['Аграфена, Винница, Бережанский рай.', 'Акакий, Винница, Бережанский рай.', 'fffff, Киев']);
			scripts.addAutoComplete("#general__surname", ['Аграфений', 'Акакиевна', 'fffff']);
			scripts.dateSelectBoxesInit();
		});

		return scripts;
	}
};

scripts.Common.init();
