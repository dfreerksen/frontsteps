/*!
 * Frontstep Bootstrap 5 Theme v1.0.0 (https://github.com/dfreerksen/frontsteps)
 * Copyright 2023 David Freerksen
 * Licensed under MIT (https://github.com/dfreerksen/frontsteps/blob/master/LICENSE)
 */
(function () {
  'use strict'

  // Tooltips
  const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  // eslint-disable-next-line no-undef, no-unused-vars
  const tooltipList = [...tooltipElements].map((el) => new bootstrap.Tooltip(el))
})()
