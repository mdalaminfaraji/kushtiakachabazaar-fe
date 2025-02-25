let isLoading = false;
let isLoaded = false;

export const loadGoogleMaps = () => {
  if (isLoaded) return Promise.resolve();
  if (isLoading) return new Promise((resolve) => {
    const checkLoaded = setInterval(() => {
      if (isLoaded) {
        clearInterval(checkLoaded);
        resolve(undefined);
      }
    }, 100);
  });

  isLoading = true;

  return new Promise<void>((resolve, reject) => {
    try {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      
      script.addEventListener("load", () => {
        isLoaded = true;
        isLoading = false;
        resolve();
      });

      script.addEventListener("error", (e) => {
        isLoading = false;
        reject(e);
      });

      document.body.appendChild(script);
    } catch (err) {
      isLoading = false;
      reject(err);
    }
  });
};
