import { defineStore } from "pinia";
import { knotsInterface } from "../types/knotsInterface";

export const useKnotsStore = defineStore("knots", {
  state: () => ({
    knots: [
      {
        name: "Ach­ter­kno­ten",
        text: "Wird am Sei­len­de ge­knüpft und dient dazu, dass ein Seil nicht aus ei­ner Öse aus­rau­schen kann. Auch das Aus­fran­sen am Scho­ten­de wird ver­hin­dert.",
        imageUrl: "/knots/Achterknoten.png",
        link: "https://www.youtube.com/watch?v=z39z814n62M",
      },
      {
        name: "Kreuz­kno­ten",
        text: "Wird ver­wen­det zur Ver­bin­dung zwei­er gleich di­cker En­den.",
        imageUrl: "/knots/Kreuzschlaege.png",
        link: "https://www.youtube.com/watch?v=H4a1c-eMROc",
      },
      {
        name: "Zwei hal­be Schlä­ge",
        text: "Dient dazu, ein Tau an ei­nem Ge­gen­stand (z. B. ei­nem Ring) zu be­fes­ti­gen.",
        imageUrl: "/knots/ZweiHalbeSchlaege.png",
        link: "https://www.youtube.com/watch?v=XDFg5pKcwoQ",
      },
      {
        name: "Schot­stek",
        text: "Der Schot­stek eig­net sich zum Ver­bin­den von zwei gleich di­cken oder ver­schie­den di­cken En­den.",
        imageUrl: "/knots/Schotstek.png",
        link: "https://www.youtube.com/watch?v=qkfoBxFMaTI",
      },
      {
        name: "Schot­stek dop­pelt",
        text: "Der dop­pel­te Schot­stek eig­net sich zum Ver­bin­den zwei­er ver­schie­den di­cker En­den und löst sich un­ter we­nig Zug nicht so leicht wie der ein­fa­che Schot­stek.",
        imageUrl: "/knots/SchotstekDoppelt.png",
        link: "https://www.youtube.com/watch?v=qkfoBxFMaTI",
      },
      {
        name: "Mast­wurf",
        text: "Wird ver­wen­det zum Be­fes­ti­gen ei­ner Lei­ne.",
        imageUrl: "/knots/Mastwurf.png",
        link: "https://www.youtube.com/watch?v=Kcfhei06oQQ",
      },
      {
        name: "Pal­s­tek",
        text: "Für den Pal­s­tek gibt es die ver­schie­dens­ten Ver­wen­dungs­mög­lich­kei­ten. Oft wird er zum Fest­ma­chen des Boo­tes an ei­nem Pol­ler ver­wen­det.",
        imageUrl: "/knots/Palstek.png",
        link: "https://www.youtube.com/watch?v=DZqz_TMclVk",
      },
      {
        name: "Ro­rings­tek",
        text: "Wird zum Ver­bin­den ei­ner Lei­ne mit ei­nem Ring ver­wen­det.",
        imageUrl: "/knots/Roringstek.png",
        link: "https://www.youtube.com/watch?v=LuR6LECVXBc",
      },
      {
        name: "Kreuz­schlä­ge",
        text: "Mit Kreuz­schlä­gen über die Klam­pe wird das Schiff an der Klam­pe be­fes­tigt. Der ab­schlies­sen­de Kopf­schlag ver­hin­dert, dass sich eine Lei­ne von selbst von ei­ner Klam­pe lö­sen kann.",
        imageUrl: "/knots/Kreuzschlaege.png",
        link: "https://www.youtube.com/watch?v=PVjMHc_PwQM",
      },
    ] as knotsInterface[],
  }),

  getters: {},

  actions: {
    reset() {},
  },
});
