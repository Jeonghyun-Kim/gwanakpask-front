import photosJSON from './photos.json';
import artistsJSON from './artists.json';
import covidJSON from './covid.json';
import landscapeJSON from './landscape.json';
import congratsJSON from './congrats.json';

const photos = photosJSON;
export const artists: Artist[] = artistsJSON;
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

export const covidPhotos = covidJSON;

export const landscapePhotos = landscapeJSON;

export const congrats = congratsJSON;

export default {
  artists,
  photosWithArtist,
  artistsWithPhotos,
  getArtistWithPhotos,
  covidPhotos,
  congrats,
};
