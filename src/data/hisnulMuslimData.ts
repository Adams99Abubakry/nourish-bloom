// Comprehensive Hisnul Muslim (Fortress of the Muslim) Azkar Collection
// Complete authentic collection from the book by Sa'id bin Wahf Al-Qahtani

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

// Morning Azkar (أذكار الصباح) - Complete Collection
export const morningAzkar: Azkar[] = [
  {
    id: 1,
    title: "Ayat Al-Kursi",
    arabicTitle: "آية الكرسي",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum. Wa la yuhituna bi-shay'im-min 'ilmihi illa bima sha'. Wasi'a kursiyyuhus-samawati wal-ard. Wa la ya'uduhu hifduhuma. Wa Huwal-'Aliyyul-'Adhim.",
    translation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
    reference: "Al-Baqarah 2:255 - Whoever recites this in the morning will be protected until evening",
    count: 1
  },
  {
    id: 2,
    title: "Surah Al-Ikhlas",
    arabicTitle: "سورة الإخلاص",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
    transliteration: "Qul Huwa Allahu Ahad. Allahus-Samad. Lam yalid wa lam yulad. Wa lam yakun lahu kufuwan ahad.",
    translation: "Say, 'He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent.'",
    reference: "Surah Al-Ikhlas 112:1-4 - Recite 3 times for protection",
    count: 3
  },
  {
    id: 3,
    title: "Surah Al-Falaq",
    arabicTitle: "سورة الفلق",
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    transliteration: "Qul a'udhu bi-Rabbil-Falaq. Min sharri ma khalaq. Wa min sharri ghasiqin idha waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin idha hasad.",
    translation: "Say, 'I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies.'",
    reference: "Surah Al-Falaq 113:1-5 - Protection from evil",
    count: 3
  },
  {
    id: 4,
    title: "Surah An-Nas",
    arabicTitle: "سورة الناس",
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
    transliteration: "Qul a'udhu bi-Rabbin-Nas. Malikin-Nas. Ilahin-Nas. Min sharril-waswasil-khannas. Alladhi yuwaswisu fi sudurin-nas. Minal-jinnati wan-nas.",
    translation: "Say, 'I seek refuge in the Lord of mankind. The Sovereign of mankind. The God of mankind. From the evil of the retreating whisperer. Who whispers into the breasts of mankind. From among the jinn and mankind.'",
    reference: "Surah An-Nas 114:1-6 - Protection from whispering evil",
    count: 3
  },
  {
    id: 5,
    title: "Morning Supplication",
    arabicTitle: "دعاء الصباح",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَـٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ. رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ. رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
    transliteration: "Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa Huwa 'ala kulli shay'in Qadir. Rabbi as'aluka khayra ma fi hadhal-yawmi wa khayra ma ba'dahu, wa a'udhu bika min sharri ma fi hadhal-yawmi wa sharri ma ba'dahu. Rabbi a'udhu bika minal-kasali wa su'il-kibar. Rabbi a'udhu bika min 'adhabin fin-nari wa 'adhabin fil-qabr.",
    translation: "We have reached the morning and at this very time the whole kingdom belongs to Allah. All praise is due to Allah. There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him is all praise, and He is over all things omnipotent. My Lord, I ask You for the good of this day and the good of what follows it, and I seek refuge in You from the evil of this day and the evil of what follows it. My Lord, I seek refuge in You from laziness and evil old age. My Lord, I seek refuge in You from punishment in the Fire and punishment in the grave.",
    reference: "Muslim 4/2088",
    count: 1
  },
  {
    id: 6,
    title: "Sayyid Al-Istighfar (Master of Seeking Forgiveness)",
    arabicTitle: "سيد الاستغفار",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَـٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bi ni'matika 'alayya, wa abu'u bi dhanbi faghfir li fa innahu la yaghfirudh-dhunuba illa Anta.",
    translation: "O Allah, You are my Lord. There is no god but You. You created me and I am Your slave. I keep my covenant with You and my pledge to You as much as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your blessings upon me, and I acknowledge my sins. So forgive me, for there is none who forgives sins except You.",
    reference: "Bukhari 7/150 - Whoever says this with conviction in the morning and dies before evening will enter Paradise",
    count: 1
  },
  {
    id: 7,
    title: "Seeking Allah's Pleasure",
    arabicTitle: "الرضا بالله ربًا",
    arabic: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
    transliteration: "Raditu billahi Rabban, wa bil-Islami dinan, wa bi-Muhammadin sallallahu 'alayhi wa sallama nabiyyan.",
    translation: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace be upon him) as my Prophet.",
    reference: "Abu Dawud 4/318 - Paradise becomes obligatory for whoever says this three times in the morning",
    count: 3
  },
  {
    id: 8,
    title: "SubhanAllah wa Bihamdihi",
    arabicTitle: "سبحان الله وبحمده",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: "SubhanAllahi wa bihamdihi.",
    translation: "Glory is to Allah and praise is to Him.",
    reference: "Muslim 4/2071 - Sins forgiven even if like the foam of the sea",
    count: 100
  },
  {
    id: 9,
    title: "La ilaha illallah",
    arabicTitle: "لا إله إلا الله",
    arabic: "لَا إِلَـٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu, wa Huwa 'ala kulli shay'in Qadir.",
    translation: "There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him is all praise, and He is over all things omnipotent.",
    reference: "Bukhari 4/95 - Ten times equals freeing four slaves from Isma'il's descendants",
    count: 10
  },
  {
    id: 10,
    title: "SubhanAllahi wa Bihamdihi Adada Khalqihi",
    arabicTitle: "سبحان الله وبحمده عدد خلقه",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ",
    transliteration: "SubhanAllahi wa bihamdihi 'adada khalqihi, wa rida nafsihi, wa zinata 'arshihi, wa midada kalimatihi.",
    translation: "Glory is to Allah and praise is to Him, as many times as the number of His creatures, as much as pleases Him, as much as the weight of His Throne, and as much as the ink of His words.",
    reference: "Muslim 4/2090 - This dhikr outweighs all others",
    count: 3
  },
  {
    id: 11,
    title: "Seeking Protection",
    arabicTitle: "طلب الحماية",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي",
    transliteration: "Allahumma inni as'alukal-'afiyata fid-dunya wal-akhirah. Allahumma inni as'alukal-'afwa wal-'afiyata fi dini wa dunyaya wa ahli wa mali. Allahummas-tur 'awrati wa amin raw'ati. Allahumma-hfadhni min bayni yadayya, wa min khalfi, wa 'an yamini, wa 'an shimali, wa min fawqi, wa a'udhu bi'adhamatika an ughtala min tahti.",
    translation: "O Allah, I ask You for well-being in this world and the Hereafter. O Allah, I ask You for pardon and well-being in my religion, my worldly life, my family and my wealth. O Allah, conceal my faults and calm my fears. O Allah, protect me from in front of me and from behind me, from my right and from my left, and from above me. I seek refuge in Your Greatness from being swallowed up from beneath me.",
    reference: "Abu Dawud 4/324, Ibn Majah 2/332",
    count: 1
  },
  {
    id: 12,
    title: "Trust in Allah",
    arabicTitle: "التوكل على الله",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Bismillahi tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah.",
    translation: "In the name of Allah, I place my trust in Allah, there is no power and no strength except with Allah.",
    reference: "Abu Dawud 4/325 - Said when leaving the house",
    count: 1
  },
  {
    id: 13,
    title: "Seeking Refuge from Disbelief",
    arabicTitle: "الاستعاذة من الكفر والفقر",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَـٰهَ إِلَّا أَنْتَ",
    transliteration: "Allahumma inni a'udhu bika minal-kufri wal-faqr, wa a'udhu bika min 'adhabil-qabr, la ilaha illa Anta.",
    translation: "O Allah, I seek refuge in You from disbelief and poverty, and I seek refuge in You from the punishment of the grave. There is no god but You.",
    reference: "Abu Dawud 4/324, Nasai",
    count: 3
  },
  {
    id: 14,
    title: "O Ever-Living, O Sustainer",
    arabicTitle: "يا حي يا قيوم",
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
    transliteration: "Ya Hayyu ya Qayyumu bi-rahmatika astaghithu, aslih li sha'ni kullahu, wa la takilni ila nafsi tarfata 'ayn.",
    translation: "O Ever-Living, O Sustainer! By Your mercy I seek help. Rectify all my affairs and do not leave me to myself even for the blink of an eye.",
    reference: "Hakim 1/545",
    count: 3
  },
  {
    id: 15,
    title: "We Rise Upon the Fitrah",
    arabicTitle: "أصبحنا على فطرة الإسلام",
    arabic: "أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
    transliteration: "Asbahna 'ala fitratil-Islam, wa 'ala kalimatil-ikhlas, wa 'ala dini nabiyyina Muhammadin sallallahu 'alayhi wa sallam, wa 'ala millati abina Ibrahima hanifan musliman wa ma kana minal-mushrikin.",
    translation: "We rise upon the fitrah (natural disposition) of Islam, upon the word of sincerity, upon the religion of our Prophet Muhammad (peace be upon him), and upon the way of our father Ibrahim, who was upright and Muslim, and was not of the polytheists.",
    reference: "Ahmad 3/406",
    count: 1
  },
  {
    id: 16,
    title: "SubhanAllah and Alhamdulillah",
    arabicTitle: "سبحان الله والحمد لله",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ",
    transliteration: "SubhanAllahi wa bihamdihi, 'adada khalqihi, wa rida nafsihi, wa zinata 'arshihi, wa midada kalimatihi.",
    translation: "Glory be to Allah and praise Him, as many times as the number of His creation, as much as pleases Him, as much as the weight of His Throne, and as much as the ink of His words.",
    reference: "Muslim 4/2090",
    count: 3
  },
  {
    id: 17,
    title: "Seeking Guidance",
    arabicTitle: "طلب الهداية",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
    transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan.",
    translation: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
    reference: "Ibn Majah 1/152 - Said after the morning prayer",
    count: 1
  },
  {
    id: 18,
    title: "Seeking Refuge from Laziness",
    arabicTitle: "الاستعاذة من الكسل",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wa a'udhu bika minal-'ajzi wal-kasal, wa a'udhu bika minal-jubni wal-bukhl, wa a'udhu bika min ghalabatid-dayni wa qahrir-rijal.",
    translation: "O Allah, I seek refuge in You from anxiety and grief, I seek refuge in You from inability and laziness, I seek refuge in You from cowardice and miserliness, and I seek refuge in You from being overcome by debt and being overpowered by men.",
    reference: "Abu Dawud 4/324",
    count: 3
  },
  {
    id: 19,
    title: "Seeking Sufficiency",
    arabicTitle: "طلب الكفاية",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
    transliteration: "Allahumma-kfini bi-halalika 'an haramik, wa aghnini bi-fadlika 'amman siwak.",
    translation: "O Allah, suffice me with what is lawful against what is forbidden, and make me independent of all others besides You.",
    reference: "Tirmidhi 5/560",
    count: 1
  },
  {
    id: 20,
    title: "Istighfar (Seeking Forgiveness)",
    arabicTitle: "الاستغفار",
    arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullaha wa atubu ilayh.",
    translation: "I seek Allah's forgiveness and turn to Him in repentance.",
    reference: "Bukhari 11/101 - The Prophet used to say this 100 times a day",
    count: 100
  }
];

