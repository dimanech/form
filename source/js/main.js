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
			ignore: '.unhappyMessage, .small-note, .js-clone-ignore',
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

	validationInit: function () {

		var test = {
			lettersOnly: function (val) {
				return  /^[а-яА-ЯёЁa-zA-Z0-9]+$/.test(val);
			},

			digitsOnly: function (val) {
				return /^[0-9]/.test(val);
			},

			minLength: function (val, length) {
				return val.length >= length;
			},

			maxLength: function (val, length) {
				return val.length <= length;
			}
		};

		$('#form-declaration').isHappy({
			errorTemplate : function (error) {
				return $('<div id="' + error.id + '" class="form__msg" role="alert"><p>' + error.message + '</p></div>');
			},
			classes: {
				'field': 'form__invalid'
			},
			fields: {
				'#general__name': {
					message: 'Только цифры',
					test: test.digitsOnly
				},
				'.js-is-textOnly': {
					message: 'Только текст',
					test: test.lettersOnly
				},
				'.js-is-lenghtMin': {
					message: 'Поле должно содержать не менее ' + $(this).attr('minlength') + ' символа',
					test: test.minLength
				},
				'.js-is-lenghtMax': {
					message: 'Поле не должно превышать ' + $(this).attr('maxlength') + ' символов',
					test: test.maxLength
				}
			}
		});
	},

	init: function () {
		var scripts = this;

		scripts.detecting();

		$(function () {
//			if (!scripts.isModernBrowser) {
//
//			}

			scripts.validationInit();
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
