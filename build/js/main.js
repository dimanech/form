;
var scripts = scripts || {};

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
				inputName = input.attr('name'),
				inputActions = input.data('inp-act').split(',');

			$.each(inputActions, function (key, value) {
				var title;

				switch (value) {
					case "hidden":
						var title = 'Це поле скрите';
						break;
					case "unclear":
						var title = 'Це поле нерозбірливе';
						break;
				}

				$(input.next('.form__input-w-ico__ico'))
					.append('<label class="i-ico i-ico_'+ value +'" role="button" title="'+ title +'">' +
				'<input type="checkbox" name="'+ inputName + '_' + value +'" tabindex="-1" /></label>');
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
			ignore: '.form__msg, .js-clone-ignore',
			defaultRender: true,
			preserveChildCount: true
		});
	},

	addAutoComplete: function(elem, source) {
		var elemPar = $(elem).parent();

		$.getJSON(source, function (data) {
			$(elem).autocomplete({
				source: data,
				appendTo: elemPar
			});
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

		$.validator.addMethod("lettersonly", function(value, element) {
			return this.optional(element) || /^[а-яА-ЯёЁіІїЇєЄ’’ґҐa-zA-Z]+$/i.test(value);
		}, "Tільки букви, будьласка");

		$.validator.addClassRules({
			'js-is-LettersOnly': {
				lettersonly: true
			},
			'js-is-DigitsOnly': {
				digits: true
			}
		});

		var form = $('#form-declaration'),
			validateSettings = {
				errorClass: "js-invalid",
				errorElement: "p",
				errorPlacement: function (error, element) {
					if (element.attr('required')) {
						error.insertBefore(element).addClass('form__msg form__msg_error');
					} else {
						error.insertBefore(element).addClass('form__msg form__msg_warn');
					}
				},
				focusInvalid: false,
				invalidHandler: function(form, validator) {
					if (!validator.numberOfInvalids())
						return;

					$('html, body').animate({
						scrollTop: $(validator.errorList[0].element).offset().top - 60
					}, 200);

				}
			},
			validateThis = form.validate(validateSettings),
			current = 0,
			content = $('.js-tab-content');

		form.on('reset', function () {
			form.validate().resetForm();
		});

		content.hide();
		$(content[0]).show();

		$(".js-section-go").on('click', function(e) {
			if (!$(this).is('[type="reset"]')) {
				e.preventDefault();
			}

			var self = $(this),
				validateBefore = self.hasClass('js-section-validate'),
				section = self.data('section-go'),
				goTo = '#section-' + section,
				showSection = function () {
					current = section;
					content.hide();
					$(goTo).fadeIn(400);
					$('html, body').animate({scrollTop:0}, 500);
				};

			if (validateBefore) {
				if (validateThis.form()) {
					showSection();
				}
			} else {
				showSection();
			}
		});

	},

	testJSON: function () {
		var form =$('#form-declaration');

		$('<pre id="form-declaration-text"></pre>').insertAfter(form);

		form.on( "submit", function(event) {
			event.preventDefault();
			$('#form-declaration-text').text(JSON.stringify($(this).serializeArray(), null, '\t'));
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
			scripts.addAutoComplete("#general__last-name", '/js/autocomplite/lastname.json');
			scripts.addAutoComplete("#general__name", '/js/autocomplite/firstname.json');
			scripts.addAutoComplete("#general__surname", '/js/autocomplite/patronymic.json');
			scripts.dateSelectBoxesInit();
			scripts.testJSON();
		});

		return scripts;
	}
};

scripts.Common.init();
