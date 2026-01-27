// Comprehensive Hisnul Muslim (Fortress of the Muslim) Azkar Collection

export interface Azkar {
  id: number;
  title: string;
  arabicTitle: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  count: number;
  audioUrl?: string;
}

export interface AzkarCategory {
  id: string;
  name: string;
  arabicName: string;
  icon: string;
  azkar: Azkar[];
}

// Morning Azkar (أذكار الصباح)
export const morningAzkar: Azkar[] = [
  {
    id: 1,
    title: "Ayat Al-Kursi",
    arabicTitle: "آية الكرسي",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum. Wa la yuhituna bi-shay'im-min 'ilmihi illa bima sha'. Wasi'a kursiyyuhus-samawati wal-ard. Wa la ya'uduhu hifduhuma. Wa Huwal-'Aliyyul-'Adhim.",
    translation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
    reference: "Al-Baqarah 2:255",
    count: 1,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3"
  },
  {
    id: 2,
    title: "Surah Al-Ikhlas",
    arabicTitle: "سورة الإخلاص",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
    transliteration: "Qul Huwa Allahu Ahad. Allahus-Samad. Lam yalid wa lam yulad. Wa lam yakun lahu kufuwan ahad.",
    translation: "Say, 'He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent.'",
    reference: "Surah Al-Ikhlas 112:1-4",
    count: 3,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6221.mp3"
  },
  {
    id: 3,
    title: "Surah Al-Falaq",
    arabicTitle: "سورة الفلق",
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    transliteration: "Qul a'udhu bi-Rabbil-Falaq. Min sharri ma khalaq. Wa min sharri ghasiqin idha waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin idha hasad.",
    translation: "Say, 'I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies.'",
    reference: "Surah Al-Falaq 113:1-5",
    count: 3,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3"
  },
  {
    id: 4,
    title: "Surah An-Nas",
    arabicTitle: "سورة الناس",
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
    transliteration: "Qul a'udhu bi-Rabbin-Nas. Malikin-Nas. Ilahin-Nas. Min sharril-waswasil-khannas. Alladhi yuwaswisu fi sudurin-nas. Minal-jinnati wan-nas.",
    translation: "Say, 'I seek refuge in the Lord of mankind. The Sovereign of mankind. The God of mankind. From the evil of the retreating whisperer. Who whispers into the breasts of mankind. From among the jinn and mankind.'",
    reference: "Surah An-Nas 114:1-6",
    count: 3,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6226.mp3"
  },
  {
    id: 5,
    title: "Morning Supplication",
    arabicTitle: "دعاء الصباح",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَـٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa Huwa 'ala kulli shay'in Qadir.",
    translation: "We have reached the morning and at this very time the whole kingdom belongs to Allah. All praise is due to Allah. There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him is all praise, and He is over all things omnipotent.",
    reference: "Abu Dawud 4/317, Sahih Ibn Hibban",
    count: 1
  },
  {
    id: 6,
    title: "Seeking Refuge",
    arabicTitle: "الاستعاذة",
    arabic: "أَعُوذُ بِاللَّهِ السَّمِيعِ الْعَلِيمِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    transliteration: "A'udhu billahis-Sami'il-'Alimi minash-Shaytanir-rajim.",
    translation: "I seek refuge in Allah, the All-Hearing, the All-Knowing, from Satan the accursed.",
    reference: "Abu Dawud 4/324",
    count: 1
  },
  {
    id: 7,
    title: "Sayyid Al-Istighfar",
    arabicTitle: "سيد الاستغفار",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَـٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bi ni'matika 'alayya, wa abu'u bi dhanbi faghfir li fa innahu la yaghfirudh-dhunuba illa Anta.",
    translation: "O Allah, You are my Lord. There is no god but You. You created me and I am Your slave. I keep my covenant with You and my pledge to You as much as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your blessings upon me, and I acknowledge my sins. So forgive me, for there is none who forgives sins except You.",
    reference: "Bukhari 7/150",
    count: 1
  },
  {
    id: 8,
    title: "Trust in Allah",
    arabicTitle: "التوكل على الله",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Bismillahi tawakkaltu 'alallah, la hawla wa la quwwata illa billah.",
    translation: "In the name of Allah, I place my trust in Allah, there is no power and no strength except with Allah.",
    reference: "Abu Dawud 4/325",
    count: 1
  },
  {
    id: 9,
    title: "SubhanAllah wa Bihamdihi",
    arabicTitle: "سبحان الله وبحمده",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: "SubhanAllahi wa bihamdihi.",
    translation: "Glory is to Allah and praise is to Him.",
    reference: "Muslim 4/2071",
    count: 100
  },
  {
    id: 10,
    title: "La ilaha illallah",
    arabicTitle: "لا إله إلا الله",
    arabic: "لَا إِلَـٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu, wa Huwa 'ala kulli shay'in Qadir.",
    translation: "There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him is all praise, and He is over all things omnipotent.",
    reference: "Bukhari 4/95, Muslim 4/2071",
    count: 10
  },
  {
    id: 11,
    title: "Seeking Protection",
    arabicTitle: "طلب الحماية",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
    transliteration: "Allahumma inni as'alukal-'afiyata fid-dunya wal-akhirah. Allahumma inni as'alukal-'afwa wal-'afiyata fi dini wa dunyaya wa ahli wa mali.",
    translation: "O Allah, I ask You for well-being in this world and the Hereafter. O Allah, I ask You for pardon and well-being in my religion, my worldly life, my family and my wealth.",
    reference: "Ibn Majah 2/332",
    count: 1
  },
  {
    id: 12,
    title: "Seeking Refuge from Evil",
    arabicTitle: "الاستعاذة من الشر",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَـٰهَ إِلَّا أَنْتَ",
    transliteration: "Allahumma inni a'udhu bika minal-kufri wal-faqr, wa a'udhu bika min 'adhabil-qabr, la ilaha illa Anta.",
    translation: "O Allah, I seek refuge in You from disbelief and poverty, and I seek refuge in You from the punishment of the grave. There is no god but You.",
    reference: "Abu Dawud 4/324",
    count: 3
  }
];