// Evening Azkar (أذكار المساء) - Complete Collection
export const eveningAzkar: Azkar[] = [
  {
    id: 1,
    title: "Ayat Al-Kursi",
    arabicTitle: "آية الكرسي",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum...",
    translation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
    reference: "Al-Baqarah 2:255 - Whoever recites this in the evening will be protected until morning",
    count: 1
  },
  {
    id: 2,
    title: "Surah Al-Ikhlas",
    arabicTitle: "سورة الإخلاص",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
    transliteration: "Qul Huwa Allahu Ahad. Allahus-Samad. Lam yalid wa lam yulad. Wa lam yakun lahu kufuwan ahad.",
    translation: "Say, 'He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent.'",
    reference: "Surah Al-Ikhlas 112:1-4",
    count: 3
  },
  {
    id: 3,
    title: "Surah Al-Falaq",
    arabicTitle: "سورة الفلق",
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    transliteration: "Qul a'udhu bi-Rabbil-Falaq. Min sharri ma khalaq. Wa min sharri ghasiqin idha waqab. Wa min sharrin-naffathati fil-'uqad. Wa min sharri hasidin idha hasad.",
    translation: "Say, 'I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies.'",
    reference: "Surah Al-Falaq 113:1-5",
    count: 3
  },
  {
    id: 4,
    title: "Surah An-Nas",
    arabicTitle: "سورة الناس",
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
    transliteration: "Qul a'udhu bi-Rabbin-Nas. Malikin-Nas. Ilahin-Nas. Min sharril-waswasil-khannas. Alladhi yuwaswisu fi sudurin-nas. Minal-jinnati wan-nas.",
    translation: "Say, 'I seek refuge in the Lord of mankind. The Sovereign of mankind. The God of mankind. From the evil of the retreating whisperer. Who whispers into the breasts of mankind. From among the jinn and mankind.'",
    reference: "Surah An-Nas 114:1-6",
    count: 3
  },
  {
    id: 5,
    title: "Evening Supplication",
    arabicTitle: "دعاء المساء",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَـٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَٰذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَٰذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا. رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ. رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
    transliteration: "Amsayna wa amsal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa Huwa 'ala kulli shay'in Qadir. Rabbi as'aluka khayra ma fi hadhihil-laylati wa khayra ma ba'daha, wa a'udhu bika min sharri ma fi hadhihil-laylati wa sharri ma ba'daha. Rabbi a'udhu bika minal-kasali wa su'il-kibar. Rabbi a'udhu bika min 'adhabin fin-nari wa 'adhabin fil-qabr.",
    translation: "We have reached the evening and at this very time the whole kingdom belongs to Allah. All praise is due to Allah. There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him is all praise, and He is over all things omnipotent. My Lord, I ask You for the good of this night and the good of what follows it, and I seek refuge in You from the evil of this night and the evil of what follows it. My Lord, I seek refuge in You from laziness and evil old age. My Lord, I seek refuge in You from punishment in the Fire and punishment in the grave.",
    reference: "Muslim 4/2088",
    count: 1
  },
  {
    id: 6,
    title: "Sayyid Al-Istighfar",
    arabicTitle: "سيد الاستغفار",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَـٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bi ni'matika 'alayya, wa abu'u bi dhanbi faghfir li fa innahu la yaghfirudh-dhunuba illa Anta.",
    translation: "O Allah, You are my Lord. There is no god but You. You created me and I am Your slave. I keep my covenant with You and my pledge to You as much as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your blessings upon me, and I acknowledge my sins. So forgive me, for there is none who forgives sins except You.",
    reference: "Bukhari 7/150 - Whoever says this with conviction in the evening and dies before morning will enter Paradise",
    count: 1
  },
  {
    id: 7,
    title: "Seeking Allah's Pleasure",
    arabicTitle: "الرضا بالله ربًا",
    arabic: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
    transliteration: "Raditu billahi Rabban, wa bil-Islami dinan, wa bi-Muhammadin sallallahu 'alayhi wa sallama nabiyyan.",
    translation: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace be upon him) as my Prophet.",
    reference: "Abu Dawud 4/318",
    count: 3
  },
  {
    id: 8,
    title: "Evening Remembrance",
    arabicTitle: "ذكر المساء",
    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
    transliteration: "Allahumma bika amsayna wa bika asbahna, wa bika nahya wa bika namutu, wa ilaykal-masir.",
    translation: "O Allah, by Your leave we have reached the evening and by Your leave we have reached the morning. By Your leave we live and die and to You is our return.",
    reference: "Tirmidhi 5/466",
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
    title: "Seeking Protection for Night",
    arabicTitle: "طلب الحماية للنوم",
    arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
    transliteration: "Allahumma qini 'adhabaka yawma tab'athu 'ibadak.",
    translation: "O Allah, protect me from Your punishment on the Day when You resurrect Your servants.",
    reference: "Abu Dawud 4/311",
    count: 3
  },
  {
    id: 12,
    title: "Seeking Protection from All Harm",
    arabicTitle: "الاستعاذة من كل شر",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bi-kalimatillahit-tammat min sharri ma khalaq.",
    translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
    reference: "Muslim 4/2081 - Whoever says this three times in the evening will not be harmed by any poisonous creature that night",
    count: 3
  },
  {
    id: 13,
    title: "In the Name of Allah",
    arabicTitle: "بسم الله",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim.",
    translation: "In the name of Allah, with Whose name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, All-Knowing.",
    reference: "Abu Dawud 4/323, Tirmidhi 5/465 - Nothing will harm whoever says this three times in the evening",
    count: 3
  },
  {
    id: 14,
    title: "O Ever-Living, O Sustainer",
    arabicTitle: "يا حي يا قيوم",
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
    transliteration: "Ya Hayyu ya Qayyumu bi-rahmatika astaghithu, aslih li sha'ni kullahu, wa la takilni ila nafsi tarfata 'ayn.",
    translation: "O Ever-Living, O Sustainer! By Your mercy I seek help. Rectify all my affairs and do not leave me to myself even for the blink of an eye.",
    reference: "Hakim 1/545",
    count: 3
  },
  {
    id: 15,
    title: "Before Sleeping",
    arabicTitle: "قبل النوم",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya.",
    translation: "In Your name O Allah, I die and I live.",
    reference: "Bukhari 11/113",
    count: 1
  },
  {
    id: 16,
    title: "Last Two Verses of Al-Baqarah",
    arabicTitle: "آخر آيتين من سورة البقرة",
    arabic: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ. لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    transliteration: "Amanar-Rasulu bima unzila ilayhi mir-Rabbihi wal-mu'minun...",
    translation: "The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers, [saying], 'We make no distinction between any of His messengers.' And they say, 'We hear and we obey. [We seek] Your forgiveness, our Lord, and to You is the [final] destination.'",
    reference: "Bukhari, Muslim - Whoever recites these two verses at night, they will suffice him",
    count: 1
  },
  {
    id: 17,
    title: "Istighfar",
    arabicTitle: "الاستغفار",
    arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullaha wa atubu ilayh.",
    translation: "I seek Allah's forgiveness and turn to Him in repentance.",
    reference: "Bukhari 11/101",
    count: 100
  }
];

