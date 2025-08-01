import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';
import { getToken } from '@/lib/authenticate';

const PUBLIC_PATHS = ['/login', '/register'];

export default function RouteGuard({ children }) {
    const router = useRouter();
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const updateAtoms = useCallback(async () => {
        const token = getToken();
        if (token) {
            setFavouritesList(await getFavourites());
            setSearchHistory(await getHistory());
        } else {
            setFavouritesList([]);
            setSearchHistory([]);
        }
    }, [setFavouritesList, setSearchHistory]);

    useEffect(() => {
        const path = router.pathname;
        if (PUBLIC_PATHS.includes(path)) {
            updateAtoms();
        }
    }, [router.pathname, updateAtoms]); 

    return <>{children}</>;
}
