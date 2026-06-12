export default function getUserCoords(){
    return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.longitude;
        const longitude = position.coords.latitude;
        console.log("Я определил координаты: " + latitude + " " + longitude);
        resolve({ latitude, longitude });
    }, error => {
        console.error("Ошибка при получении координат:", error);
        reject(error);
    });
    });
}