// Daily Supplications - Expanded Collection
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
    reference: "Tirmidhi 5/506 - If you forget, say: Bismillahi fi awwalihi wa akhirihi",
    count: 1
  },
  {
    id: 3,
    title: "After Eating",
    arabicTitle: "بعد الطعام",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَٰذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    transliteration: "Alhamdu lillahil-ladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah.",
    translation: "All praise is for Allah who fed me this and provided it for me without any might or power from myself.",
    reference: "Tirmidhi 5/507 - Past sins are forgiven for whoever says this",
    count: 1
  },
  {
    id: 4,
    title: "Leaving Home",
    arabicTitle: "عند الخروج من المنزل",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Bismillah, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah.",
    translation: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.",
    reference: "Abu Dawud 4/325 - You will be guided, sufficed, and protected",
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
    arabic: "أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ. بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ. اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    transliteration: "A'udhu billahil-'Adhim, wa bi-wajhihil-Karim, wa sultanihil-qadim, minash-Shaytanir-rajim. Bismillah, was-salatu was-salamu 'ala Rasulillah. Allahumma-ftah li abwaba rahmatik.",
    translation: "I seek refuge in Allah the Almighty, in His Noble Face, and in His eternal authority, from Satan the accursed. In the name of Allah, and peace and blessings be upon the Messenger of Allah. O Allah, open the gates of Your mercy for me.",
    reference: "Abu Dawud, Muslim 1/494",
    count: 1
  },
  {
    id: 7,
    title: "Leaving the Mosque",
    arabicTitle: "عند الخروج من المسجد",
    arabic: "بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ. اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ. اللَّهُمَّ اعْصِمْنِي مِنَ الشَّيْطَانِ الرَّجِيمِ",
    transliteration: "Bismillah was-salatu was-salamu 'ala Rasulillah. Allahumma inni as'aluka min fadlik. Allahumma-'simni minash-Shaytanir-rajim.",
    translation: "In the name of Allah, and peace and blessings be upon the Messenger of Allah. O Allah, I ask You from Your favor. O Allah, protect me from Satan the accursed.",
    reference: "Muslim 1/494, Ibn Majah",
    count: 1
  },
  {
    id: 8,
    title: "Entering the Bathroom",
    arabicTitle: "عند دخول الخلاء",
    arabic: "بِسْمِ اللَّهِ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    transliteration: "Bismillah. Allahumma inni a'udhu bika minal-khubuthi wal-khaba'ith.",
    translation: "In the name of Allah. O Allah, I seek refuge in You from the male and female evil jinn.",
    reference: "Bukhari 1/45, Muslim 1/283",
    count: 1
  },
  {
    id: 9,
    title: "Leaving the Bathroom",
    arabicTitle: "عند الخروج من الخلاء",
    arabic: "غُفْرَانَكَ",
    transliteration: "Ghufranaka.",
    translation: "I seek Your forgiveness.",
    reference: "Abu Dawud, Ibn Majah, Tirmidhi",
    count: 1
  },
  {
    id: 10,
    title: "Before Ablution",
    arabicTitle: "قبل الوضوء",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah.",
    translation: "In the name of Allah.",
    reference: "Abu Dawud, Ibn Majah, Ahmad",
    count: 1
  },
  {
    id: 11,
    title: "After Ablution",
    arabicTitle: "بعد الوضوء",
    arabic: "أَشْهَدُ أَنْ لَا إِلَـٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ، وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
    transliteration: "Ash-hadu an la ilaha illallahu wahdahu la sharika lahu, wa ash-hadu anna Muhammadan 'abduhu wa Rasuluh. Allahummaj-'alni minat-tawwabin, waj-'alni minal-mutatahhirin.",
    translation: "I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His slave and Messenger. O Allah, make me among those who repent and make me among those who purify themselves.",
    reference: "Muslim 1/209, Tirmidhi 1/78",
    count: 1
  },
  {
    id: 12,
    title: "Before Sleep",
    arabicTitle: "قبل النوم",
    arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
    transliteration: "Allahumma bismika amutu wa ahya.",
    translation: "O Allah, in Your name I die and I live.",
    reference: "Bukhari 11/113",
    count: 1
  },
  {
    id: 13,
    title: "When Wearing Clothes",
    arabicTitle: "عند لبس الثوب",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَٰذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    transliteration: "Alhamdu lillahil-ladhi kasani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah.",
    translation: "All praise is for Allah who clothed me with this and provided it for me without any might or power from myself.",
    reference: "Abu Dawud 4/41, Tirmidhi 5/476",
    count: 1
  },
  {
    id: 14,
    title: "When Wearing New Clothes",
    arabicTitle: "عند لبس الثوب الجديد",
    arabic: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ خَيْرَهُ وَخَيْرَ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
    transliteration: "Allahumma lakal-hamdu Anta kasawtanih, as'aluka khayrahu wa khayra ma suni'a lah, wa a'udhu bika min sharrihi wa sharri ma suni'a lah.",
    translation: "O Allah, all praise is for You. You have clothed me with it. I ask You for its good and the good for which it was made, and I seek refuge in You from its evil and the evil for which it was made.",
    reference: "Abu Dawud, Tirmidhi",
    count: 1
  },
  {
    id: 15,
    title: "Supplication for Someone Who Wears New Clothes",
    arabicTitle: "دعاء لمن لبس ثوبًا جديدًا",
    arabic: "تُبْلِي وَيُخْلِفُ اللَّهُ تَعَالَى",
    transliteration: "Tubli wa yukhliful-lahu ta'ala.",
    translation: "May you wear it out and Allah replace it.",
    reference: "Abu Dawud 4/41",
    count: 1
  },
  {
    id: 16,
    title: "When Entering the Marketplace",
    arabicTitle: "عند دخول السوق",
    arabic: "لَا إِلَـٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu, yuhyi wa yumit, wa Huwa Hayyun la yamut, bi-yadihil-khayr, wa Huwa 'ala kulli shay'in Qadir.",
    translation: "There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him is all praise. He gives life and causes death, and He is Ever-Living and does not die. In His hand is all good, and He is over all things omnipotent.",
    reference: "Tirmidhi 5/291 - A million good deeds are written for whoever says this when entering the market",
    count: 1
  },
  {
    id: 17,
    title: "When Looking in the Mirror",
    arabicTitle: "عند النظر في المرآة",
    arabic: "اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
    transliteration: "Allahumma Anta hassanta khalqi fa-hassin khuluqi.",
    translation: "O Allah, You have made my creation good, so make my character good.",
    reference: "Ahmad 1/403, Ibn Hibban",
    count: 1
  },
  {
    id: 18,
    title: "When Sneezing",
    arabicTitle: "عند العطاس",
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdu lillah.",
    translation: "All praise is for Allah.",
    reference: "Bukhari 7/125",
    count: 1
  },
  {
    id: 19,
    title: "Response to Someone Who Sneezes",
    arabicTitle: "الرد على العاطس",
    arabic: "يَرْحَمُكَ اللَّهُ",
    transliteration: "Yarhamukallah.",
    translation: "May Allah have mercy on you.",
    reference: "Bukhari 7/125",
    count: 1
  },
  {
    id: 20,
    title: "Sneezer's Response",
    arabicTitle: "رد العاطس",
    arabic: "يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ",
    transliteration: "Yahdikumullahu wa yuslihu balakum.",
    translation: "May Allah guide you and rectify your affairs.",
    reference: "Bukhari 7/125",
    count: 1
  },
  {
    id: 21,
    title: "When Riding a Vehicle",
    arabicTitle: "عند ركوب الدابة أو السيارة",
    arabic: "بِسْمِ اللَّهِ، الْحَمْدُ لِلَّهِ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ. الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، الْحَمْدُ لِلَّهِ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَكَ اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Bismillah, Alhamdulillah. Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina la-munqalibun. Alhamdulillah, Alhamdulillah, Alhamdulillah. Allahu Akbar, Allahu Akbar, Allahu Akbar. Subhanaka Allahumma inni dhalamtu nafsi faghfir li, fa-innahu la yaghfirudh-dhunuba illa Anta.",
    translation: "In the name of Allah. All praise is for Allah. Glory be to Him who has subjected this to us, and we could never have accomplished this [by ourselves]. And to our Lord we will surely return. All praise is for Allah, All praise is for Allah, All praise is for Allah. Allah is the Greatest, Allah is the Greatest, Allah is the Greatest. Glory be to You, O Allah, I have wronged myself, so forgive me, for none forgives sins except You.",
    reference: "Tirmidhi 5/501, Abu Dawud 3/34",
    count: 1
  },
  {
    id: 22,
    title: "Travel Supplication",
    arabicTitle: "دعاء السفر",
    arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَٰذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى. اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَٰذَا وَاطْوِ عَنَّا بُعْدَهُ. اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ",
    transliteration: "Allahumma inna nas'aluka fi safarina hadha-l-birra wat-taqwa, wa minal-'amali ma tarda. Allahumma hawwin 'alayna safarana hadha wat-wi 'anna bu'dah. Allahumma Antas-sahibu fis-safari, wal-khalifatu fil-ahl. Allahumma inni a'udhu bika min wa'tha'is-safari, wa ka'abatil-mandhari, wa su'il-munqalabi fil-mali wal-ahl.",
    translation: "O Allah, we ask You in this journey of ours for righteousness and piety, and for deeds that please You. O Allah, make this journey easy for us and fold up the distance for us. O Allah, You are the Companion on the journey and the Successor over the family. O Allah, I seek refuge in You from the hardships of travel, from a depressing sight, and from an evil return in wealth and family.",
    reference: "Muslim 2/978",
    count: 1
  },
  {
    id: 23,
    title: "When Returning from Travel",
    arabicTitle: "عند العودة من السفر",
    arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
    transliteration: "Ayibuna, ta'ibuna, 'abiduna, li-Rabbina hamidun.",
    translation: "We return, repenting, worshipping, and praising our Lord.",
    reference: "Bukhari 3/1118, Muslim 2/978",
    count: 1
  },
  {
    id: 24,
    title: "When It Rains",
    arabicTitle: "عند نزول المطر",
    arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
    transliteration: "Allahumma sayyiban nafi'an.",
    translation: "O Allah, [let it be] beneficial rain.",
    reference: "Bukhari 2/518",
    count: 1
  },
  {
    id: 25,
    title: "After Rain",
    arabicTitle: "بعد المطر",
    arabic: "مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ",
    transliteration: "Mutirna bi-fadlillahi wa rahmatihi.",
    translation: "We have been given rain by the grace and mercy of Allah.",
    reference: "Bukhari 2/518, Muslim 1/83",
    count: 1
  },
  {
    id: 26,
    title: "When Hearing Thunder",
    arabicTitle: "عند سماع الرعد",
    arabic: "سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ",
    transliteration: "Subhanal-ladhi yusabbihur-ra'du bi-hamdihi wal-mala'ikatu min khifatihi.",
    translation: "Glory be to Him Whom the thunder glorifies with His praise, and the angels out of fear of Him.",
    reference: "Muwatta Malik 2/992",
    count: 1
  },
  {
    id: 27,
    title: "During Strong Wind",
    arabicTitle: "عند الريح الشديدة",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيهَا وَخَيْرَ مَا أُرْسِلَتْ بِهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا وَشَرِّ مَا أُرْسِلَتْ بِهِ",
    transliteration: "Allahumma inni as'aluka khayraha wa khayra ma fiha wa khayra ma ursilat bih, wa a'udhu bika min sharriha wa sharri ma fiha wa sharri ma ursilat bih.",
    translation: "O Allah, I ask You for its good, the good within it, and the good it was sent with. I seek refuge in You from its evil, the evil within it, and the evil it was sent with.",
    reference: "Muslim 2/616, Bukhari 4/76",
    count: 1
  },
  {
    id: 28,
    title: "When Distressed",
    arabicTitle: "عند الكرب",
    arabic: "لَا إِلَـٰهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَـٰهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَـٰهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ",
    transliteration: "La ilaha illallahul-'Adhimul-Halim. La ilaha illallahu Rabbul-'Arshil-'Adhim. La ilaha illallahu Rabbus-samawati wa Rabbul-ardi wa Rabbul-'Arshil-Karim.",
    translation: "There is no god but Allah, the Almighty, the Forbearing. There is no god but Allah, Lord of the Mighty Throne. There is no god but Allah, Lord of the heavens, Lord of the earth, and Lord of the Noble Throne.",
    reference: "Bukhari 8/154, Muslim 4/2092",
    count: 1
  },
  {
    id: 29,
    title: "Upon Seeing Someone in Difficulty",
    arabicTitle: "عند رؤية مبتلى",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي مِمَّا ابْتَلَاكَ بِهِ وَفَضَّلَنِي عَلَى كَثِيرٍ مِمَّنْ خَلَقَ تَفْضِيلًا",
    transliteration: "Alhamdu lillahil-ladhi 'afani mimma-btalaka bihi wa faddalani 'ala kathirin mimman khalaqa tafdila.",
    translation: "All praise is for Allah who has spared me from what He has afflicted you with, and has preferred me over many of His creation.",
    reference: "Tirmidhi 5/493 - Say quietly so the afflicted person does not hear",
    count: 1
  },
  {
    id: 30,
    title: "When Visiting the Sick",
    arabicTitle: "عند زيارة المريض",
    arabic: "لَا بَأْسَ، طَهُورٌ إِنْ شَاءَ اللَّهُ",
    transliteration: "La ba'sa, tahurun in sha'Allah.",
    translation: "No harm, it is a purification, Allah willing.",
    reference: "Bukhari 7/11",
    count: 1
  }
];

