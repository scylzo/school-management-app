import { configureStore } from "@reduxjs/toolkit";
import {
  addAdmissionStudentSlice,
  admissionByIdSlice,
  admissionEditionSlice,
  admissionSlice,
  admissionValidationSlice,
  archiveAdmissionsSlice,
  createMatriculeSlice,
} from "./admissionFeatures";
import {
  loginAdminSlice,
  loginParentSlice,
  loginProfSlice,
  loginSlice,
  registerOtherSlice,
  loginPatsSlice,
} from "./authFeatures";
import { studentSlice } from "./studentFeatures";
import { studentWithAdminValidSlice } from "./studentFeatures";
import { usersSlice } from "./userFeatures/usersSlice";
import {
  editParentSlice,
  parentAffectationSlice,
  parentsSlice,
  registerParentSlice,
  updateParentStatusSlice,
} from "./parentFeatures";

import {
  anneeAcadSlice,
  filiereSlice,
  semestreSlice,
  ueSlice,
  ecSlice,
  classeSlice,
  createAnneeAcadSlice,
  deleteAnneeAcadSlice,
  deleteSemestreSlice,
  addSemestreSlice,
  addNiveauSlice,
  niveauSlice,
  deleteNiveauSlice,
  addFiliereSlice,
  deleteFiliereSlice,
  addUeSlice,
  deleteUeSlice,
  editUeSlice,
  addEcSlice,
  deleteEcSlice,
  editEcSlice,
  addClasseSlice,
  deleteClasseSlice,
  editClasseSlice,
} from "./scolariteFeatures";
import { userSlice } from "./userFeatures/userSilce";
import { perSlice } from "./personnelFeatures/perFeatures";
import { patsSlice } from "./personnelFeatures/patsFeatures";
import {
  createTarifSlice,
  deleteTarifSlice,
  tarificationSlice,
} from "./tarificationFeatures";
import {
  addNotificationsSlice,
  deleteNotificationSlice,
  editNotificationSlice,
  notificationsSlice,
} from "./notificationFeatures";
import { createAdmissionsSlice } from "./admissionFeatures/createAdmissionSlice";
import {
  adminUsersSlice,
  editUserPasswordSlice,
  editUserSlice,
  updateUserProfilSlice,
  updateUserStatusSlice,
} from "./userFeatures";
import {
  addPaymentSlice,
  deletePaymentSlice,
  editPaymentSlice,
  paymentByIdSlice,
  paymentSlice,
} from "./paymentFeatures";
import {
  classeStudentSlice,
  createNotesSlice,
  getAnonymatSlice,
  generateAnonymatSlice,
  updateNotesSlice,
} from "./notesFeatures";
import { addEmpSlice, getEmpTempsSlice } from "./emploiDuTempsFeature";
import { getFiliereStatSlice, nationaliteSlice } from "./statistiqueFeatures";
import {
  addSupportCoursSlice,
  deleteSupportSlice,
} from "./supportCoursFeatures";
import {
  addToBibliothequeSlice,
  bibliothequeSlice,
  deleteBibliothequeSlice,
} from "./bibliothequeFeatures";
import { deleteSyllabusSlice, syllabusSlice } from "./syllabusFeatures";
import {
  addAssiduteAbsenceSlice,
  addAssiduteRetardSlice,
  deleteAssiduteSlice,
} from "./assiduteFeatures";
import {
  addMessageParentSlice,
  addMessageSlice,
  getlistMessageSlice,
} from "./messageFeatures";

