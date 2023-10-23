import CssBaseline from "@mui/material/CssBaseline";
import { deepmerge } from "@mui/utils";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendMuiTheme,
} from "@mui/material/styles";
import { extendTheme as extendJoyTheme } from "@mui/joy/styles";
import { Routes, Route } from "react-router-dom";
import {
  AccesParent,
  AppViews,
  Cours,
  Dashboard,
  DashboardEtudiant,
  Depense,
  Emploidutemps,
  Etudiants,
  Scolarite,
  Gestionadministration,
  MainContent,
  NoteandEvaluation,
  Paiement,
  Personnel,
  ProfilEtudiant,
  Tarification,
  Users,
  PvForm,
  NoteEvalutionMain,
  EmploiDuTempsMain,
  ProfilParent,
  DocumentEtudiant,
  AttestationToPrint,
  CertificatToPrint,
  Certification,
  Attestation,
  CertificatMain,
  AttestationMain,
  DashboardProf,
  NoteandEvaluationFormMain,
  AddNotesForm,
  PaiementMain,
  PaiementFacture,
  NoteEvaluationProf,
  DashboardProfMain,
  NoteEvalutionProfAddNote,
  AttestationCertificatEtudiant,
  AttestationEtudiantMain,
  AttestationEtudiant,
  DocumentEtudiantMain,
  DocumentEtudiantFacture,
  AskAdmissionStudent,
  ClassStudents,
  Bibliotheque,
  BibliothequeEtudiant,
  Syllabus,
  SyllabusEtudiant,
  Assidute,
  AssiduteMain,
  AssiduteClasse,
  ProfClasseStudent,
  NotFound,
  ReleveNoteForm,
  PvMain,
} from "views";
import { Login, Register } from "views/auth";
import { AddEmploiDuTemps } from "views/emploiDuTemps/AddEmploiDuTemps";
import { DisplayEmploiDuTemps } from "views/emploiDuTemps/DisplayEmploiDuTemps";
import { DisplayNotesForm } from "views/noteEvaluationAdmin/DisplayNotesForm";
import { useState, createContext } from "react";
import PVglobal from "views/noteEvaluationAdmin/PVglobal";
// Note: you can't put `joyTheme` inside Material UI's `extendMuiTheme(joyTheme)`
// because some of the values in the Joy UI theme refers to CSS variables and
// not raw colors.
const muiTheme = extendMuiTheme();

const joyTheme = extendJoyTheme({
  // This is required to point to `var(--mui-*)` because we are using
  // `CssVarsProvider` from Material UI.
  cssVarPrefix: "mui",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidColor: "var(--mui-palette-primary-contrastText)",
          solidBg: "var(--mui-palette-primary-main)",
          solidHoverBg: "var(--mui-palette-primary-dark)",
          plainColor: "var(--mui-palette-primary-main)",
          plainHoverBg:
            "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
          plainActiveBg: "rgba(var(--mui-palette-primary-mainChannel) / 0.3)",
          outlinedBorder: "rgba(var(--mui-palette-primary-mainChannel) / 0.5)",
          outlinedColor: "var(--mui-palette-primary-main)",
          outlinedHoverBg:
            "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
          outlinedHoverBorder: "var(--mui-palette-primary-main)",
          outlinedActiveBg:
            "rgba(var(--mui-palette-primary-mainChannel) / 0.3)",
        },

        // Do the same for the `danger`, `info`, `success`, and `warning` palettes,
        divider: "var(--mui-palette-divider)",
        text: {
          tertiary: "rgba(0 0 0 / 0.56)",
        },
      },
    },
    // Do the same for dark mode
    // dark: { ... }
  },

  shadow: {
    xs: `var(--mui-shadowRing), ${muiTheme.shadows[1]}`,
    sm: `var(--mui-shadowRing), ${muiTheme.shadows[2]}`,
    md: `var(--mui-shadowRing), ${muiTheme.shadows[4]}`,
    lg: `var(--mui-shadowRing), ${muiTheme.shadows[8]}`,
    xl: `var(--mui-shadowRing), ${muiTheme.shadows[12]}`,
  },
});
// You can use your own `deepmerge` function.
// muiTheme will deeply merge to joyTheme.
const theme = deepmerge(joyTheme, muiTheme);

