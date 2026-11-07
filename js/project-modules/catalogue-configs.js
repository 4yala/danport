import {CatalogueType} from "./project-definitions.js";
import {CatalogueScaleConfig} from "../general-definitions/scale-definitions.js";

export const CatalogueConfigs = Object.freeze({
    [CatalogueType.FEATURED]: new CatalogueScaleConfig({
        maxCardsPerRow: 4,
        cardWidth: 300,
        cardHeight: 350,
        cardSeparation: 20,
        cardBorderSize: 1
    }),
    [CatalogueType.ALL]: new CatalogueScaleConfig({
        maxCardsPerRow: 5,
        cardWidth: 300,
        cardHeight: 350,
        cardSeparation: 20,
        cardBorderSize: 0
    })
})