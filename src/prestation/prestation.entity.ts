export class Prestation {
  id_prestation: number;
  userId: number;
  categorieId: number;
  prestation_image: string;
  nom_prestation: string;
  description: string;
  note_moyenne: number;
  nombre_avis: number;
  delai_livraison_prestation_heures: number;
  paiement_securise: boolean;
  express: boolean;
}