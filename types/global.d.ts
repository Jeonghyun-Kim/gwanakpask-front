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

declare interface Photo {
  _id?: string;
  photoId: number;
  artistId: number;
  title: string;
  hitCount: number;
  url?: string;
}
