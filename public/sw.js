self.addEventListener('install', (event) => {
  event.respondWith(
    fetch(event.request).catch((error) => {
      console.error('Fetch failed; returning offline page instead.', error);
      return new Response('شبکه در دسترس نیست. لطفاً دوباره تلاش کنید.');
    })
  );
});
