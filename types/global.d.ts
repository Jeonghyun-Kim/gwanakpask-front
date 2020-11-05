declare interface Admin {
  _id?: string;
  username: string;
  password: string;
}

declare interface Artist {
  _id?: string;
  artistId: number;
  position: string;
  name: string;
  profileUrl?: string;
}

declare interface ArtistWithPhotos {
  artistId: number;
  position: string;
  name: string;
  photos: Photo[];
}

declare interface Photo {
  _id?: string;
  photoId: number;
  artistId: number;
  title: string;
  hitCount?: number;
  url?: string;
}

declare interface PhotoWithArtist {
  photoId: number;
  title: string;
  artist: Artist;
  url?: string;
}

declare interface Message {
  _id: string;
  templateId: number;
  from: string;
  content: string;
}

declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}
