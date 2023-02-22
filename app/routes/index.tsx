/*
 * TODO :
 *  [ x ] Refactorer le code pour bien séparer (delete, ajout...)
 *  [ X ] Ajouter les invariant lors des actions
 *  [ X ] Revoir le visuel pour que ça soit plus beau
 *  [] Trier les item ordre alphabétique
 *  [] Générer des icones automatiquement (via api)
 *  [] Envoit de la liste par sms ( via le share du téléphone)
 *  [] Faire des tests Unitaires
 *  [] Faire des tests E2E
 *  [] Faire une clean architecture
 *  [] Supprimer tout
 *  [] Autocomplete qui s'alimente avec les items ajoutés
 *  [] Mécanisme pour ajouter des achats récurents ( genre "est ce que t'es sur que t'as encore des pastilles lave vaisselle)
 *  [] Rendre dispo sur internet en bloqué
 *  [] Installable sur téléphone (PWA)
 *  [] Swipe pour supprimer
 *  [] Différencier quantité de l'item
 *  [] Validation de formulaire ( useField, Zod)
 *  [] Animation d'affichage
 *  [] Catégoriser les produits
 *
 * */

import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="relative min-h-screen">
      <h1>Dashboard famille Dubois</h1>
      <Link to="errands">Gestion course</Link>
    </main>
  );
}
