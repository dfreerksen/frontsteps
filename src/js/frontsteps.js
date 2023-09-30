(function () {
  'use strict'

  // Tooltips
  const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  // eslint-disable-next-line no-undef, no-unused-vars
  const tooltipList = [...tooltipElements].map((el) => new bootstrap.Tooltip(el))
})()
