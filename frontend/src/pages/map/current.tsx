const getCurrentLocation = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.display_name) {
          console.log(data.display_name);
        } else {
          console.log('Address not found');
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        console.log('Error fetching address');
      }
      return {
        latitude,
        longitude,
      };
    });
  } else {
    console.log('Geolocation not supported');
  }
};
export default getCurrentLocation;
