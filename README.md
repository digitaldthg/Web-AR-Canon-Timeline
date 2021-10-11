# canon_timeline

Ziel des Verbundprojektes ["CANON Theater Technik Geschichte"](https://www.canon-timeline.eu) mit neun europäischen Hochschulpartnern ist es, ein Bewusstsein und Verständnis für eine europäische Geschichte der Theatertechnik  zu fördern. Das Projekt leistet einen Beitrag zum aktuellen Diskurs über die Bewahrung des kulturellen Erbes transnationaler und internationaler Theatertechnologie und -technik.

Im Rahmen der Kooperation mit digital.DTHG entstand der Prototyp einer augmentiert Zeitleise, die es den Benutzern ermöglicht, Meilensteine und Schlüsselbeispiele für historische Praktiken, Artefakte, Technologien und Gebäude zu visualisieren. Auf ausgedruckten Markern, die auf einer Papierzeitleiste platziert werden können, werden hinterlegte digitalisierte historische Objekte angezeigt und dazugehörige Audioaufnahmen, Bilder, Text und/oder Videos gezeigt.

![CanonImage](https://github.com/digitaldthg/canon_timeline/blob/main/IMG_20201013_140132-Gross.jpeg)

Mehr Informationen gibt es auf der Seite der [digital.DTHG](https://digital.dthg.de/projekte/canon-theater-technik-geschichte/)

## Projektaufbau
Jeder Marker ist der Link zu einem historischen Objekt. In der CanonData.json sind diese Objekte und die dazugehörigen weiteren Daten definiert, welche unter den entsprechenden Pfaden abgelegt werden müssen. Im Moment werden YouTube Videos, Bilder, Text, GLTF Modelle und MP3's unterstützt. 

Das Frontend ist mit Vue2 entwickelt, für das Marker Tracking wird a-frame verwendet.

## NPM commands
### Installs packages
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
