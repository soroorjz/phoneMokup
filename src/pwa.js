let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('رویداد beforeinstallprompt فعال شد');

  setTimeout(() => {
    showInstallPopup();
  }, 3000);
});

function showInstallPopup() {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return; // اگر PWA نصب شده باشد، پاپ‌آپ نمایش داده نشود
  }

  const installPopup = document.getElementById('install-popup');
  installPopup.style.display = 'block';

  const installButton = document.getElementById('install-button');
  installButton.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('کاربر نصب را تأیید کرد');
        } else {
          console.log('کاربر نصب را رد کرد');
        }
        deferredPrompt = null;
        installPopup.style.display = 'none';
      });
    }
  });

  const cancelButton = document.getElementById('cancel-button');
  cancelButton.addEventListener('click', () => {
    installPopup.style.display = 'none';
  });


  // ثبت سرویس‌ورکر
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('سرویس‌ورکر با موفقیت ثبت شد:', registration.scope);
      })
      .catch((error) => {
        console.error('خطا در ثبت سرویس‌ورکر:', error);
      });
  }
}
