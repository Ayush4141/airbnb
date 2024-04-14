import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'
import { error } from 'console';

export default async function getFavoritesListings() {
    try{
        const currrentUser = await getCurrentUser();

        if(!currrentUser){
            return []
        }

        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currrentUser.favoriteIds) || []]
                }
            }
        })

        const SafeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString()
        }))

        return SafeFavorites
    }catch(error: any)  {
        throw new Error(error)
    }
}