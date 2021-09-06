import GhostContentAPI from '@tryghost/content-api';

const GHOST_HOST = 'https://demo.ghost.io';
const GHOST_KEY = '22444f78447824223cefc48062';

const api = new GhostContentAPI({
    url: GHOST_HOST,
    key: GHOST_KEY,
    version: "v3"
});

export async function getGhostPosts() {
    return await api.posts
        .browse({
            limit: "all"
        })
        .catch(err => {
            console.error(err);
        });
}


export async function getGhostPost(id) {
    console.log('getGhostPost');
    console.log(id);

    return await api.posts
        .read({
            id: id
        })
        .catch(err => {
            console.error(err);
        });
}