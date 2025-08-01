import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';
import { getToken } from '@/lib/authenticate';
import { get } from 'react-hook-form';

const PUBLIC_PATHS = ['/login', '/register'];

export default function RouteGuard({ children }) {
    const router = useRouter();
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    async function updateAtoms() {
        const token = getToken();
        if (token) {
            setFavouritesList(await getFavourites());
            setSearchHistory(await getHistory());
        } else {
            setFavouritesList([]);
            setSearchHistory([]);
        }
    }

    useEffect(() => {
        const path = router.pathname;
        if (PUBLIC_PATHS.includes(path)) {
            updateAtoms();
        }
    }, [router.pathname]);


    return <>{children}</>;
}

