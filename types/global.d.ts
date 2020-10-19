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

declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}