// Sleep and Prayer Supplications
export const sleepSupplications: Azkar[] = [
  {
    id: 1,
    title: "Before Sleeping - Hands Dua",
    arabicTitle: "قبل النوم - النفث في اليدين",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
    transliteration: "Qul Huwa Allahu Ahad... Qul A'udhu bi-Rabbil-Falaq... Qul A'udhu bi-Rabbin-Nas",
    translation: "Recite Surah Al-Ikhlas, Al-Falaq, and An-Nas. Cup hands together, blow into them, and wipe over body.",
    reference: "Bukhari 9/62 - The Prophet would do this every night before sleeping",
    count: 3
  },
  {
    id: 2,
    title: "Ayat Al-Kursi Before Sleep",
    arabicTitle: "آية الكرسي قبل النوم",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum...",
    translation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence...",
    reference: "Bukhari 9/62 - A protector from Allah will guard you all night, and Satan will not come near you",
    count: 1
  },
  {
    id: 3,
    title: "Upon Waking at Night",
    arabicTitle: "عند التقلب ليلاً",
    arabic: "لَا إِلَـٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَـٰهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ. اللَّهُمَّ اغْفِرْ لِي",
    transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu, wa Huwa 'ala kulli shay'in Qadir. SubhanAllah, wal-hamdu lillah, wa la ilaha illallah, wallahu Akbar, wa la hawla wa la quwwata illa billahil-'Aliyyil-'Adhim. Allahumma-ghfir li.",
    translation: "There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him is all praise, and He is over all things omnipotent. Glory be to Allah, all praise is for Allah, there is no god but Allah, Allah is the Greatest, and there is no power or might except with Allah, the Most High, the Most Great. O Allah, forgive me.",
    reference: "Bukhari - Whoever says this upon waking at night and then supplicates, it will be answered",
    count: 1
  },
  {
    id: 4,
    title: "Dusting the Bed",
    arabicTitle: "عند الاضطجاع",
    arabic: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ، إِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
    transliteration: "Bismika Rabbi wada'tu janbi wa bika arfa'uh. In amsakta nafsi farhamha, wa in arsaltaha fahfadhha bima tahfadhu bihi 'ibadakas-salihin.",
    translation: "In Your name, my Lord, I lie down, and by You I rise. If You take my soul, have mercy on it, and if You release it, protect it as You protect Your righteous servants.",
    reference: "Bukhari 11/126, Muslim 4/2084",
    count: 1
  },
  {
    id: 5,
    title: "When Having Difficulty Sleeping",
    arabicTitle: "عند صعوبة النوم",
    arabic: "اللَّهُمَّ غَارَتِ النُّجُومُ، وَهَدَأَتِ الْعُيُونُ، وَأَنْتَ حَيٌّ قَيُّومٌ لَا تَأْخُذُكَ سِنَةٌ وَلَا نَوْمٌ، يَا حَيُّ يَا قَيُّومُ أَهْدِئْ لَيْلِي وَأَنِمْ عَيْنِي",
    transliteration: "Allahumma gharatin-nujum, wa hada'atil-'uyun, wa Anta Hayyun Qayyum, la ta'khudhuka sinatun wa la nawm, ya Hayyu ya Qayyum ahdi' layli wa anim 'ayni.",
    translation: "O Allah, the stars have set, and eyes have rested, and You are the Ever-Living, the Sustainer, who is not overtaken by slumber nor sleep. O Ever-Living, O Sustainer, calm my night and let my eyes sleep.",
    reference: "Ibn As-Sunni",
    count: 1
  }
];

