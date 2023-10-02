(function () {
  'use strict'

  function initFlashTimeout () {
    const alerts = [].slice.call(document.querySelectorAll('#flash .alert'))

    alerts.forEach((alert) => {
      // eslint-disable-next-line no-undef
      const alertElem = new bootstrap.Alert(alert)

      window.setTimeout(() => {
        if (alertElem._element) {
          alertElem.close()
        }
      }, 4000)
    })
  }

  const flashData = {
    primary: {
      icon: 'bi-1-circle-fill'
    },
    secondary: {
      icon: 'bi-2-circle-fill'
    },
    success: {
      icon: 'bi-check-circle-fill',
      aria: {
        label: 'Success:'
      }
    },
    warning: {
      icon: 'bi-exclamation-circle-fill',
      aria: {
        label: 'Warning:'
      }
    },
    danger: {
      icon: 'bi-x-circle-fill',
      aria: {
        label: 'Danger:'
      }
    },
    info: {
      icon: 'bi-info-circle-fill',
      aria: {
        label: 'Info:'
      }
    },
    light: {
      icon: 'bi-brightness-high-fill'
    },
    dark: {
      icon: 'bi-moon-stars-fill'
    }
  }

  window.flash = (message, type = 'info', options = {}) => {
    const typeOptions = { icon: 'bi-info-circle-fill', aria: { label: 'Info:' } }
    const opts = Object.assign({}, typeOptions, options)
    const alertPlaceholder = document.getElementById('flash')
    const wrapper = document.createElement('div')
    const types = Object.keys(flashData)
    let forcedType = type.toLowerCase()

    if (forcedType === 'error') {
      forcedType = 'danger'
    } else if (!types.includes(forcedType)) {
      forcedType = 'info'
    }

    wrapper.setAttribute('class', `alert alert-${forcedType} alert-dismissible fade show d-flex`)
    wrapper.setAttribute('role', 'alert')
    wrapper.innerHTML = [
      `<i class="bi ${opts.icon} me-2" aria-label="${opts.aria.label}"></i>`,
      `<div>${message}</div>`,
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
    ].join('')

    alertPlaceholder.append(wrapper)

    initFlashTimeout()
  }

  Object.entries(flashData).forEach(([type, data]) => {
    const capitalizedType = type[0].toUpperCase() + type.slice(1)
    const flashFunction = `flash${capitalizedType}`

    window[flashFunction] = (message, options = {}) => {
      const opts = Object.assign({}, data, options)

      window.flash(message, type, opts)
    }

    if (type === 'danger') {
      window.flashError = (message, options = {}) => {
        window[flashFunction](message, options)
      }
    }
  })

  document.addEventListener('DOMContentLoaded', () => {
    initFlashTimeout()
  })
})()
