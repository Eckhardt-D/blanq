(function () {
  window.usermaven = window.usermaven || function () {
    // eslint-disable-next-line prefer-rest-params
    (window.usermavenQ = window.usermavenQ || []).push(arguments)
  }
  const t = document.createElement('script')
  const s = document.getElementsByTagName('script')[0]
  t.defer = true
  t.id = 'um-tracker'
  t.setAttribute('data-tracking-host', 'https://events.usermaven.com')
  t.setAttribute('data-key', 'UM0uR5ZCzp')
  t.setAttribute('data-autocapture', 'true')
  t.setAttribute('data-privacy-policy', 'strict')
  t.src = 'https://t.usermaven.com/lib.js'
  s.parentNode.insertBefore(t, s)
})()
