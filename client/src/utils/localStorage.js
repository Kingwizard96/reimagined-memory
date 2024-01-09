export const getSavedNasaImages = () => {
    const savedNasaImages = localStorage.getItem('saved_nasa_images')
        ? JSON.parse(localStorage.getItem('saved_nasa_images'))
        : [];

    return savedNasaImages;
};

export const saveNasaImages = (nasaImageIdArr) => {
    if (nasaImageIdArr.length) {
        localStorage.setItem('saved_nasa_images', JSON.stringify(nasaImageIdArr));
    } else {
        localStorage.removeItem('saved_nasa_images');
    }
};

export const removeNasaImageId = (nasaImageId) => {
    const savedNasaImages = localStorage.getItem('saved_nasa_images')
        ? JSON.parse(localStorage.getItem('saved_nasa_images'))
        : null;

    if (!savedNasaImages) {
        return false;
    }

    const updatedSavedNasaImages = savedNasaImages?.filter((savedNasaImageId) => savedNasaImageId !== nasaImageId);
    localStorage.setItem('saved_nasa_images', JSON.stringify(updatedSavedNasaImages));

    return true;
}
