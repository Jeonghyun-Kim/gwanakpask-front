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
export const artistsWithPhotos: ArtistWithPhotos[] = artists.map((artist) => {
  const photosFiltered = photos.filter(
    (photo) => photo.artistId === artist.artistId,
  );
  return {
    ...artist,
    photos: photosFiltered,
  };
});

export const getArtistWithPhotos: (artistId: number) => ArtistWithPhotos = (
  artistId,
) => {
  return (
    artistsWithPhotos.find((artist) => artist.artistId === artistId) ?? {
      artistId: 0,
      position: '',
      name: '',
      photos: [],
    }
  );
};

export default {
  photosWithArtist,
  artistsWithPhotos,
  getArtistWithPhotos,
};
