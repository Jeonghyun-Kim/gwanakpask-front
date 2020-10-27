import { useEffect } from 'react';
import useSWR from 'swr';
import Router from 'next/router';

const useAdmin: ({
  redirectTo,
  redirectIfFound,
  redirectAs,
}: {
  redirectTo: string;
  redirectIfFound?: boolean;
  redirectAs?: string;
}) => {
  username?: string;
  mutateAdmin: (
    data?: unknown,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<unknown>;
  loading: boolean;
} = ({ redirectTo, redirectIfFound, redirectAs }) => {
  const { data: admin, error, mutate: mutateAdmin } = useSWR('/api/admin');

  const loading = !admin && !error;
  const loggedIn = !loading && !error;

  useEffect(() => {
    if (!redirectTo || loading) return;

    if (
      (redirectTo && !redirectIfFound && !loggedIn) ||
      (redirectIfFound && loggedIn)
    ) {
      if (redirectAs) {
        Router.replace(redirectTo, redirectAs);
      } else {
        Router.replace(redirectTo);
      }
    }
  }, [loading, loggedIn, redirectIfFound, redirectTo, redirectAs]);

  return {
    loading,
    username: loggedIn ? admin.username : undefined,
    mutateAdmin,
  };
};

export default useAdmin;
