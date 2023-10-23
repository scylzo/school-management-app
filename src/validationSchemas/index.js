import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

//login schema
export const loginSchema = yup.object().shape({
  username: yup.string().required("Champ obligatoire"),
  password: yup.string().required("Champ obligatoire"),
});

//register schema
export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Le nom d'utilisateur doit comporter au moins 6 caractères")
    .required("Champ obligatoire"),
  password: yup
    .string()
    .min(5, "le mot de passe doit comporter au moins 5 caractères")
    .matches(passwordRules, {
      message:
        "Veuillez créer un mot de passe plus fort avec au moins (1 lettre majuscule, 1 lettre minuscule, 1 chiffre)",
    })
    .required("Champ obligatoire"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "les mots de passe doivent correspondre"
    )
    .required("Champ obligatoire"),
  nomPrenom: yup.string().required("Champ obligatoire"),
  cni: yup.number().positive().integer().required("Champ obligatoire"),
  dateDeNaissance: yup.string().required("Champ obligatoire"),
  nationalite: yup.string().required("Champ obligatoire"),
  adresseSenegal: yup.string().required("Champ obligatoire"),
  adressePaysOrigine: yup.string().required("Champ obligatoire"),
  tel: yup.number().positive().integer().required("Champ obligatoire"),
  email: yup
    .string()
    .email("Veuillez saisir un mail valide")
    .required("Champ obligatoire"),
  lieuDeNaissance: yup.string().required("Champ obligatoire"),
  sexe: yup.string().required("Champ obligatoire"),
  primo: yup
    .string()
    .required("Veuillez preciser si vous êtes un nouvel étudiant ou non"),
  nomPrenomPere: yup.string().required("Champ obligatoire"),
  adressePere: yup.string().required("Champ obligatoire"),
  telPere: yup.number().positive().integer().required("Champ obligatoire"),
  professionPere: yup.string().required("Champ obligatoire"),
  nomPrenomMere: yup.string().required("Champ obligatoire"),
  adresseMere: yup.string().required("Champ obligatoire"),
  telMere: yup.number().positive().integer().required("Champ obligatoire"),
  professionMere: yup.string().required("Champ obligatoire"),
  nomPrenomTuteur: yup.string().required("Champ obligatoire"),
  telTuteur: yup.number().positive().integer().required("Champ obligatoire"),
});

//admission schema
export const admissionSchema = yup.object().shape({
  serie: yup.string().required("Champ obligatoire"),
  mention: yup.string().required("Champ obligatoire"),
  anneeObtention: yup.string().required("Champ obligatoire"),
  lycee: yup.string().required("Champ obligatoire"),
  facultyOurInstitute: yup.string().required("Champ obligatoire"),
  periode: yup.string().required("Champ obligatoire"),
  raison: yup.string().required("Champ obligatoire"),
  niveauEtude: yup.string().required("Champ obligatoire"),
  filiere: yup.string().required("Champ obligatoire"),
  niveauEtudeDemande: yup.string().required("Champ obligatoire"),
  filiereDemande: yup.string().required("Champ obligatoire"),
  medicalCheck: yup.string().required("Champ obligatoire"),
  acceptedTos: yup
    .boolean()
    .oneOf([true], "Veuillez  accepter les conditions d'admission")
    .required("Champ obligatoire"),
});
// student admission schema
export const studentAdmissionSchema = yup.object().shape({
  serie: yup.string().required("Champ obligatoire"),
  mention: yup.string().required("Champ obligatoire"),
  anneeObtention: yup.string().required("Champ obligatoire"),
  lycee: yup.string().required("Champ obligatoire"),
  facultyOurInstitute: yup.string().required("Champ obligatoire"),
  periode: yup.string().required("Champ obligatoire"),
  raison: yup.string().required("Champ obligatoire"),
  niveauEtudeDemande: yup.string().required("Champ obligatoire"),
  filiereDemande: yup.string().required("Champ obligatoire"),
  acceptedTos: yup
    .boolean()
    .oneOf([true], "Veuillez  accepter les conditions d'admission")
    .required("Champ obligatoire"),
});

