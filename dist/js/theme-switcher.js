/*!
 * Frontstep Bootstrap 5 Theme v1.0.1 (https://github.com/dfreerksen/frontsteps)
 * Copyright 2023 David Freerksen
 * Licensed under MIT (https://github.com/dfreerksen/frontsteps/blob/master/LICENSE)
 */
(() => {
  'use strict'

  function getStoredTheme () {
    return localStorage.getItem('theme')
  }

  function setStoredTheme (mode) {
    localStorage.setItem('theme', mode)
  }

  function setTheme (mode) {
    document.documentElement.setAttribute('data-bs-theme', mode)
  }

  function switchTheme (evt) {
    const mode = (evt.target.checked) ? 'dark' : 'light'

    setTheme(mode)
    setStoredTheme(mode)
  }

  // Set theme from localStorage
  const defaultTheme = null
  const currentTheme = getStoredTheme() || defaultTheme

  if (currentTheme) {
    setTheme(currentTheme)
  }

  document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.querySelector('input[type="checkbox"]#switcher')

    if (toggleSwitch) {
      const currentTheme = getStoredTheme()

      if (currentTheme === 'dark') {
        toggleSwitch.checked = true
      }

      toggleSwitch.addEventListener('change', switchTheme, false)
    }
  })
})()
