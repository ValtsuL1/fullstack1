import useSWR from 'swr';
import GetFetcher from './fetcherProvider';

function useProfilePosts(id: number) {
    const { fetcher, url } = GetFetcher()

    const { data, error, isLoading } = useSWR(url + `user-post/profile/${id}`, fetcher)

    return {
        userposts: data,
        isLoading,
        isError: error
    }
}

export default useProfilePosts