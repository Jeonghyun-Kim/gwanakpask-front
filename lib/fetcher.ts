interface ErrorWithResponse extends Error {
  response: Response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher: (url: string, option?: RequestInit) => Promise<any> = async (
  url,
  option?,
) => {
  try {
    const response = option ? await fetch(url, option) : await fetch(url);

    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new Error(response.statusText) as ErrorWithResponse;
    error.response = response;
    error.data = data;

    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
};

export default fetcher;