export const store = configureStore({
  reducer: {
    authLogin: loginSlice.reducer,
    admission: admissionSlice.reducer,
    filiere: filiereSlice.reducer,
    anneeAcad: anneeAcadSlice.reducer,
    semestre: semestreSlice.reducer,
    niveau: niveauSlice.reducer,
    ue: ueSlice.reducer,
    ec: ecSlice.reducer,
    classe: classeSlice.reducer,
    student: studentSlice.reducer,
    students: studentWithAdminValidSlice.reducer,
    per: perSlice.reducer,
    pats: patsSlice.reducer,
    users: usersSlice.reducer,
    user: userSlice.reducer,
    parents: parentsSlice.reducer,
    tarifications: tarificationSlice.reducer,
    notifications: notificationsSlice.reducer,
    creationNotifications: addNotificationsSlice.reducer,
    creationAdmissions: createAdmissionsSlice.reducer,
    authRegisterOther: registerOtherSlice.reducer,
    admissionById: admissionByIdSlice.reducer,
    creationMatricule: createMatriculeSlice.reducer,
    validationAdmission: admissionValidationSlice.reducer,
    editionAdmission: admissionEditionSlice.reducer,
    archivageAdmissions: archiveAdmissionsSlice.reducer,
    updatingUserStatus: updateUserStatusSlice.reducer,
    updatingUserProfil: updateUserProfilSlice.reducer,
    editingUser: editUserSlice.reducer,
    addingParent: registerParentSlice.reducer,
    affectingParent: parentAffectationSlice.reducer,
    updatingParentStatus: updateParentStatusSlice.reducer,
    creationAnneeAcad: createAnneeAcadSlice.reducer,
    deletingAnneeAcad: deleteAnneeAcadSlice.reducer,
    deletingSemstre: deleteSemestreSlice.reducer,
    addingSemestre: addSemestreSlice.reducer,
    addingNiveau: addNiveauSlice.reducer,
    deletingNiveau: deleteNiveauSlice.reducer,
    addingFiliere: addFiliereSlice.reducer,
    deletingFiliere: deleteFiliereSlice.reducer,
    addingUe: addUeSlice.reducer,
    deletingUe: deleteUeSlice.reducer,
    editingUe: editUeSlice.reducer,
    addingEc: addEcSlice.reducer,
    editingEc: editEcSlice.reducer,
    deletingEc: deleteEcSlice.reducer,
    addingClasse: addClasseSlice.reducer,
    deletingClasse: deleteClasseSlice.reducer,
    creatingTarif: createTarifSlice.reducer,
    deletingTarif: deleteTarifSlice.reducer,
    authAdminLogin: loginAdminSlice.reducer,
    authParentLogin: loginParentSlice.reducer,
    payment: paymentSlice.reducer,
    paymentById: paymentByIdSlice.reducer,
    classeStudent: classeStudentSlice.reducer,
    adminUser: adminUsersSlice.reducer,
    editingParent: editParentSlice.reducer,
    deletingNotification: deleteNotificationSlice.reducer,
    editNotification: editNotificationSlice.reducer,
    authProfLogin: loginProfSlice.reducer,
    authPatsLogin: loginPatsSlice.reducer,
    creatingNotes: createNotesSlice.reducer,
    anonymat: getAnonymatSlice.reducer,
    generateAnomymat: generateAnonymatSlice.reducer,
    addingEmp: addEmpSlice.reducer,
    nationalite: nationaliteSlice.reducer,
    empTemps: getEmpTempsSlice.reducer,
    addingPayment: addPaymentSlice.reducer,
    filiereStat: getFiliereStatSlice.reducer,
    updatingNotes: updateNotesSlice.reducer,
    addingSupportCours: addSupportCoursSlice.reducer,
    addStudentAdmissions: addAdmissionStudentSlice.reducer,
    deletingPayment: deletePaymentSlice.reducer,
    editPayment: editPaymentSlice.reducer,
    editingClasse: editClasseSlice.reducer,
    addingToBibliotheque: addToBibliothequeSlice.reducer,
    bibliotheque: bibliothequeSlice.reducer,
    deletingBibliotheque: deleteBibliothequeSlice.reducer,
    syllabus: syllabusSlice.reducer,
    deletingSyllabus: deleteSyllabusSlice.reducer,
    editingUserPassword: editUserPasswordSlice.reducer,
    addingAssiduteRetard: addAssiduteRetardSlice.reducer,
    addingAssiduteAbsence: addAssiduteAbsenceSlice.reducer,
    deletingAssidute: deleteAssiduteSlice.reducer,
    deletingSupport: deleteSupportSlice.reducer,
    addingMessage: addMessageSlice.reducer,
    listMessage: getlistMessageSlice.reducer,
    addingMessageParent: addMessageParentSlice.reducer,
  },
});
