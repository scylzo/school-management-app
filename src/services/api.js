import axios from "axios";
import { url } from "config/config";

const baseUrl = url;
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-access-token"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//formData options
const options = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const api = {
  signin: (body) => {
    return axios.post(`${baseUrl}/api/auth/signin`, body);
  },
  signup: (body) => {
    const { values, roles, theAge, filiere, level, niveau_etude, ec, ue } =
      body;
    return axios.post(`${baseUrl}/api/auth/signup`, {
      primo: values.primo === "nouveau" ? "primo" : "no-primo",
      nom: values?.nomPrenom,
      date_naissance: values?.dateDeNaissance,
      Cin: values?.cin,
      sexe: values?.sexe,
      age: theAge,
      email: values?.email,
      tel_mobile: values?.tel,
      adresse_senegal: values?.adresseSenegal,
      adresse_pays_origine: values?.adressePaysOrigine,
      nationalite: values?.nationalite,
      lieu_naissance: values?.lieuNaissance,
      Nom_pere: values?.nomPrenomPere,
      Adresse_pere: values?.adressePere,
      Telephone_pere: values?.telPere,
      Profession_pere: values?.professionPere,
      Nom_mere: values?.nomPrenomMere,
      Adresse_mere: values?.Adresse_mere,
      Telephone_mere: values?.Telephone_mere,
      Profession_mere: values?.professionMere,
      Personne_contact: values?.nomPrenomTuteur,
      username: values.username,
      password: values?.password,
      confirm_password: values?.confirmPassword,
      roles: roles,
      //PATS
      fonction: values?.fonction,
      categorie: values?.categorie,
      diplome: values?.diplome,
      //PER
      Etablissement_origine: values?.Etablissement_origine,
      grade: values?.grade,
      volume_horaire: values?.volume_horaire,
      unite_enseignement: ue,
      filiere,
      niveau_etude,
      ec,
      level,
      //PER/PAT
      Type_contrat: values?.Type_contrat,
      Date_recrutement: values?.Date_recrutement,
      Specialite: values?.Specialite,
    });
  },
  signupParent: ({ values }) => {
    return axios.post(`${baseUrl}/parent/api/auth/signup`, {
      etat: "activated",
      prenom: values.prenom,
      nom: values.nom,
      email: values.email,
      lien_de_parente: values.lienDeParente,
      tel: values.telMobile,
      username: values.username,
      password: values.password,
      confirm_password: values.confirmPassword,
    });
  },

  signinParent: (body) => {
    const { values } = body;
    return axios.post(`${baseUrl}/parent/api/auth/signin`, {
      username: values.username,
      password: values.password,
    });
  },

  getAllParent: () => {
    return axios.get(`${baseUrl}/parent/api/users`);
  },

  getParentById: (parentId) => {
    return axios.get(`${baseUrl}/api/parent/user/${parentId}`);
  },

  affectParentToChild: (body) => {
    const { parentId, childId } = body;
    return axios.put(`${baseUrl}/api/etats/${childId}`, {
      id: childId,
      parentId,
    });
  },

  updateParent: (body) => {
    const { id, values } = body;
    return axios.put(`${baseUrl}/parent/api/etats/${id}`, {
      id,
      prenom: values.prenom,
      nom: values.nom,
      email: values.email,
      lien_de_parente: values.lienDeParente,
      tel: values.telMobile,
      username: values.username,
      password: values.password,
      confirm_password: values.confirmPassword,
    });
  },

  updateParentStatus: (body) => {
    const { id, etat } = body;
    return axios.put(`${baseUrl}/parent/api/etats/${id}`, {
      id,
      etat:
        etat === "activated"
          ? "deactivated"
          : etat === "deactivated"
          ? "activated"
          : null,
    });
  },

  getAllUser: () => {
    return axios.get(`${baseUrl}/api/users`);
  },

  getAllAdministrateurs: () => {
    return axios.get(`${baseUrl}/api/administrateurs`);
  },

  getUserById: (userId) => {
    return axios.get(`${baseUrl}/api/user/${userId}`);
  },

  createUser: (body) => {
    const { values, roles } = body;
    return axios.post(`${baseUrl}/api/auth/signup`, {
      nom: values?.nom,
      username: values?.username,
      nationalite: values?.nationalite,
      adresse_senegal: values?.adresse_senegal,
      email: values?.email,
      password: values?.password,
      Cin: values?.Cin,
      confirm_password: values?.confirm_password,
      tel_mobile: values?.tel_mobile,
      roles: roles,
    });
  },

  editUser: (body) => {
    const {
      id,
      values,
      filiere,
      level,
      roles,
      niveau_etude,
      ec,
      theAge,
      nationalite,
      sexe,
      unite_enseignement,
    } = body;
    return axios.put(`${baseUrl}/api/etats/${id}`, {
      id: id,
      primo: values.primo === "nouveau" ? "primo" : "no-primo",
      nom: values?.nomPrenom,
      date_naissance: values?.dateDeNaissance,
      Cin: values?.cni,
      sexe: values?.sexe || sexe,
      age: theAge,
      email: values?.email,
      tel_mobile: values?.tel,
      adresse_senegal: values?.adresseSenegal,
      adresse_pays_origine: values?.adressePaysOrigine,
      nationalite: values?.nationalite || nationalite,
      lieu_naissance: values?.lieuNaissance,
      Nom_pere: values?.nomPrenomPere,
      Adresse_pere: values?.adressePere,
      Telephone_pere: values?.telPere,
      Profession_pere: values?.professionPere,
      Nom_mere: values?.nomPrenomMere,
      Adresse_mere: values?.Adresse_mere,
      Telephone_mere: values?.Telephone_mere,
      Profession_mere: values?.professionMere,
      Personne_contact: values?.nomPrenomTuteur,
      username: values.username,
      password: values?.password,
      confirm_password: values?.confirmPassword,
      //PATS
      fonction: values?.fonction,
      categorie: values?.categorie,
      diplome: values?.diplome,
      //PER
      Etablissement_origine: values?.etablissementOrigine,
      grade: values?.grade,
      volume_horaire: values?.volumeHoraire,
      unite_enseignement,
      filiere,
      niveau_etude,
      ec,
      level,
      roles,
      //PER/PAT
      Type_contrat: values?.Type_contrat,
      Date_recrutement: values?.dateRecrutement,
      Specialite: values?.specialite,
    });
  },

  updateUserStatus: (body) => {
    const { id, etat } = body;
    return axios.put(`${baseUrl}/api/etats/${id}`, {
      id,
      etat:
        etat === "activated"
          ? "deactivated"
          : etat === "deactivated"
          ? "activated"
          : null,
    });
  },

  updateUserProfil: (body) => {
    const { values_, id } = body;
    return axios.put(`${baseUrl}/api/etats/${id}`, {
      id,
      password: values_.password.length > 0 ? values_.password : "",
      confirm_password:
        values_.confirm_password.length > 0 ? values_.confirm_password : "",
      email: values_.email.length > 0 ? values_.email : "",
      username: values_.username.length > 0 ? values_.username : "",
    });
  },

  editUserPassword: (body) => {
    const { values, id } = body;
    return axios.put(`${baseUrl}/api/users/${id}`, {
      id,
      password: values.password,
      confirm_password: values.confirmPassword,
    });
  },

  getAllStudent: () => {
    return axios.get(`${baseUrl}/api/etudiants`);
  },
  getAllPer: () => {
    return axios.get(`${baseUrl}/api/enseignants`);
  },
  getAllPats: () => {
    return axios.get(`${baseUrl}/api/paths`);
  },
  getAllFiliere: () => {
    return axios.get(`${baseUrl}/api/departements`);
  },
  addFiliere: (filiereName) => {
    return axios.post(`${baseUrl}/api/departements`, {
      name: filiereName?.filiere,
    });
  },
  deleteFiliere: (filiereId) => {
    return axios.delete(`${baseUrl}/api/departements/${filiereId}`);
  },

  getAllAnneeAcad: () => {
    return axios.get(`${baseUrl}/api/academies`);
  },

  getAllSemestre: () => {
    return axios.get(`${baseUrl}/api/semestres`);
  },
  addSemestre: (body) => {
    const { semestre } = body;
    return axios.post(`${baseUrl}/api/semestres`, {
      name: semestre,
    });
  },
  deleteSemestre: (semestreId) => {
    return axios.delete(`${baseUrl}/api/semestres/${semestreId}`);
  },

  getAllNiveau: () => {
    return axios.get(`${baseUrl}/api/niveaux`);
  },
  addNiveau: (niveauName) => {
    return axios.post(`${baseUrl}/api/niveaux`, {
      name: niveauName.niveau,
    });
  },
  deleteNiveau: (niveauId) => {
    return axios.delete(`${baseUrl}/api/niveaux/${niveauId}`);
  },

  getAllUE: () => {
    return axios.get(`${baseUrl}/api/matieres`);
  },

  getUeById: (id) => {
    return axios.get(`${baseUrl}/api/matieres/${id}`);
  },
  addUe: ({ values }) => {
    return axios.post(`${baseUrl}/api/matieres`, {
      nom_matiere: values?.nomUe,
      semestreId: values.semestreId,
      reference: values?.reference,
      credit: values?.credit,
      Type_matiere: values?.typeUe,
    });
  },
  editUe: (body) => {
    const { values, ueId, semestreId, nom_semestre } = body;
    return axios.put(`${baseUrl}/api/matieres/${ueId}`, {
      nom_matiere: values?.nomUe,
      semestreId,
      nom_semestre,
      reference: values?.reference,
      credit: values?.credit,
      Type_matiere: values?.typeUe,
      id: ueId,
    });
  },
  deleteUe: (ueId) => {
    return axios.delete(`${baseUrl}/api/matieres/${ueId}`);
  },

  getAllEC: () => {
    return axios.get(`${baseUrl}/api/elements`);
  },
  addEc: (body) => {
    const { values, vht } = body;
    return axios.post(`${baseUrl}/api/elements/`, {
      nom_element: values?.nomEc,
      cm: values?.cm,
      reference: values?.reference,
      stage: values?.stage,
      TP_TD: values?.tpTd,
      TPE: values?.tpe,
      VHT: vht,
      matiereId: values?.ue,
    });
  },

  getEcById: (id) => {
    return axios.get(`${baseUrl}/api/elements/${id}`);
  },

  editEc: (body) => {
    const { values, ecId, matiereId, nom_matiere } = body;
    return axios.put(`${baseUrl}/api/elements/${ecId}`, {
      id: ecId,
      matiereId,
      nom_matiere,
      nom_element: values?.nomEc,
      cm: values?.cm,
      reference: values?.reference,
      stage: values?.stage,
      TP_TD: values?.tpTd,
      TPE: values?.tpe,
      VHT: values?.vht,
    });
  },

  getAllClasse: () => {
    return axios.get(`${baseUrl}/api/affectations`);
  },

  getClasseById: (id) => {
    return axios.get(`${baseUrl}/api/affectations/${id}`);
  },
  addClasse: (body) => {
    const { values, userId, classe, semestres } = body;
    return axios.post(`${baseUrl}/api/affectations`, {
      departement: values.filiere,
      niveau: values.niveau,
      userId,
      classe,
      semestre: semestres,
    });
  },
  editClasse: (body) => {
    const { filiere, niveau, userId, classe, semestres, idClasse } = body;
    return axios.put(`${baseUrl}/api/affectations/${idClasse}`, {
      departement: filiere,
      niveau: niveau,
      classe,
      semestre: semestres,
      id: idClasse,
      userId,
    });
  },

  deleteClasse: (id) => {
    return axios.delete(`${baseUrl}/api/affectations/${id}`);
  },

  getAllAdmission: () => {
    return axios.get(`${baseUrl}/api/admissions`);
  },
  getStudentAdmissionById: (id) => {
    const { studentId } = id;
    return axios.post(`${baseUrl}/api/etudiants/admissions`, {
      userId: studentId,
    });
  },
  getStudentLastAdmissionApi: (body) => {
    const { studentId, cycle } = body;
    return axios.post(`${baseUrl}/api/student/admissions`, {
      userId: studentId,
      Cycle: cycle,
    });
  },

  createAdmission: (body) => {
    const {
      values,
      pictures,
      admissionDate,
      userName,
      userId,
      email,
      sexe,
      nationalite,
      matricule,
    } = body;
    const formData = new FormData();
    formData.append("Baccalaureat_serie", values?.serie);
    formData.append("Annee_obtention", values?.anneeObtention);
    formData.append("Mention", values?.mention);
    formData.append("Lycee_college", values?.lycee);
    formData.append("Facute_institut", values?.facultyOurInstitute);
    formData.append("Periode", values?.periode);
    formData.append("Raison", values?.raison);
    formData.append("filiere_demande", values?.filiere);
    formData.append("filiere", values?.filiere);
    formData.append("niveau_etude", values?.niveauEtude);
    formData.append("niveau_etude_demande", values?.niveauEtude);
    formData.append("Statut", "EN ATTENTE");
    formData.append("Matricule", matricule);
    formData.append(
      "condition_utilisation",
      values?.acceptedTos ? "accepter" : "refuser"
    );
    formData.append("Certificat_medical", values?.medicalCheck);
    formData.append("userId", userId);
    formData.append("utilisateur", userName);
    formData.append("nationalite", nationalite);
    formData.append("email", email);
    formData.append("Date_admission", admissionDate);
    formData.append("sexe", sexe);
    formData.append("Photo", pictures[0]);
    formData.append("Extrait_naissance", pictures[1]);
    formData.append("Diplome", pictures[2]);
    formData.append("Releve_notes", pictures[3]);
    return axios.post(`${baseUrl}/api/admissions`, formData, options);
  },

  addStudentAdmission: (body) => {
    const {
      values,
      pictures,
      admissionDate,
      utilisateur,
      userId,
      nationalite,
      sexe,
      email,
    } = body;
    const formData = new FormData();
    const classe = JSON.parse(values.niveauEtudeDemande);

    formData.append(
      "condition_utilisation",
      values.acceptedTos ? "accepter" : "refuser"
    );
    formData.append("Baccalaureat_serie", values?.serie);
    formData.append("Annee_obtention", values?.anneeObtention);
    formData.append("Mention", values?.mention);
    formData.append("Lycee_college", values?.lycee);
    formData.append("Facute_institut", values?.facultyOurInstitute);
    formData.append("Periode", values?.periode);
    formData.append("Raison", values?.raison);
    formData.append("filiere_demande", values?.filiereDemande);
    formData.append("niveau_etude_demande", classe?.classe);
    formData.append("Photo", pictures[0]);
    formData.append("Extrait_naissance", pictures[1]);
    formData.append("Diplome", pictures[2]);
    formData.append("Releve_notes", pictures[3]);
    formData.append("userId", userId);
    formData.append("email", email);
    formData.append("utilisateur", utilisateur);
    formData.append("nationalite", nationalite);
    formData.append("sexe", sexe);
    formData.append("Date_admission", admissionDate);
    return axios.post(`${baseUrl}/api/etudiants`, formData, options);
  },

  editAdmission: (body) => {
    const { admissionId, values, images, filiere, filiere_demande, visitMed } =
      body;
    const formData = new FormData();
    if (values?.serie) {
      formData.append("Baccalaureat_serie", values?.serie);
    }
    if (values?.anneeObtention) {
      formData.append("Annee_obtention", values?.anneeObtention);
    }
    if (values?.mention) {
      formData.append("Mention", values?.mention);
    }
    if (values?.lycee) {
      formData.append("Lycee_college", values?.lycee);
    }
    if (values?.facultyOurInstitute) {
      formData.append("Facute_institut", values?.facultyOurInstitute);
    }

    if (values?.periode) {
      formData.append("Periode", values?.periode);
    }

    if (values?.raison) {
      formData.append("Raison", values?.raison);
    }
    if (filiere) {
      formData.append("filiere", filiere);
    }
    if (filiere_demande) {
      formData.append("filiere_demande", filiere_demande);
    }

    if (values?.niveauEtude) {
      formData.append("niveau_etude", values?.niveauEtude);
    }

    formData.append("Statut", "EN ATTENTE");
    if (values?.acceptedTos) {
      formData.append(
        "condition_utilisation",
        values?.acceptedTos ? "accepter" : "refuser"
      );
    }

    if (visitMed) {
      formData.append("Certificat_medical", visitMed);
    }

    if (images[0]) {
      formData.append("Photo", images[0]);
    }
    if (images[1]) {
      formData.append("Extrait_naissance", images[1]);
    }
    if (images[2]) {
      formData.append("Diplome", images[2]);
    }

    if (images[3]) {
      formData.append("Releve_notes", images[3]);
    }

    formData.append("id", admissionId);
    return axios.put(
      `${baseUrl}/api/admissions/${admissionId}`,
      formData,
      options
    );
  },
  archiveAdmission: (body) => {
    const { admissionId } = body;
    return axios.put(`${baseUrl}/api/admissions/${admissionId}`, {
      id: admissionId,
      Statut: "archiver",
    });
  },
  createStudentMatricule: (body) => {
    const { id, filiere, sexe, ordreArrive, annee_acad } = body;
    return axios.put(`${baseUrl}/api/etats/${id}`, {
      id,
      Matricule: `${annee_acad}${filiere}${sexe}${ordreArrive}`,
    });
  },
  validateStudentAdmission: (body) => {
    const { Statut, classprofId, Cycle, admissionId, filiere_etude, filiere } =
      body;
    return axios.put(`${baseUrl}/api/admissions/${admissionId}`, {
      id: admissionId,
      Statut: Statut,
      classprofId: classprofId,
      Cycle,
      filiere_etude,
      filiere,
    });
  },
  getAllPaiements: () => {
    return axios.get(`${baseUrl}/api/paiements`);
  },
  getPaiementId: (paiementId) => {
    return axios.get(`${baseUrl}/api/paiements/${paiementId}`);
  },

  getPaymentByMonth: () => {
    return axios.get(`${baseUrl}/api/paiements/tarifications`);
  },
  deletePayment: (paiementId) => {
    return axios.delete(`${baseUrl}/api/paiements/${paiementId}`);
  },

  getAllNonPaye: (body) => {
    const { Cycle, mois } = body;
    return axios.post(`${baseUrl}/api/nopaiements`, {
      mois,
      Cycle,
    });
  },

  getStudentPaymentById: (studentId) => {
    return axios.post(`${baseUrl}/api/etudiants/paiements`, {
      userId: studentId,
    });
  },
  addPayment: (body) => {
    const {
      values,
      montantPayer,
      utilisateur,
      selectModePaiement,
      selectAnAcad,
      userId,
      selectMotif,
    } = body;

    return axios.post(`${baseUrl}/api/paiements`, {
      date: values?.date,
      montant: montantPayer,
      utilisateur,
      mode_paiement: selectModePaiement?.value,
      Cycle: selectAnAcad?.value,
      userId,
      admissionId: selectAnAcad?.id,
      tarifications: selectMotif,
    });
  },

  editPaiement: (body) => {
    const { paiementId, date, montant, Cycle, mode_paiement, tarifications } =
      body;
    return axios.put(`${baseUrl}/api/paiements/pay/${paiementId}`, {
      montant: montant,
      id: paiementId,
      Cycle,
      date,
      mode_paiement,
      tarifications,
    });
  },

  addToBibliotheque: (body) => {
    const { lien, image, categorie, type } = body;
    const formData = new FormData();
    formData.append("type", type);
    formData.append("lien", lien);
    formData.append("categorie", categorie);
    formData.append("image", image);
    return axios.post(`${baseUrl}/api/bibliotheque`, formData, options);
  },

  getBibliotheque: () => {
    return axios.get(`${baseUrl}/api/bibliotheque`);
  },
  deleteBibliotheque: (biblioId) => {
    return axios.delete(`${baseUrl}/api/bibliotheque/${biblioId}`);
  },

  getsyllabus: () => {
    return axios.get(`${baseUrl}/api/syllabus`);
  },
  deleteSyllabus: (syllabId) => {
    return axios.delete(`${baseUrl}/api/syllabus/${syllabId}`);
  },

  addSyllabus: (body) => {
    const { ec, image } = body;
    const formData = new FormData();
    formData.append("nom_classe", ec);
    formData.append("document", image);
    return axios.post(`${baseUrl}/api/syllabus`, formData, options);
  },

  addSupportCours: (body) => {
    const { values, image, categorie, anAcad, classeId, username } = body;
    const formData = new FormData();
    formData.append("titre", values?.titre);
    formData.append("username", username);
    formData.append("date", values?.date);
    formData.append("Annee_academique", anAcad);
    formData.append("semestreId", values?.semestre);
    formData.append("categorie", categorie);
    formData.append("classprofId", classeId);
    formData.append("support", image);
    return axios.post(`${baseUrl}/api/cours`, formData, options);
  },

  getSupportCours: (body) => {
    return axios.post(`${baseUrl}/api/listes/cours/professeurs`, {
      username: body,
    });
  },

  getSupportCoursEtudiant: (body) => {
    const { anAcad, classId, semestreId } = body;
    return axios.post(`${baseUrl}/api/listes/cours`, {
      Annee_academique: anAcad,
      classprofId: classId,
      semestreId,
    });
  },
  deleteSupport: (supportId) => {
    return axios.delete(`${baseUrl}/api/cours/${supportId}`);
  },

  addMessage: (body) => {
    const { date, message, Annee_academique, username, classprofId } = body;
    return axios.post(`${baseUrl}/api/messages`, {
      date,
      message,
      Annee_academique,
      username,
      classprofId,
    });
  },

  addMessageParent: (body) => {
    const { objet, text, parentId } = body;
    return axios.post(`${baseUrl}/api/parentmessages`, {
      objet,
      text,
      parentId,
    });
  },

  getMessageList: (body) => {
    const { Annee_academique, classprofId } = body;
    return axios.post(`${baseUrl}/api/listes/messages`, {
      Annee_academique,
      classprofId,
    });
  },

  addAssidute: (body) => {
    const { date, categorie, ec, cycle, userId, semestreId, classprofId } =
      body;
    return axios.post(`${baseUrl}/api/assiduites`, {
      date,
      categorie,
      ec,
      cycle,
      userId,
      semestreId,
      classprofId,
    });
  },

  getClasseAssidute: (body) => {
    const { cycle, semestreId, classprofId } = body;
    return axios.post(`${baseUrl}/api/assiduites/classes`, {
      cycle,
      semestreId,
      classprofId,
    });
  },

  getAssiduteByStudent: (id) => {
    return axios.post(`${baseUrl}/api/etudiants/assiduites`, {
      userId: id,
    });
  },

  deleteAssidute: (assiduteId) => {
    return axios.delete(`${baseUrl}/api/assiduites/${assiduteId}`);
  },

  getAllNotifications: () => {
    return axios.get(`${baseUrl}/api/notifications`);
  },

  getNotificationById: (id) => {
    return axios.get(`${baseUrl}/api/notifications/${id}`);
  },

  addNotification: (body) => {
    const { values, image, userId } = body;
    const formData = new FormData();
    formData.append("titre", values?.titre);
    formData.append("description", values?.description);
    formData.append("date", values?.date);
    formData.append("Image", image);
    formData.append("userId", userId);
    return axios.post(`${baseUrl}/api/notifications`, formData, options);
  },

  editNotification: (body) => {
    const { values, notifId, userId, image } = body;
    const formData = new FormData();
    formData.append("titre", values?.titre);
    formData.append("description", values?.description);
    formData.append("date", values?.date);
    formData.append("Image", image);
    formData.append("userId", userId);
    return axios.put(
      `${baseUrl}/api/notifications/${notifId}`,
      formData,
      options
    );
  },

  deleteNotification: (notifId) => {
    return axios.delete(`${baseUrl}/api/notifications/${notifId}`);
  },

  getAllTarification: () => {
    return axios.get(`${baseUrl}/api/tarifs`);
  },

  getAnneeAcademiqueById: (id) => {
    return axios.get(`${baseUrl}/api/academies/${id}`);
  },
  addAnneeAcademique: (body) => {
    const { values, annee_en_cours } = body;
    return axios.post(`${baseUrl}/api/academies`, {
      annee_en_cours,
      name: values.titre,
    });
  },
  editAnneeAcademique: (body) => {
    const { values, anneeAcadId, userId } = body;
    return axios.put(`${baseUrl}/api/academies/${anneeAcadId}`, {
      annee_en_cours: values?.anneeEnCours,
      name: values?.titre,
      id: anneeAcadId,
      userId,
    });
  },
  deleteAnneeAcademique: (anneeAcademiqueId) => {
    return axios.delete(`${baseUrl}/api/academies/${anneeAcademiqueId}`);
  },

  //emploi du temps
  updateEmpTemps: (body) => {
    const { newInput, id } = body;
    return axios.put(`${baseUrl}/api/temps/${parseInt(id)}`, newInput);
  },

  //tarif
  createTarif: (body) => {
    const { values, nomTarif, monthToSend } = body;
    return axios.post(`${baseUrl}/api/tarifs`, {
      nom_tarif: nomTarif,
      mois: monthToSend,
      montant_tarif: values?.montantTarif,
    });
  },
  deleteTarif: (tarifId) => {
    return axios.delete(`${baseUrl}/api/tarifs/${tarifId}`);
  },

  //notes

  getStudentNotes: (id) => {
    return axios.post(`${baseUrl}/api/etudiants/notes`, {
      userId: id,
    });
  },
  addNotes: (body) => {
    return axios.post(`${baseUrl}/api/notes`, body);
  },
  updateNotes: (body) => {
    return axios.post(`${baseUrl}/api/notes/modifications`, body);
  },
  getAllAnonymat: (body) => {
    return axios.post(`${baseUrl}/api/notesbycycle`, body);
  },

  getAgivenClasseStudent: (body) => {
    const { anAcad, classId } = body;
    return axios.post(`${baseUrl}/api/classe/etudiants`, {
      Cycle: anAcad,
      classprofId: classId,
    });
  },

  getListeAnonymat: (body) => {
    return axios.post(`${baseUrl}/api/listesAnonymats`, body);
  },

  generateAnonymatNumbers: (body) => {
    return axios.post(`${baseUrl}/api/anonymats`, body);
  },

  addEmp: (body) => {
    const { values, image, anAcad, classId, semestreData } = body;
    const formData = new FormData();
    formData.append("date", values?.date);
    formData.append("support", image);
    formData.append("Annee_academique", anAcad);
    formData.append("classprofId", classId);
    formData.append("semestreId", semestreData?.id);
    return axios.post(`${baseUrl}/api/temps`, formData, options);
  },
  getEmpTemps: (body) => {
    const { semestre, classId, anAcad } = body;
    return axios.post(`${baseUrl}/api/tempshoraires`, {
      classprofId: classId,
      semestreId: semestre?.id,
      Annee_academique: anAcad,
    });
  },

  addCours: (body) => {
    const { values, image, anAcad, classId, categorie, semestreData } = body;
    const formData = new FormData();
    formData.append("titre", values?.titre);
    formData.append("date", values?.date);
    formData.append("support", image);
    formData.append("Annee_academique", anAcad);
    formData.append("categorie", categorie);
    formData.append("classprofId", classId);
    formData.append("semestreId", semestreData?.id);
    return axios.post(`${baseUrl}/api/cours`, formData, options);
  },

  //statistique etudiants
  getByNationalite: () => {
    return axios.get(`${baseUrl}/api/nationalites`);
  },
  getStudentByTrancheAge: (body) => {
    return axios.post(`${baseUrl}/api/etudiants/ages`, {
      Cycle: body,
    });
  },
  getStudentParMonyenAge: (body) => {
    return axios.post(`${baseUrl}/api/etudiants/moyennes/ages `, {
      Cycle: body,
    });
  },
  getFiliere: (body) => {
    return axios.post(`${baseUrl}/api/admis/filiere`, {
      Cycle: body,
    });
  },
  getAdmisBySexe: (body) => {
    return axios.post(`${baseUrl}/api/admis/sexe`, {
      Cycle: body,
    });
  },
  getAdNiveau: (body) => {
    return axios.post(`${baseUrl}/api/admis/niveau`, {
      Cycle: body,
    });
  },

  getAdmissionState: (body) => {
    return axios.post(`${baseUrl}/api/admissions/statut`, {
      Cycle: body,
    });
  },

  //statistique per
  getPerParTrancheAge: (body) => {
    return axios.get(`${baseUrl}/api/enseignants/ages `);
  },
  getPerParMonyenAge: (body) => {
    return axios.get(`${baseUrl}/api/enseignants/moyennes/ages `);
  },
  getPerParSexe: (body) => {
    return axios.get(`${baseUrl}/api/enseignants/sexes`);
  },

  getPerParGrade: (body) => {
    return axios.get(`${baseUrl}/api/enseignants/grades`);
  },
  getPerParFiliere: (body) => {
    return axios.get(`${baseUrl}/api/enseignants/filieres`);
  },
  getPerParNiveauEtude: (body) => {
    return axios.get(`${baseUrl}/api/enseignants/niveauetudes`);
  },
  getPerParNiveau: (body) => {
    return axios.get(`${baseUrl}/api/enseignants/levels`);
  },
  getPerParTypeContrat: (body) => {
    return axios.get(`${baseUrl}/api/enseignants/contrats/statut`);
  },
  getPerParVacataire: (body) => {
    return axios.get(`${baseUrl}/api/enseignants/contrats/etablissements`);
  },

  //stats pats
  getPatsParTrancheAge: (body) => {
    return axios.get(`${baseUrl}/api/personnels/ages `);
  },
  getPatsParMonyenAge: (body) => {
    return axios.get(`${baseUrl}/api/personnels/moyennes/ages `);
  },
  getPatsParSexe: (body) => {
    return axios.get(`${baseUrl}/api/personnels/sexes`);
  },

  getPatsParCategorie: (body) => {
    return axios.get(`${baseUrl}/api/personnels/categories`);
  },
  getPatsParGrade: (body) => {
    return axios.get(`${baseUrl}/api/personnels/grades`);
  },
  getPatsParTypeContrat: (body) => {
    return axios.get(`${baseUrl}/api/personnels/contrats`);
  },

  //pv
  getPv: (body) => {
    const { Cycle, classprofId, semestreId } = body;
    return axios.post(`${baseUrl}/api/pvc`, {
      Cycle,
      classprofId,
      semestreId,
    });
  },
  getPvGlobal: (body) => {
    const { Cycle, classprofId, semestreId } = body;
    return axios.post(`${baseUrl}/api/pvglobal`, {
      Cycle,
      classprofId,
      semestreId,
    });
  },

  getReleveNote: (body) => {
    const { Cycle, classprofId } = body;
    return axios.post(`${baseUrl}/api/releves`, {
      Cycle,
      classprofId,
    });
  },
  getAllStudentWithAdminValidated: () => {
    return axios.get(`${baseUrl}/api/etudiants/validations`);
  },

  getStudentAttestation: (body) => {
    const { Cycle, userId } = body;
    return axios.post(`${baseUrl}/api/attestations`, {
      Cycle,
      userId,
    });
  },
};

export default api;
