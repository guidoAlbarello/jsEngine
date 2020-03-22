const EnemyType = {
    ZOMBIE: 1,
    WOLF: 2,
    DRAGON: 3,
    GUARD : 4
}

class EnemyFactory {
    create(enemyType) {
        switch (enemyType) {
            case EnemyType.ZOMBIE:
                return gEntityManager.instantiateObjectWithTag("zombie", Zombie);
            case EnemyType.WOLF:
                return gEntityManager.instantiateObjectWithTag("wolf", Wolf);
            case EnemyType.DRAGON:
                return gEntityManager.instantiateObjectWithTag("dragon", Dragon);
            case EnemyType.GUARD:
                return gEntityManager.instantiateObjectWithTag("guard", Guard);
        }
    }

}
