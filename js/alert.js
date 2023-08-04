const toastTrigger = document.getElementById('liveToastBtn')
const toastLive = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLive)

    toast.show()
  })
}
