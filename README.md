# Révisions BD70

Application web de révision pour l'examen final de BD70 (bases de données) : parcours SQL progressif auto-corrigé, conception entité-association, théorie (normalisation, optimisation, automatisation), sujets blancs au format de l'annale A23.


- Le SQL s'exécute dans le navigateur (SQLite via [sql.js](https://github.com/sql-js/sql.js), avec une petite couche de compatibilité MySQL).
- Aucune donnée n'est envoyée : la progression est enregistrée dans le navigateur (localStorage).
- Fonctionne hors-ligne : `vendor/` contient sql.js 1.10.3 (licence MIT).

## Lancer en local

Ouvrir `index.html`, ou :

```bash
python -m http.server 8770
```

puis http://localhost:8770
