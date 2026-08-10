import redis from "../config/redis";

const getDashboardCacheKey = (userId: string) => {
    return `dashboard:stats:${userId}`;
};

export const invalidateDashboardCache = async (
    userId: string
) => {
    await redis.del(
    getDashboardCacheKey(userId)
    );
    };
    
    export const invalidateDashboardCacheForUsers = async (
    userIds: Array<string | null | undefined>
    ) => {
        const uniqueUserIds = [
            ...new Set(
            userIds.filter(
            (userId): userId is string => Boolean(userId)
            )
        ),
    ];

    if (uniqueUserIds.length === 0) {
        return;
    }

    await Promise.all(
        uniqueUserIds.map((userId) =>
        invalidateDashboardCache(userId)
        )
    );
};
