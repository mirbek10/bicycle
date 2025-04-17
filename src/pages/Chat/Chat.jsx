import { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  doc,
  setDoc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db, auth } from "../../firebase";
import { motion, AnimatePresence } from "framer-motion";
import "./Chat.scss";
import { useNavigate } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { FaPen } from "react-icons/fa";

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03 },
  }),
};

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -100 }
};

function Chat() {
    const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const userMessageRef = useRef(null); // Новый ref

  // Аутентификация
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
   navigate("/register");
  };

  // Получение сообщений
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Индикатор набора
  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(false), 1500);
    return () => clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, 'typing', user.uid);
    if (text && isTyping) {
      setDoc(userRef, {
        email: user.email,
        typing: true,
        lastTyped: serverTimestamp()
      });
    } else {
      deleteDoc(userRef);
    }
  }, [text, isTyping, user]);

  useEffect(() => {
    if (!user) return;
    const q = collection(db, 'typing');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const typers = snapshot.docs
        .filter(doc => doc.id !== user?.uid)
        .map(doc => doc.data().email);
      setTypingUsers(typers);
    });
    return () => unsubscribe();
  }, [user]);

  // Прокрутка к сообщению пользователя
  const scrollToOwnMessage = () => {
    if (userMessageRef.current) {
      userMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  };

  useEffect(() => {
    scrollToOwnMessage();
  }, [messages]);

  // Отправка
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() || !user) return;

    await addDoc(collection(db, "messages"), {
      text,
      uid: user.uid,
      email: user.email,
      createdAt: serverTimestamp(),
      isEdited: false
    });

    setText("");
    setIsTyping(false);
  };

  // Редактирование
  const startEditing = (message) => {
    setEditingId(message.id);
    setEditText(message.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEditing = async () => {
    if (!editText.trim() || !editingId) return;
    await updateDoc(doc(db, "messages", editingId), {
      text: editText,
      isEdited: true
    });
    setEditingId(null);
    setEditText("");
  };

  const deleteMessage = async (id) => {
    await deleteDoc(doc(db, "messages", id));
  };

  const getInitials = (email) => {
    if (!email) return "??";
    const name = email.split("@")[0];
    return name
      .split(/[._]/)
      .map((part) => part[0]?.toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!user) {
    return (
      <div className="auth-container">
        <motion.div
          className="auth-box"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2>Войдите в чат</h2>
          <p>Чтобы начать общение, войдите с помощью Google</p>
          <motion.button
            className="google-btn"
            onClick={signInWithGoogle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" />
            Войти с Google
          </motion.button>
        </motion.div>
      </div>
    );
  }
  

  return (
    <div className="chat-room">
      <div className="chat-header">
        <div className="user-info">
          <div className="avatar">{getInitials(user.email)}</div>
          <span>{user.email}</span>
        </div>
        <motion.button
          className="logout-btn"
          onClick={() => auth.signOut()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Выйти
        </motion.button>
      </div>

      <div className="messages">
        <AnimatePresence>
          {messages.map((msg, index) => {
            const isOwn = msg.uid === user.uid;
            const ref = isOwn && !userMessageRef.current ? userMessageRef : null;

            return (
              <motion.div
                key={msg.id}
                ref={ref}
                className={`message ${isOwn ? "own" : ""}`}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <div className="avatar">{getInitials(msg.email)}</div>
                <div className="content">
                  <div className="message-header">
                    <span className="email">{msg.email}</span>
                    <span className="time">{formatDate(msg.createdAt)}</span>
                    {msg.isEdited && <span className="edited">(изменено)</span>}
                  </div>

                  {editingId === msg.id ? (
                    <div className="edit-form">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                      />
                      <div className="edit-actions">
                        <button onClick={saveEditing}>Сохранить</button>
                        <button onClick={cancelEditing}>Отмена</button>
                      </div>
                    </div>
                  ) : (
                    <p className="animated-text">
                      {msg.text.split("").map((char, i) => (
                        <motion.span
                          key={i}
                          custom={i}
                          variants={textVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </p>
                  )}

                  {isOwn && !editingId && (
                    <div className="message-actions">
                      <button onClick={() => startEditing(msg)}><FaPen/></button>
                      <button onClick={() => deleteMessage(msg.id)}><GoTrash/></button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {typingUsers.length > 0 && (
          <div className="typing-notice">
            <div className="typing-text">
              {typingUsers.join(', ')} {typingUsers.length > 1 ? 'печатают' : 'печатает'}...
            </div>
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>

      <form className="send-form" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Сообщение..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setIsTyping(true);
          }}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          type="submit"
          disabled={!text.trim()}
        >
          Отправить
        </motion.button>
      </form>
    </div>
  );
}

export default Chat;
