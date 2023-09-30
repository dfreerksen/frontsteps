(function () {
  'use strict'

  // Active sidebar item(s)
  function activeSidebar () {
    const sidebarItems = [].slice.call(document.querySelectorAll('#sidebar.sidebar .sidebar-link'))

    sidebarItems.forEach((el) => {
      el.classList.remove('active')
      el.removeAttribute('aria-current')
    })

    sidebarItems.filter((el) => {
      const elementHref = el.getAttribute('href')
      const pattern = elementHref[0] === '/' ? elementHref.substring(1) : elementHref

      return pattern === (window.location.pathname).substring(1)
    }).forEach((el, ind) => {
      // Add active class
      el.classList.add('active')
      el.setAttribute('aria-current', 'page')

      // Highlight parent path
      if (ind === 0) {
        const parentItems = getParentsUntil(el, '#sidebar', '.nav-item.dropdown')

        parentItems.forEach((pel) => {
          pel.classList.add('open')
          pel.querySelector('a.dropdown-toggle').classList.add('active')
          pel.querySelector('ul.dropdown-menu').style.display = 'block'
        })
      }
    })
  }

  const getParentsUntil = (elem, parent, filter) => {
    // Setup parents array
    const parents = []

    // Get matching parent elements
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (parent) {
        if (elem.matches(parent)) break
      }

      if (filter) {
        if (elem.matches(filter)) {
          parents.push(elem)
        }

        continue
      }

      parents.push(elem)
    }

    return parents
  }

  // Ready
  document.addEventListener('DOMContentLoaded', () => {
    activeSidebar()
  })
})()