// Evening Azkar (أذكار المساء)
export const eveningAzkar: Azkar[] = [
  {
    id: 1,
    title: "Ayat Al-Kursi",
    arabicTitle: "آية الكرسي",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum. Wa la yuhituna bi-shay'im-min 'ilmihi illa bima sha'. Wasi'a kursiyyuhus-samawati wal-ard. Wa la ya'uduhu hifduhuma. Wa Huwal-'Aliyyul-'Adhim.",
    translation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
    reference: "Al-Baqarah 2:255",
    count: 1,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3"
  },
  {
    id: 2,
    title: "Surah Al-Ikhlas",
    arabicTitle: "سورة الإخلاص",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
    transliteration: "Qul Huwa Allahu Ahad. Allahus-Samad. Lam yalid wa lam yulad. Wa lam yakun lahu kufuwan ahad.",
    translation: "Say, 'He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent.'",
    reference: "Surah Al-Ikhlas 112:1-4",
    count: 3,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6221.mp3"
  },
  {
    id: 3,
    title: "Surah Al-Falaq",
    arabicTitle: "سورة الفلق",
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    transliteration: "Qul a'udhu bi-Rabbil-Falaq. Min sharri ma khalaq. Wa min sharri ghasiqin idha waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin idha hasad.",
    translation: "Say, 'I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies.'",
    reference: "Surah Al-Falaq 113:1-5",
    count: 3,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3"
  },
  {
    id: 4,
    title: "Surah An-Nas",
    arabicTitle: "سورة الناس",
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
    transliteration: "Qul a'udhu bi-Rabbin-Nas. Malikin-Nas. Ilahin-Nas. Min sharril-waswasil-khannas. Alladhi yuwaswisu fi sudurin-nas. Minal-jinnati wan-nas.",
    translation: "Say, 'I seek refuge in the Lord of mankind. The Sovereign of mankind. The God of mankind. From the evil of the retreating whisperer. Who whispers into the breasts of mankind. From among the jinn and mankind.'",
    reference: "Surah An-Nas 114:1-6",
    count: 3,
    audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6226.mp3"
  },
  {
    id: 5,
    title: "Evening Supplication",
    arabicTitle: "دعاء المساء",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَـٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Amsayna wa amsal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa Huwa 'ala kulli shay'in Qadir.",
    translation: "We have reached the evening and at this very time the whole kingdom belongs to Allah. All praise is due to Allah. There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him is all praise, and He is over all things omnipotent.",
    reference: "Abu Dawud 4/317",
    count: 1
  },
  {
    id: 6,
    title: "Before Sleeping",
    arabicTitle: "دعاء النوم",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya.",
    translation: "In Your name O Allah, I die and I live.",
    reference: "Bukhari 11/113",
    count: 1
  },
  {
    id: 7,
    title: "Seeking Refuge at Night",
    arabicTitle: "الاستعاذة في المساء",
    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
    transliteration: "Allahumma bika amsayna wa bika asbahna, wa bika nahya wa bika namutu, wa ilaykal-masir.",
    translation: "O Allah, by Your leave we have reached the evening and by Your leave we have reached the morning. By Your leave we live and die and to You is our return.",
    reference: "Tirmidhi 5/466",
    count: 1
  },
  {
    id: 8,
    title: "SubhanAllah wa Bihamdihi",
    arabicTitle: "سبحان الله وبحمده",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: "SubhanAllahi wa bihamdihi.",
    translation: "Glory is to Allah and praise is to Him.",
    reference: "Muslim 4/2071",
    count: 100
  },
  {
    id: 9,
    title: "La ilaha illallah",
    arabicTitle: "لا إله إلا الله",
    arabic: "لَا إِلَـٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu, wa Huwa 'ala kulli shay'in Qadir.",
    translation: "There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him is all praise, and He is over all things omnipotent.",
    reference: "Bukhari 4/95, Muslim 4/2071",
    count: 10
  },
  {
    id: 10,
    title: "Seeking Protection for Night",
    arabicTitle: "طلب الحماية للنوم",
    arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
    transliteration: "Allahumma qini 'adhabaka yawma tab'athu 'ibadak.",
    translation: "O Allah, protect me from Your punishment on the Day when You resurrect Your servants.",
    reference: "Abu Dawud 4/311",
    count: 3
  }
];