export const AppContext = createContext(null);

function App() {
  const [alignment, setAlignment] = useState("per");
  const [selected, setSelected] = useState("Tableau de bord");
  const [defaultPer, setDefaultPer] = useState(true);

  const values = {
    alignment,
    setAlignment,
    selected,
    setSelected,
    defaultPer,
    setDefaultPer,
  };

  return (
    <AppContext.Provider value={values}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            {/* Admin Routes */}
            <Route n path="/" element={<Login />} />
            <Route path="/creer-compte" element={<Register />} />
            <Route path="/app/administration" element={<AppViews />}>
              <Route index element={<MainContent />} />
              <Route path="tableau-de-bord" element={<Dashboard />} />
              <Route path="personnels" element={<Personnel />} />
              <Route path="etudiants" element={<Etudiants />} />
              <Route path="scolarite" element={<Scolarite />} />
              <Route path="emploi-du-temps" element={<EmploiDuTempsMain />}>
                <Route index element={<Emploidutemps />} />
                <Route
                  path="creer-emploi-du-temps/:id"
                  element={<AddEmploiDuTemps />}
                />
                <Route
                  path="afficher-emploi-du-temps/:id"
                  element={<DisplayEmploiDuTemps />}
                />
              </Route>
              <Route path="assidute" element={<AssiduteMain />}>
                <Route index element={<Assidute />} />
                <Route path="absence-retard/:id" element={<AssiduteClasse />} />
              </Route>
              <Route
                path="notes-et-evaluations"
                element={<NoteEvalutionMain />}
              >
                <Route index element={<NoteandEvaluation />} />
                <Route path="pv/:id" element={<PvMain />}>
                  <Route index element={<PvForm />} />
                  <Route path="pv-global" element={<PVglobal />} />
                </Route>
                <Route path="releve-note/:id" element={<ReleveNoteForm />} />
                <Route
                  path="etudiants/:id"
                  element={<NoteandEvaluationFormMain />}
                >
                  <Route index element={<ClassStudents />} />
                  <Route
                    path="generer-anonymat"
                    element={<DisplayNotesForm />}
                  />
                  <Route path="saisie-notes" element={<AddNotesForm />} />
                </Route>
              </Route>
              <Route path="acces-parent" element={<AccesParent />} />
              <Route
                path="gestion-administratifs-personnels"
                element={<Gestionadministration />}
              />
              <Route path="utilisateurs" element={<Users />} />
              <Route path="paiements" element={<PaiementMain />}>
                <Route index element={<Paiement />} />
                <Route path="facture/:id" element={<PaiementFacture />} />
              </Route>
              <Route path="depenses" element={<Depense />} />
              <Route path="acces-parents" element={<AccesParent />} />
              <Route path="attestations" element={<AttestationMain />}>
                <Route index element={<Attestation />} />
                <Route
                  path="attestation/:id"
                  element={<AttestationToPrint />}
                />
              </Route>
              <Route path="certificats" element={<CertificatMain />}>
                <Route index element={<Certification />} />
                <Route path="certificat/:id" element={<CertificatToPrint />} />
              </Route>
              <Route path="tarification" element={<Tarification />} />
              <Route path="bibliotheque" element={<Bibliotheque />} />
              <Route path="syllabus" element={<Syllabus />} />
            </Route>
            {/* Pats Routes */}
            <Route path="/app/pats" element={<AppViews />}>
              <Route index element={<MainContent />} />
              <Route path="tableau-de-bord" element={<Dashboard />} />
              <Route path="personnels" element={<Personnel />} />
              <Route path="etudiants" element={<Etudiants />} />
              <Route path="scolarite" element={<Scolarite />} />
              <Route path="emploi-du-temps" element={<EmploiDuTempsMain />}>
                <Route index element={<Emploidutemps />} />
                <Route
                  index
                  path="creer-emploi-du-temps/:id"
                  element={<AddEmploiDuTemps />}
                />
                <Route
                  index
                  path="afficher-emploi-du-temps/:id"
                  element={<DisplayEmploiDuTemps />}
                />
              </Route>
              <Route path="assidute" element={<AssiduteMain />}>
                <Route index element={<Assidute />} />
                <Route path="absence-retard/:id" element={<AssiduteClasse />} />
              </Route>
              <Route
                path="notes-et-evaluations"
                element={<NoteEvalutionMain />}
              >
                <Route index element={<NoteandEvaluation />} />
                <Route path="pv/:id" element={<PvMain />}>
                  <Route index element={<PvForm />} />
                  <Route path="pv-global" element={<PVglobal />} />
                </Route>
                <Route path="releve-note/:id" element={<ReleveNoteForm />} />
                <Route
                  path="etudiants/:id"
                  element={<NoteandEvaluationFormMain />}
                >
                  <Route index element={<ClassStudents />} />
                  <Route
                    path="generer-anonymat"
                    element={<DisplayNotesForm />}
                  />
                  <Route path="saisie-notes" element={<AddNotesForm />} />
                </Route>
              </Route>
              <Route path="acces-parent" element={<AccesParent />} />
              <Route
                path="gestion-administratifs-personnels"
                element={<Gestionadministration />}
              />
              <Route path="utilisateurs" element={<Users />} />
              <Route path="paiements" element={<PaiementMain />}>
                <Route index element={<Paiement />} />
                <Route path="facture/:id" element={<PaiementFacture />} />
              </Route>
              <Route path="depenses" element={<Depense />} />
              <Route path="acces-parents" element={<AccesParent />} />
              <Route path="attestations" element={<AttestationMain />}>
                <Route index element={<Attestation />} />
                <Route
                  path="attestation/:id"
                  element={<AttestationToPrint />}
                />
              </Route>
              <Route path="certificats" element={<CertificatMain />}>
                <Route index element={<Certification />} />
                <Route path="certificat/:id" element={<CertificatToPrint />} />
              </Route>
              <Route path="tarification" element={<Tarification />} />
              <Route path="bibliotheque" element={<Bibliotheque />} />
              <Route path="syllabus" element={<Syllabus />} />
            </Route>
            {/* Etudiant Routes */}
            <Route path="/app/etudiants" element={<AppViews />}>
              <Route index element={<MainContent />} />
              <Route path="tableau-de-bord" element={<DashboardEtudiant />} />
              <Route path="cours" element={<Cours />} />
              <Route path="profil" element={<ProfilEtudiant />} />
              <Route path="dossiers" element={<DocumentEtudiantMain />}>
                <Route index element={<DocumentEtudiant />} />
                <Route
                  path="paiement/:id"
                  element={<DocumentEtudiantFacture />}
                />
              </Route>
              <Route path="certificats" element={<AttestationEtudiantMain />}>
                <Route index element={<AttestationCertificatEtudiant />} />
                <Route
                  path="certificat-inscription/:id"
                  element={<AttestationEtudiant />}
                />
              </Route>
              <Route
                path="demande-admission"
                element={<AskAdmissionStudent />}
              />
              <Route path="bibliotheque" element={<BibliothequeEtudiant />} />
              <Route path="syllabus" element={<SyllabusEtudiant />} />
            </Route>
            {/* Prof Routes */}
            <Route path="/app/professeur" element={<AppViews />}>
              <Route index element={<MainContent />} />
              <Route path="tableau-de-bord" element={<DashboardProfMain />}>
                <Route index element={<DashboardProf />} />
              </Route>
              <Route path="profil" element={<ProfilEtudiant />} />
              <Route
                path="notes-et-evaluations"
                element={<NoteEvalutionMain />}
              >
                <Route index element={<NoteEvaluationProf />} />
                <Route path="classe/:id" element={<ProfClasseStudent />} />
                <Route
                  path="saisie-notes/:id"
                  element={<NoteEvalutionProfAddNote />}
                />
              </Route>
            </Route>
            {/*Parent Routes */}
            <Route path="/app/parent" element={<AppViews />}>
              <Route index element={<MainContent />} />
              <Route
                path="enfant/tableau-de-bord"
                element={<DashboardEtudiant />}
              />
              {/* <Route path="cours" element={<Cours />} /> */}
              <Route path="profil" element={<ProfilParent />} />

              <Route path="enfant/dossiers" element={<DocumentEtudiant />} />
              <Route
                path="enfant/dossiers/paiement/:id"
                element={<DocumentEtudiantFacture />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AppViews />
        </div>
      </CssVarsProvider>
    </AppContext.Provider>
  );
}

export default App;
