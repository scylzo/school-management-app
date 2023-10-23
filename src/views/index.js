/*REPEATED CSS IMPORTS*/
import { tabClasses } from "@mui/joy";

/*COMPONENTS*/
import { Dashboard } from "./dashboard/Dashboard";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Personnel } from "./personnel/Personnel";
import { Etudiants } from "./etudiant/Etudiant";
import { Scolarite } from "./scolarite/Scolarite";
import { Emploidutemps } from "./emploiDuTemps/Emploidutemps";
import { NoteandEvaluation } from "./noteEvaluationAdmin/NoteandEvaluation";
import { NoteandEvaluationFormMain } from "./noteEvaluationAdmin/NoteandEvaluationFormMain";
import { AccesParent } from "./parentacces/AccesParent";
import { Gestionadministration } from "./gestionadministration/Gestionadministration";
import { Users } from "./users/Users";
import { Paiement } from "./paiement/Paiement";
import { Depense } from "./depense/Depense";
import { AppViews } from "./app/App";
import { DashboardEtudiant } from "./dashboardetudiant/DashboardEtudiant";
import { Cours } from "./cours/Cours";
import { NoteEtEvaluationEtudiant } from "./noteetudiant/NoteEtEvaluationEtudiant";
import { AttestationCertificatEtudiant } from "./attestationetudiants/AttestationCertificatEtudiant";
import { Tarification } from "./tarification/Tarification";
import { ProfilEtudiant } from "./profilEtudiant/ProfilEtudiant";
import { MainContent } from "./maincontent/MainContent";
import { PvForm } from "./noteEvaluationAdmin/PvForm";
import { ReleveNoteForm } from "./noteEvaluationAdmin/ReleveNoteForm";
import { NoteEvalutionMain } from "./noteEvaluationAdmin/NoteEvalutionMain";
import { EmploiDuTempsMain } from "./emploiDuTemps/EmploiDuTempsMain";
import { ProfilParent } from "./profilParent/ProfilParent";
import { DashboardParent } from "./dashboardParent/DashboardParent";
import { DocumentEtudiant } from "./documentEtudiant/DocumentEtudiant";
import { AttestationToPrint } from "./certificationattestation/AttestationToPrint";
import { CertificatToPrint } from "./certificationattestation/CertificatToPrint";
import { Attestation } from "./certificationattestation/Attestation";
import { Certification } from "./certificationattestation/Certification";
import { CertificatMain } from "./certificationattestation/CertificatMain";
import { AttestationMain } from "./certificationattestation/AttestationMain";
import { DashboardProf } from "./dashboardProf/DashboardProf";
import { AddNotesForm } from "./noteEvaluationAdmin/AddNotesForm";
import { SaisiNoteMain } from "./noteEvaluationAdmin/SaisiNoteMain";
import { PaiementFacture } from "./paiement/PaiementFacture";
import { PaiementMain } from "./paiement/PaiementMain";
import { NoteEvaluationProf } from "./noteEvaluationProf/NoteEvaluationProf";
import { DashboardProfMain } from "./dashboardProf/DashboardProfMain";
import { NoteEvalutionProfAddNote } from "./noteEvaluationProf/NoteEvalutionProfAddNote";
import { NoteEvaluationProfMain } from "./noteEvaluationProf/NoteEvaluationProfMain";
import { AttestationEtudiantMain } from "./attestationetudiants/AttestationEtudiantMain";
import { AttestationEtudiant } from "./attestationetudiants/AttestationEtudiant";
import { DocumentEtudiantFacture } from "./documentEtudiant/DocumentEtudiantFacture";
import { DocumentEtudiantMain } from "./documentEtudiant/DocumentEtudiantMain";
import { AskAdmissionStudent } from "./askAdmissionStudent/AskAdmissionStudent";
import { ClassStudents } from "./noteEvaluationAdmin/ClassStudents";
import { Bibliotheque } from "./bibliotheque/Bibliotheque";
import { BibliothequeEtudiant } from "./bibliotheque/BibliothequeEtudiant";
import { Syllabus } from "./syllabus/Syllabus";
import { SyllabusEtudiant } from "./syllabusEtudiant/SyllabusEtudiant";
import { Assidute } from "./assidute/Assidute";
import { AssiduteClasse } from "./assidute/AssiduteClasse";
import { AssiduteMain } from "./assidute/AssiduteMain";
import { PvMain } from "./noteEvaluationAdmin/PVMain";
import { ProfClasseStudent } from "./noteEvaluationProf/ProfClasseStudent";
import { NotFound } from "./404/NotFound";
export {
  AppViews,
  Dashboard,
  Sidebar,
  Personnel,
  Etudiants,
  Scolarite,
  Emploidutemps,
  NoteandEvaluation,
  AccesParent,
  Gestionadministration,
  Users,
  Paiement,
  Depense,
  DashboardEtudiant,
  Cours,
  NoteEtEvaluationEtudiant,
  AttestationCertificatEtudiant,
  Tarification,
  ProfilEtudiant,
  MainContent,
  NoteandEvaluationFormMain,
  PvForm,
  ReleveNoteForm,
  NoteEvalutionMain,
  EmploiDuTempsMain,
  ProfilParent,
  DashboardParent,
  DocumentEtudiant,
  AttestationToPrint,
  CertificatToPrint,
  CertificatMain,
  Attestation,
  Certification,
  AttestationMain,
  DashboardProf,
  AddNotesForm,
  SaisiNoteMain,
  PaiementMain,
  PaiementFacture,
  NoteEvaluationProf,
  DashboardProfMain,
  NoteEvalutionProfAddNote,
  NoteEvaluationProfMain,
  AttestationEtudiantMain,
  AttestationEtudiant,
  DocumentEtudiantFacture,
  DocumentEtudiantMain,
  AskAdmissionStudent,
  ClassStudents,
  Bibliotheque,
  BibliothequeEtudiant,
  Syllabus,
  SyllabusEtudiant,
  Assidute,
  AssiduteClasse,
  AssiduteMain,
  PvMain,
  NotFound,
  ProfClasseStudent,
};

// REPEATED CSS EXPORTS
export const tabStyle = {
  fontFamily: ["Poppins", "sans-serif"].join(","),
  fontSize: "13px",
  [`&.${tabClasses.selected}`]: {
    background: "rgb(243,249,242,100)",
  },
};
