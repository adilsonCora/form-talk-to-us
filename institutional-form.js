APP.component.InstitutionalForm = ClassAvanti.extend({
  init (options) {
    this.setup(options)
    this.bind()
  },

  setup (options) {
    this.options = $.extend(
      {
        $form: $('.contact-form'),

        classSuccess: 'contact-form--success',
        classLoading: 'contact-form--loading',
        classButtonSubmit: 'contact-form__button',
        classError: 'contact-form__input--error',

        onSuccess () {}
      },
      options
    )
    this.optionsCapt = $.extend(
      {
        $formCapt: $('.contact-form-capt'),

        classSuccessCapt: 'contact-form--success',
        classLoadingCapt: 'contact-form--loading',
        classButtonSubmitCapt: 'contact-form__button',
        classErrorCapt: 'contact-form__input--error',

        onSuccessCapt () {}
      },
      options
    )
  },

  bind () {
    this.bindSubmit()
    this.bindSubmitCapt()
    this.checkbox ()
  },

  bindSubmit () {
    const { $form, classError, classButtonSubmit } = this.options

    $form
      .on('submit', event => {
        event.preventDefault()
      })
      .validate({
        errorClass: classError,
        errorElement: 'div',
        submitHandler: form => {
          const $form = $(form)
          $form.find(`.${classButtonSubmit}`).attr('disabled', 'disabled')

          this._submit($form)
          return false
        }
      })
  },

  checkbox () {

      const $formCapt = this.optionsCapt.$formCapt;

      $formCapt.find('input[name="ceianatal"]').prop('checked', true);

      $formCapt.find('input[type="checkbox"]').on('change', function() {
        const $clickedCheckbox = $(this);
        const $label = $clickedCheckbox.closest('label');

        $formCapt.find('input[type="checkbox"]').not($clickedCheckbox).prop('checked', false);
        $formCapt.find('label').not($label).removeClass('ativo');

        if ($clickedCheckbox.prop('checked')) {
          $label.addClass('ativo');
        } else {
          $label.removeClass('ativo');
        }
      });

      $formCapt.find('input[type="checkbox"]:checked').each(function() {
        const $label = $(this).closest('label');
        $label.addClass('ativo');
      });
  },

  bindSubmitCapt () {
    const { $formCapt, classErrorCapt, classButtonSubmitCapt } = this.optionsCapt

    $formCapt
      .on('submit', event => {
        event.preventDefault()
      })
      .validate({
        errorClass: classErrorCapt,
        errorElement: 'div',
        submitHandler: form => {
          const $formCapt = $(form)
          $formCapt.find(`.${classButtonSubmitCapt}`).attr('disabled', 'disabled')

          this._submitCap($formCapt)
          return false
        }
      })
  },

  _submitCap ($formCapt) {
    const { classLoadingCapt, classSuccessCapt, classButtonSubmitCapt, onSuccessCapt } = this.optionsCapt

    const url = $formCapt.attr('action')
    const type = $formCapt.attr('method')
    const data = JSON.stringify($formCapt.serializeObject())

    $formCapt.addClass(classLoadingCapt)

    $.ajax({
      url,
      type,
      data,
      headers: {
        Accept: 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json'
      }
    }).then(
      () => {
        $formCapt.addClass(classSuccessCapt).removeClass(classLoadingCapt)
        $formCapt.find(`.${classSuccessCapt}`).show()
        $('.contact-form__field').hide();
        $('.contact-form__success').show();

        $formCapt[0].reset()
        $(`.${classButtonSubmitCapt}`).removeAttr('disabled')

/*         if ($(window).width() > 991) {
          const positionForm = $('.contact-form').offset().top
          window.scrollTo(positionForm, 0)
        } else {
          window.scrollTo(0, 0)
        } */
        onSuccessCapt($formCapt)
      },
      error => {
        $formCapt.removeClass(classLoadingCapt)
        $(`.${classButtonSubmitCapt}`).removeAttr('disabled')
        throw new Error(error)
      }
    )
    $('.btn-outra-encomenda').on('click', event => {
      event.preventDefault();

      $('.contact-form__success').css('display', 'none');

      $('.contact-form__field').css('display', 'flex');

      const $activeLabel = $('.ativo');
      const $inputInsideLabel = $activeLabel.find('input[type="checkbox"]');

      $inputInsideLabel.prop('checked', true);

    })
  },

  _submit ($form) {
    const { classLoading, classSuccess, classButtonSubmit, onSuccess } = this.options

    const url = $form.attr('action')
    const type = $form.attr('method')
    const data = JSON.stringify($form.serializeObject())

    $form.addClass(classLoading)

    $.ajax({
      url,
      type,
      data,
      headers: {
        Accept: 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json'
      }
    }).then(
      () => {
        $form.toggleClass(classSuccess).removeClass(classLoading)

        $form[0].reset()
        $(`.${classButtonSubmit}`).removeAttr('disabled')

        if ($(window).width() > 991) {
          const positionForm = $('.contact-form').offset().top
          window.scrollTo(positionForm, 0)
        } else {
          window.scrollTo(0, 0)
        }
        onSuccess($form)
      },
      error => {
        $form.removeClass(classLoading)
        $(`.${classButtonSubmit}`).removeAttr('disabled')
        throw new Error(error)
      }
    )
  }
})