// Daily Supplications
export const dailySupplications: Azkar[] = [
  {
    id: 1,
    title: "Upon Waking",
    arabicTitle: "عند الاستيقاظ",
    arabic: "الحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur.",
    translation: "All praise is for Allah who gave us life after having taken it from us, and unto Him is the Resurrection.",
    reference: "Bukhari 11/113",
    count: 1
  },
  {
    id: 2,
    title: "Before Eating",
    arabicTitle: "قبل الطعام",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah.",
    translation: "In the name of Allah.",
    reference: "Tirmidhi 5/506",
    count: 1
  },
  {
    id: 3,
    title: "After Eating",
    arabicTitle: "بعد الطعام",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَٰذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    transliteration: "Alhamdu lillahil-ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah.",
    translation: "All praise is for Allah who fed me this and provided it for me without any might or power from myself.",
    reference: "Tirmidhi 5/507",
    count: 1
  },
  {
    id: 4,
    title: "Leaving Home",
    arabicTitle: "عند الخروج من المنزل",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Bismillah, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah.",
    translation: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.",
    reference: "Abu Dawud 4/325",
    count: 1
  },
  {
    id: 5,
    title: "Entering the Home",
    arabicTitle: "عند دخول المنزل",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Allahi rabbina tawakkalna.",
    translation: "In the name of Allah we enter and in the name of Allah we leave, and upon our Lord we place our trust.",
    reference: "Abu Dawud 4/325",
    count: 1
  },
  {
    id: 6,
    title: "Entering the Mosque",
    arabicTitle: "عند دخول المسجد",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    transliteration: "Allahumma-ftah li abwaba rahmatik.",
    translation: "O Allah, open the gates of Your mercy for me.",
    reference: "Muslim 1/494",
    count: 1
  },
  {
    id: 7,
    title: "Leaving the Mosque",
    arabicTitle: "عند الخروج من المسجد",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    transliteration: "Allahumma inni as'aluka min fadlik.",
    translation: "O Allah, I ask You from Your favor.",
    reference: "Muslim 1/494",
    count: 1
  },
  {
    id: 8,
    title: "Entering the Bathroom",
    arabicTitle: "عند دخول الخلاء",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    transliteration: "Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith.",
    translation: "O Allah, I seek refuge in You from the male and female evil jinn.",
    reference: "Bukhari 1/45, Muslim 1/283",
    count: 1
  }
];

export const azkarCategories: AzkarCategory[] = [
  {
    id: "morning",
    name: "Morning Azkar",
    arabicName: "أذكار الصباح",
    icon: "☀️",
    azkar: morningAzkar
  },
  {
    id: "evening",
    name: "Evening Azkar",
    arabicName: "أذكار المساء",
    icon: "🌙",
    azkar: eveningAzkar
  },
  {
    id: "daily",
    name: "Daily Supplications",
    arabicName: "الأذكار اليومية",
    icon: "📿",
    azkar: dailySupplications
  }
];
