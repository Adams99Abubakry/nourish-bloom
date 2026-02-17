export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export const ISLAMIC_QUIZ_QUESTIONS: QuizQuestion[] = [
  // Pillars of Islam
  { id: 1, question: "How many pillars of Islam are there?", options: ["3", "4", "5", "6"], correctIndex: 2, explanation: "The 5 pillars are: Shahada, Salah, Zakat, Sawm, and Hajj.", category: "Basics" },
  { id: 2, question: "What is the first pillar of Islam?", options: ["Salah", "Shahada", "Zakat", "Hajj"], correctIndex: 1, explanation: "Shahada (Declaration of Faith) is the first pillar.", category: "Basics" },
  { id: 3, question: "How many times a day must Muslims pray?", options: ["3", "4", "5", "7"], correctIndex: 2, explanation: "Muslims pray 5 obligatory prayers daily.", category: "Salah" },

  // Quran
  { id: 4, question: "How many surahs are in the Quran?", options: ["100", "114", "120", "124"], correctIndex: 1, explanation: "The Quran contains 114 surahs.", category: "Quran" },
  { id: 5, question: "What is the longest surah in the Quran?", options: ["Al-Imran", "An-Nisa", "Al-Baqarah", "Al-Maidah"], correctIndex: 2, explanation: "Surah Al-Baqarah has 286 verses, making it the longest.", category: "Quran" },
  { id: 6, question: "What is the shortest surah in the Quran?", options: ["Al-Kawthar", "Al-Ikhlas", "Al-Falaq", "An-Nas"], correctIndex: 0, explanation: "Surah Al-Kawthar has only 3 verses.", category: "Quran" },
  { id: 7, question: "In which month was the Quran first revealed?", options: ["Shaban", "Rajab", "Ramadan", "Muharram"], correctIndex: 2, explanation: "The Quran was first revealed in Ramadan on Laylatul Qadr.", category: "Quran" },
  { id: 8, question: "Who is the only woman mentioned by name in the Quran?", options: ["Khadijah", "Aisha", "Maryam", "Fatimah"], correctIndex: 2, explanation: "Maryam (Mary) is the only woman mentioned by name, with an entire surah named after her.", category: "Quran" },

  // Prophets
  { id: 9, question: "How many prophets are mentioned in the Quran?", options: ["20", "25", "30", "40"], correctIndex: 1, explanation: "25 prophets are mentioned by name in the Quran.", category: "Prophets" },
  { id: 10, question: "Who was the first prophet in Islam?", options: ["Ibrahim", "Nuh", "Adam", "Muhammad ﷺ"], correctIndex: 2, explanation: "Prophet Adam (AS) was the first prophet and the first human.", category: "Prophets" },
  { id: 11, question: "Which prophet built the Kaaba?", options: ["Muhammad ﷺ", "Ibrahim & Ismail", "Musa", "Nuh"], correctIndex: 1, explanation: "Prophet Ibrahim (AS) and his son Ismail (AS) built the Kaaba.", category: "Prophets" },
  { id: 12, question: "Which prophet was swallowed by a whale?", options: ["Musa", "Yunus", "Dawud", "Sulaiman"], correctIndex: 1, explanation: "Prophet Yunus (Jonah) was swallowed by a large fish/whale.", category: "Prophets" },
  { id: 13, question: "Which prophet could speak to animals?", options: ["Dawud", "Sulaiman", "Musa", "Isa"], correctIndex: 1, explanation: "Prophet Sulaiman (Solomon) was given the ability to understand the language of animals.", category: "Prophets" },

  // Sahaba
  { id: 14, question: "Who was the first caliph after Prophet Muhammad ﷺ?", options: ["Umar", "Uthman", "Abu Bakr", "Ali"], correctIndex: 2, explanation: "Abu Bakr As-Siddiq (RA) was the first Rightly Guided Caliph.", category: "Sahaba" },
  { id: 15, question: "Who was known as 'Al-Farooq' (The Distinguisher)?", options: ["Abu Bakr", "Umar", "Uthman", "Ali"], correctIndex: 1, explanation: "Umar ibn Al-Khattab (RA) was given this title for his ability to distinguish truth from falsehood.", category: "Sahaba" },
  { id: 16, question: "Who was known as 'Dhun-Noorayn' (The Possessor of Two Lights)?", options: ["Ali", "Abu Bakr", "Uthman", "Umar"], correctIndex: 2, explanation: "Uthman ibn Affan (RA) married two daughters of the Prophet ﷺ.", category: "Sahaba" },
  { id: 17, question: "Who was the first woman to accept Islam?", options: ["Aisha", "Khadijah", "Fatimah", "Sumayyah"], correctIndex: 1, explanation: "Khadijah bint Khuwaylid (RA), the wife of the Prophet ﷺ, was the first woman to accept Islam.", category: "Sahaba" },
  { id: 18, question: "Who was the first man to accept Islam?", options: ["Abu Bakr", "Ali", "Umar", "Uthman"], correctIndex: 0, explanation: "Abu Bakr As-Siddiq (RA) was the first adult man to accept Islam.", category: "Sahaba" },
  { id: 19, question: "Who was the first child to accept Islam?", options: ["Abu Bakr", "Uthman", "Ali", "Zaid"], correctIndex: 2, explanation: "Ali ibn Abi Talib (RA) was the first child/youth to accept Islam.", category: "Sahaba" },
  { id: 20, question: "Who was the first muezzin (caller to prayer)?", options: ["Abu Bakr", "Bilal", "Uthman", "Umar"], correctIndex: 1, explanation: "Bilal ibn Rabah (RA) was chosen by the Prophet ﷺ as the first muezzin.", category: "Sahaba" },

  // Islamic History
  { id: 21, question: "In which year did the Hijrah (migration to Madinah) occur?", options: ["610 CE", "620 CE", "622 CE", "630 CE"], correctIndex: 2, explanation: "The Hijrah occurred in 622 CE and marks the beginning of the Islamic calendar.", category: "History" },
  { id: 22, question: "What was the first battle in Islam?", options: ["Uhud", "Badr", "Khandaq", "Hunayn"], correctIndex: 1, explanation: "The Battle of Badr in 2 AH was the first major battle.", category: "History" },
  { id: 23, question: "In which city was Prophet Muhammad ﷺ born?", options: ["Madinah", "Makkah", "Taif", "Jerusalem"], correctIndex: 1, explanation: "The Prophet ﷺ was born in Makkah in the Year of the Elephant (570 CE).", category: "History" },
  { id: 24, question: "What is the name of the night journey of the Prophet ﷺ?", options: ["Hijrah", "Isra and Mi'raj", "Laylatul Qadr", "Eid"], correctIndex: 1, explanation: "Isra and Mi'raj was the miraculous night journey from Makkah to Jerusalem and then to the heavens.", category: "History" },

  // Ramadan & Fasting
  { id: 25, question: "What is the reward of fasting in Ramadan with faith and hope?", options: ["Double rewards", "Forgiveness of past sins", "Entry to Jannah", "All rewards multiplied by 10"], correctIndex: 1, explanation: "The Prophet ﷺ said whoever fasts Ramadan with faith and hope of reward, his past sins will be forgiven.", category: "Ramadan" },
  { id: 26, question: "What is the special gate of Paradise for those who fast?", options: ["Bab As-Salah", "Bab Ar-Rayyan", "Bab Al-Jihad", "Bab As-Sadaqah"], correctIndex: 1, explanation: "Ar-Rayyan is the special gate through which those who fast will enter Paradise.", category: "Ramadan" },
  { id: 27, question: "When is Laylatul Qadr most likely?", options: ["1st night", "15th night", "27th night", "Last day"], correctIndex: 2, explanation: "While it can be any odd night in the last 10, the 27th is considered most likely by many scholars.", category: "Ramadan" },

  // General Knowledge
  { id: 28, question: "What direction do Muslims face when praying?", options: ["East", "West", "Toward the Kaaba", "North"], correctIndex: 2, explanation: "Muslims face the Kaaba in Makkah (the Qibla) when praying.", category: "Salah" },
  { id: 29, question: "What is the holy book of Islam?", options: ["Torah", "Bible", "Quran", "Psalms"], correctIndex: 2, explanation: "The Quran is the final holy book revealed to Prophet Muhammad ﷺ.", category: "Basics" },
  { id: 30, question: "How many rakats are in Fajr prayer?", options: ["2", "3", "4", "1"], correctIndex: 0, explanation: "Fajr prayer consists of 2 obligatory rakats.", category: "Salah" },
  { id: 31, question: "What is Zakat calculated on?", options: ["Monthly income", "Savings above Nisab for one year", "Total property", "Annual income"], correctIndex: 1, explanation: "Zakat is 2.5% of wealth that has been held above the Nisab threshold for one full year.", category: "Basics" },
  { id: 32, question: "Which angel is responsible for revelation?", options: ["Mikail", "Israfil", "Jibreel", "Azrael"], correctIndex: 2, explanation: "Angel Jibreel (Gabriel) brought the Quran from Allah to Prophet Muhammad ﷺ.", category: "Basics" },
  { id: 33, question: "What is the meaning of 'Islam'?", options: ["Peace", "Submission to Allah", "Love", "Faith"], correctIndex: 1, explanation: "Islam means voluntary submission to the will of Allah.", category: "Basics" },
  { id: 34, question: "How many chapters (Juz) is the Quran divided into?", options: ["20", "25", "30", "40"], correctIndex: 2, explanation: "The Quran is divided into 30 Juz (parts) for ease of reading.", category: "Quran" },
  { id: 35, question: "Who compiled the Quran into one book?", options: ["Prophet Muhammad ﷺ", "Abu Bakr (RA)", "Uthman (RA)", "Umar (RA)"], correctIndex: 2, explanation: "While Abu Bakr (RA) initiated the compilation, Uthman (RA) standardized and distributed the final version.", category: "Quran" },

  // Seerah
  { id: 36, question: "At what age did Prophet Muhammad ﷺ receive the first revelation?", options: ["25", "30", "35", "40"], correctIndex: 3, explanation: "The Prophet ﷺ received the first revelation at the age of 40 in the Cave of Hira.", category: "History" },
  { id: 37, question: "What was the Prophet's ﷺ first wife's name?", options: ["Aisha", "Khadijah", "Hafsa", "Sawda"], correctIndex: 1, explanation: "Khadijah bint Khuwaylid (RA) was the first wife and the first person to accept Islam.", category: "History" },
  { id: 38, question: "What is the name of the cave where the Prophet ﷺ received revelation?", options: ["Cave of Thawr", "Cave of Hira", "Cave of Ashab al-Kahf", "Cave of Soor"], correctIndex: 1, explanation: "The Cave of Hira on Mount Noor near Makkah is where Jibreel first appeared to the Prophet ﷺ.", category: "History" },
  { id: 39, question: "How many children did Prophet Muhammad ﷺ have?", options: ["4", "5", "6", "7"], correctIndex: 3, explanation: "The Prophet ﷺ had 7 children: 3 sons (Qasim, Abdullah, Ibrahim) and 4 daughters (Zainab, Ruqayyah, Umm Kulthum, Fatimah).", category: "History" },
  { id: 40, question: "What was the Treaty of Hudaybiyyah?", options: ["A trade agreement", "A peace treaty with Quraysh", "A military alliance", "A marriage contract"], correctIndex: 1, explanation: "The Treaty of Hudaybiyyah (6 AH) was a peace agreement between the Muslims and the Quraysh of Makkah.", category: "History" },
];

export const QUIZ_CATEGORIES = [...new Set(ISLAMIC_QUIZ_QUESTIONS.map(q => q.category))];