// After Prayer Supplications
export const afterPrayerAzkar: Azkar[] = [
  {
    id: 1,
    title: "Istighfar After Prayer",
    arabicTitle: "الاستغفار بعد الصلاة",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah.",
    translation: "I seek Allah's forgiveness.",
    reference: "Muslim 1/414",
    count: 3
  },
  {
    id: 2,
    title: "Peace and Safety",
    arabicTitle: "اللهم أنت السلام",
    arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    transliteration: "Allahumma Antas-Salam, wa minkas-salam, tabarakta ya Dhal-Jalali wal-Ikram.",
    translation: "O Allah, You are Peace, and from You is peace. Blessed are You, O Possessor of Glory and Honor.",
    reference: "Muslim 1/414",
    count: 1
  },
  {
    id: 3,
    title: "Tasbih After Prayer",
    arabicTitle: "التسبيح بعد الصلاة",
    arabic: "سُبْحَانَ اللَّهِ، الْحَمْدُ لِلَّهِ، اللَّهُ أَكْبَرُ",
    transliteration: "SubhanAllah, Alhamdulillah, Allahu Akbar.",
    translation: "Glory be to Allah, All praise is for Allah, Allah is the Greatest.",
    reference: "Muslim 1/418 - 33 times each, then complete with La ilaha illallah",
    count: 33
  },
  {
    id: 4,
    title: "Completing the Tasbih",
    arabicTitle: "تمام المائة",
    arabic: "لَا إِلَـٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu, wa Huwa 'ala kulli shay'in Qadir.",
    translation: "There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him is all praise, and He is over all things omnipotent.",
    reference: "Muslim 1/418 - This completes 100; sins forgiven even if like the foam of the sea",
    count: 1
  },
  {
    id: 5,
    title: "Ayat Al-Kursi After Prayer",
    arabicTitle: "آية الكرسي بعد الصلاة",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...",
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum...",
    translation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence...",
    reference: "Nasai, Ibn Hibban - Nothing prevents the one who recites this after every prayer from entering Paradise except death",
    count: 1
  },
  {
    id: 6,
    title: "After Fajr and Maghrib",
    arabicTitle: "بعد صلاة الفجر والمغرب",
    arabic: "لَا إِلَـٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu, yuhyi wa yumit, wa Huwa 'ala kulli shay'in Qadir.",
    translation: "There is no god but Allah alone, with no partner. To Him belongs the dominion and to Him is all praise. He gives life and causes death, and He is over all things omnipotent.",
    reference: "Tirmidhi 5/515 - Say 10 times after Fajr and Maghrib",
    count: 10
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
  },
  {
    id: "sleep",
    name: "Sleep Supplications",
    arabicName: "أذكار النوم",
    icon: "😴",
    azkar: sleepSupplications
  },
  {
    id: "prayer",
    name: "After Prayer",
    arabicName: "أذكار بعد الصلاة",
    icon: "🕌",
    azkar: afterPrayerAzkar
  }
];
