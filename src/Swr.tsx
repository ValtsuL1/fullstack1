import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json())

const url: string = 'https://localhost:3000/'

function UserById(id: number) {
    const { data, error, isLoading } = useSWR(url + `user/${id}`, fetcher)

    return {
        user: data,
        isLoading,
        isError: error
    }
}

export default UserById