// administrateur schema
export const administrationSchema = yup.object().shape({
  nomPrenom: yup.string().required("Champ obligatoire"),
  cni: yup.number().positive().integer().required("Champ obligatoire"),
  nationalite: yup.string().required("Champ obligatoire"),
  tel: yup.number().positive().integer().required("Champ obligatoire"),
  email: yup
    .string()
    .email("Veuillez saisir un mail valide")
    .required("Champ obligatoire"),
  adresseSenegal: yup.string().required("Champ obligatoire"),
});

//Pats schema
export const patsSchema = yup.object().shape({
  nomPrenom: yup.string().required("Champ obligatoire"),
  cni: yup.number().positive().integer().required("Champ obligatoire"),
  dateDeNaissance: yup.string().required("Champ obligatoire"),
  nationalite: yup.string().required("Champ obligatoire"),
  adresseSenegal: yup.string().required("Champ obligatoire"),
  tel: yup.number().positive().integer().required("Champ obligatoire"),
  email: yup
    .string()
    .email("Veuillez saisir un mail valide")
    .required("Champ obligatoire"),
  sexe: yup.string().required("Champ obligatoire"),
  fonction: yup.string().required("Champ obligatoire"),
  typeContrat: yup.string().required("Champ obligatoire"),
  grade: yup.string().required("Champ obligatoire"),
  categorie: yup.string().required("Champ obligatoire"),
  diplome: yup.string().required("Champ obligatoire"),
  dateRecrutement: yup.string().required("Champ obligatoire"),
  specialite: yup.string().required("Champ obligatoire"),
});
//Per schema
export const perSchema = yup.object().shape({
  nomPrenom: yup.string().required("Champ obligatoire"),
  cni: yup.number().positive().integer().required("Champ obligatoire"),
  dateDeNaissance: yup.string().required("Champ obligatoire"),
  nationalite: yup.string().required("Champ obligatoire"),
  adresseSenegal: yup.string().required("Champ obligatoire"),
  tel: yup.number().positive().integer().required("Champ obligatoire"),
  email: yup
    .string()
    .email("Veuillez saisir un mail valide")
    .required("Champ obligatoire"),
  sexe: yup.string().required("Champ obligatoire"),
  etablissementOrigine: yup.string().required("Champ obligatoire"),
  typeContrat: yup.string().required("Champ obligatoire"),
  grade: yup.string().required("Champ obligatoire"),
  volumeHoraire: yup
    .number()
    .positive()
    .integer()
    .required("Champ obligatoire"),
  dateRecrutement: yup.string().required("Champ obligatoire"),
  specialite: yup.string().required("Champ obligatoire"),
});

export const parentSchema = yup.object().shape({
  nom: yup.string().required("Champ obligatoire"),
  prenom: yup.string().required("Champ obligatoire"),
  telMobile: yup.number().positive().integer().required("Champ obligatoire"),
  lienDeParente: yup.string().required("Champ obligatoire"),
  email: yup
    .string()
    .email("Veuillez saisir un mail valide")
    .required("Champ obligatoire"),
});

export const ueSchema = yup.object().shape({
  nomUe: yup.string().required("Champ obligatoire"),
  reference: yup.string().required("Champ obligatoire"),
  credit: yup.number().positive().integer().required("Champ obligatoire"),
  semestre: yup.string().required("Champ obligatoire"),
  typeUe: yup.string().required("Champ obligatoire"),
});

export const ecSchema = yup.object().shape({
  nomEc: yup.string().required("Champ obligatoire"),
  cm: yup
    .number()
    .positive()
    .integer()
    .max(20, "note maximum 20")
    .required("Champ obligatoire"),
  reference: yup.string().required("Champ obligatoire"),
  stage: yup
    .number()
    .positive()
    .integer()
    .max(20, "note maximum 20")
    .required("Champ obligatoire"),
  tpTd: yup
    .number()
    .positive()
    .integer()
    .max(20, "note maximum 20")
    .required("Champ obligatoire"),
  tpe: yup
    .number()
    .positive()
    .integer()
    .max(20, "note maximum 20")
    .required("Champ obligatoire"),
  ue: yup.string().required("Champ obligatoire"),
});
