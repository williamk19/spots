export type DataType = {
  tracks: {
    items: {
      id: number;
      album: {
        images: {
          url: string;
        }[];
        name: string;
      };
      duration_ms: number;
      name: string;
      artists: {
        name: string;
      }[];
    }[];
  };
};

export type SelectedType = {
  id: number;
  name: String;
  album: {
    images: {
      url: String;
    }[];
    name: String;
  };
  duration_ms: number;
  artists: {
    name: String;
  }[];
};
