document.addEventListener("DOMContentLoaded", () => {
    const sliderImage = document.getElementById("sliderImage");

    const images = [
        "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ];
    let index = 0;

    function changeImage() {
        sliderImage.src = images[index];
        index = (index + 1) % images.length;
    }

    // Load first image
    changeImage();

    // Change every 3 seconds
    setInterval(changeImage, 3000);
});
