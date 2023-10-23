//filiere
import { filiereSlice } from "./filiereFeatures/filiereSlice";
import { fetchFiliere } from "./filiereFeatures/filiereSlice";
import { addFiliereSlice } from "./filiereFeatures/addFiliereSlice";
import { addFiliere } from "./filiereFeatures/addFiliereSlice";
import { deleteFiliereSlice } from "./filiereFeatures/deleteFiliereSlice";
import { deleteFiliere } from "./filiereFeatures/deleteFiliereSlice";

//annee academique
import { anneeAcadSlice } from "./anneeAcadFeature/anneeAcadSlice";
import { fetchAnneeAcad } from "./anneeAcadFeature/anneeAcadSlice";
import { createAnneeAcadSlice } from "./anneeAcadFeature/addAnneeAcadSlice";
import { createAnneeAcad } from "./anneeAcadFeature/addAnneeAcadSlice";
import { editAnneeAcad } from "./anneeAcadFeature/EditAnneeAcadSlice";
import { deleteAnneeAcadSlice } from "./anneeAcadFeature/deleteAnneeAcadSlice";
import { deleteAnneeAcad } from "./anneeAcadFeature/deleteAnneeAcadSlice";

//semestre
import { semestreSlice } from "./semestreFeatures/semestreSlice";
import { fetchSemestre } from "./semestreFeatures/semestreSlice";
import { addSemestreSlice } from "./semestreFeatures/addSemestreSlice";
import { addSemestre } from "./semestreFeatures/addSemestreSlice";
import { deleteSemestreSlice } from "./semestreFeatures/deleteSemestreSlice";
import { deleteSemestre } from "./semestreFeatures/deleteSemestreSlice";
//niveau
import { niveauSlice } from "./niveauFeatures/niveauSlice";
import { fetchNiveau } from "./niveauFeatures/niveauSlice";
import { addNiveauSlice } from "./niveauFeatures/addNiveauSlice";
import { addNiveau } from "./niveauFeatures/addNiveauSlice";
import { deleteNiveauSlice } from "./niveauFeatures/deleteNiveauSlice";
import { deleteNiveau } from "./niveauFeatures/deleteNiveauSlice";

//ue
import { ueSlice } from "./ueFeatures/ueSlice";
import { fetchUE } from "./ueFeatures/ueSlice";
import { addUeSlice } from "./ueFeatures/addUeSlice";
import { addUe } from "./ueFeatures/addUeSlice";
import { deleteUeSlice } from "./ueFeatures/deleteUeSlice";
import { deleteUe } from "./ueFeatures/deleteUeSlice";
import { editUeSlice } from "./ueFeatures/editUeSlice";
import { editUe } from "./ueFeatures/editUeSlice";

//ec
import { ecSlice } from "./ecFeatures/ecSlice";
import { fetchEC } from "./ecFeatures/ecSlice";
import { addEcSlice } from "./ecFeatures/addEcSlice";
import { addEc } from "./ecFeatures/addEcSlice";
import { deleteEcSlice } from "./ecFeatures/deleteEcSlice";
import { deleteEc } from "./ecFeatures/deleteEcSlice";
import { editEcSlice } from "./ecFeatures/editEcSlice";
import { editEc } from "./ecFeatures/editEcSlice";

//classe
import { classeSlice } from "./classeFeatures/classeSlice";
import { fetchClasse } from "./classeFeatures/classeSlice";
import { addClasseSlice } from "./classeFeatures/addClasseSlice";
import { addClasse } from "./classeFeatures/addClasseSlice";
import { deleteClasseSlice } from "./classeFeatures/deleteClasseSlice";
import { deleteClasse } from "./classeFeatures/deleteClasseSlice";
import { editClasseSlice } from "./classeFeatures/editClasseSlice";
import { editClasse } from "./classeFeatures/editClasseSlice";

export {
  filiereSlice,
  fetchFiliere,
  addFiliereSlice,
  addFiliere,
  deleteFiliereSlice,
  deleteFiliere,
  anneeAcadSlice,
  fetchAnneeAcad,
  createAnneeAcadSlice,
  createAnneeAcad,
  editAnneeAcad,
  deleteAnneeAcadSlice,
  deleteAnneeAcad,
  semestreSlice,
  fetchSemestre,
  addSemestreSlice,
  addSemestre,
  deleteSemestreSlice,
  deleteSemestre,
  niveauSlice,
  fetchNiveau,
  addNiveauSlice,
  addNiveau,
  deleteNiveauSlice,
  deleteNiveau,
  ueSlice,
  fetchUE,
  addUeSlice,
  addUe,
  deleteUeSlice,
  deleteUe,
  editUeSlice,
  editUe,
  ecSlice,
  fetchEC,
  addEcSlice,
  addEc,
  deleteEcSlice,
  deleteEc,
  editEcSlice,
  editEc,
  classeSlice,
  fetchClasse,
  addClasseSlice,
  addClasse,
  deleteClasseSlice,
  deleteClasse,
  editClasseSlice,
  editClasse,
};
