(function () {
  'use strict'

  // Close navigation when clicking outside
  document.addEventListener('click', (evt) => {
    const navigation = document.getElementById('navigation')

    if (!navigation) {
      return
    }

    if (!evt.target.closest('#nav') && navigation.classList.contains('show')) {
      document.getElementById('hamburger').click()
    }
  })

  // Sidebar hover functionality
  function dropdownSidebar () {
    const sidebarItems = [].slice.call(document.querySelectorAll('#sidebar.sidebar .menu li a'))

    sidebarItems.forEach((el) => {
      el.addEventListener('click', (evt) => {
        const parentElement = evt.currentTarget.parentNode

        if (parentElement.classList.contains('open')) {
          // Close item if it is open
          slideUp(parentElement.querySelector('.dropdown-menu'), 800, () => {
            parentElement.classList.remove('open')
          })
        } else {
          // Close open items
          const openDropdownItems = [...parentElement.parentNode.querySelectorAll('li.open > .dropdown-menu')]
          openDropdownItems.forEach((elem) => {
            slideUp(elem, 200)
          })

          // Remove class from open link items
          const openLinkItems = [...parentElement.parentNode.querySelectorAll('li.open > a')]
          openLinkItems.forEach((elem) => {
            elem.classList.remove('open')
          })

          // Remove class from open list items
          const openListItems = [...parentElement.parentNode.querySelectorAll('li.open')]
          openListItems.forEach((elem) => {
            elem.classList.remove('open')
          })

          // Open item that was clicked and dropdown is available
          const dropdownMenuItem = parentElement.querySelector('.dropdown-menu')
          if (dropdownMenuItem) {
            slideDown(parentElement.querySelector('.dropdown-menu'), 200, () => {
              parentElement.classList.add('open')
            })
          }
        }
      }, false)
    })
  }

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

  const slideUp = (target, duration = 500, callback = () => {}) => {
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.boxSizing = 'border-box'
    target.style.height = target.offsetHeight + 'px'
    // eslint-disable-next-line no-unused-expressions
    target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0

    window.setTimeout(() => {
      target.style.display = 'none'
      target.style.removeProperty('height')
      target.style.removeProperty('padding-top')
      target.style.removeProperty('padding-bottom')
      target.style.removeProperty('margin-top')
      target.style.removeProperty('margin-bottom')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      callback()
    }, duration)
  }

  const slideDown = (target, duration = 500, callback = () => {}) => {
    target.style.removeProperty('display')

    let display = window.getComputedStyle(target).display

    if (display === 'none') {
      display = 'block'
    }

    target.style.display = display

    const height = target.offsetHeight

    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    // eslint-disable-next-line no-unused-expressions
    target.offsetHeight
    target.style.boxSizing = 'border-box'
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = height + 'px'
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')

    window.setTimeout(() => {
      target.style.removeProperty('height')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      callback()
    }, duration)
  }

  // Ready
  document.addEventListener('DOMContentLoaded', () => {
    dropdownSidebar()
    activeSidebar()
  })
})()
