export default function getUserCoords(){
    return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Я определил координаты: " + latitude + " " + longitude);
        resolve({ latitude, longitude });
    }, error => {
        console.error("Ошибка при получении координат:", error);
        resolve({ latitude: 37.6173, longitude: 55.7558 }); // Возвращаем дефолтные координаты, если координаты не получены
        reject(error);
    });
    });
}