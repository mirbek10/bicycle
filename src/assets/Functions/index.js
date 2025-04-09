const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ваш_email@gmail.com',
    pass: 'ваш_пароль'
  }
});

// Генерация 6-значного кода
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Отправка email
const sendVerificationEmail = async (email, code) => {
  await transporter.sendMail({
    from: 'noreply@ваш_проект.com',
    to: email,
    subject: 'Код подтверждения',
    html: `<p>Ваш код: <b>${code}</b></p>`
  });
};

// Регистрация через Google + отправка кода
exports.authWithGoogle = functions.https.onCall(async (data, context) => {
  const { idToken } = data;
  try {
    const { uid, email } = await admin.auth().verifyIdToken(idToken);
    const code = generateCode();
    
    await admin.firestore().collection('verificationCodes').doc(uid).set({
      code,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    await sendVerificationEmail(email, code);
    return { success: true, userId: uid };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// Проверка кода
exports.verifyCode = functions.https.onCall(async (data, context) => {
  const { userId, code } = data;
  const snapshot = await admin.firestore().collection('verificationCodes').doc(userId).get();
  
  if (!snapshot.exists || snapshot.data().code !== code) {
    throw new functions.https.HttpsError('invalid-argument', 'Неверный код');
  }
  
  await admin.auth().updateUser(userId, { emailVerified: true });
  await snapshot.ref.delete();
  return { success: true };
});