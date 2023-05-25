const getImages = () => {
    return fetch('https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20')
    .then(response => response.json());
}

export default getImages;