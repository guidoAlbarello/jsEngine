const PlatformType = {
    BOUNCY: 1,
    NORMAL: 2,
    DESTROYABLE: 3,
    TOMB: 4
}

class PlatformFactory {
    create(platformType) {
        switch (platformType) {
            case PlatformType.BOUNCY:
                return gEntityManager.instantiateObjectWithTag("BouncyPlatform", BouncyPlatform);
            case PlatformType.NORMAL:
                return gEntityManager.instantiateObjectWithTag("Platform", Platform);
            case PlatformType.DESTROYABLE:
                return gEntityManager.instantiateObjectWithTag("DestroyablePlatform", DestroyablePlatform);
            case PlatformType.TOMB:
                return gEntityManager.instantiateObjectWithTag("Tomb", Tomb);
        }
    }

}
