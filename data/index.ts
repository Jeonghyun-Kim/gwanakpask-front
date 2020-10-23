import photosJSON from './photos.json';
import artistsJSON from './artists.json';

const photos = photosJSON;
const artists: Artist[] = artistsJSON;
export const photosWithArtist: PhotoWithArtist[] = photos.map((photo) => {
  const artist = artists.find((tmp) => tmp.artistId === photo.artistId) ?? {
    artistId: -1,
    position: '',
    name: '',
  };
  return {
    ...photo,
    artist,
  };
});

export default {
  photosWithArtist,
};
