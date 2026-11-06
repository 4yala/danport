import {CatalogueConfig, CatalogueType} from "./project-definitions.js";

export const CatalogueConfigs = Object.freeze({
    [CatalogueType.FEATURED]: new CatalogueConfig({
        maxCardsPerRow: 4,
        cardWidth: 300,
        cardHeight: 350,
        cardSeparation: 20,
        cardBorderSize: 1
    }),
    [CatalogueType.ALL]: new CatalogueConfig({
        maxCardsPerRow: 5,
        cardWidth: 300,
        cardHeight: 350,
        cardSeparation: 20,
        cardBorderSize: 0
    })
})