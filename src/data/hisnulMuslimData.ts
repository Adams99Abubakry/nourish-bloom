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

// Duas for Anxiety and Sorrow
export const anxietyDuas: Azkar[] = [
  { id: 1, title: "Dua for Anxiety", arabicTitle: "دعاء الهم والحزن", arabic: "اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ، سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي", transliteration: "Allahumma inni 'abduka, ibnu 'abdika, ibnu amatika, nasiyati biyadika, madin fiyya hukmuka, 'adlun fiyya qada'uka, as'aluka bi-kulli ismin huwa laka, sammayta bihi nafsaka, aw anzaltahu fi kitabika, aw 'allamtahu ahadan min khalqika, aw ista'tharta bihi fi 'ilmil-ghaybi 'indaka, an taj'alal-Qur'ana rabi'a qalbi, wa nura sadri, wa jala'a huzni, wa dhahaba hammi.", translation: "O Allah, I am Your servant, son of Your servant, son of Your maidservant. My forelock is in Your hand. Your command concerning me prevails. Your decree concerning me is just. I ask You by every name that is Yours, that You named Yourself, revealed in Your Book, taught to any of Your creation, or kept with Yourself in the knowledge of the unseen, to make the Quran the spring of my heart, the light of my chest, the banisher of my sadness, and the reliever of my distress.", reference: "Ahmad 1/391", count: 1 },
  { id: 2, title: "Relief from Distress", arabicTitle: "دعاء الكرب", arabic: "لَا إِلَـٰهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَـٰهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَـٰهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ", transliteration: "La ilaha illallahul-'Adhimul-Halim. La ilaha illallahu Rabbul-'Arshil-'Adhim. La ilaha illallahu Rabbus-samawati wa Rabbul-ardi wa Rabbul-'Arshil-Karim.", translation: "There is no god but Allah, the Almighty, the Forbearing. There is no god but Allah, Lord of the Mighty Throne. There is no god but Allah, Lord of the heavens, Lord of the earth, and Lord of the Noble Throne.", reference: "Bukhari 8/154, Muslim 4/2092", count: 1 },
  { id: 3, title: "Dua of Yunus", arabicTitle: "دعاء يونس", arabic: "لَا إِلَـٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ", transliteration: "La ilaha illa Anta, subhanaka inni kuntu minadh-dhalimin.", translation: "There is no god but You. Glory be to You. Indeed, I have been of the wrongdoers.", reference: "Tirmidhi 5/529 - No Muslim makes this dua for anything except that Allah answers it", count: 3 },
  { id: 4, title: "When Overwhelmed", arabicTitle: "عند الهم الشديد", arabic: "اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ، لَا إِلَـٰهَ إِلَّا أَنْتَ", transliteration: "Allahumma rahmataka arju, fala takilni ila nafsi tarfata 'ayn, wa aslih li sha'ni kullahu, la ilaha illa Ant.", translation: "O Allah, it is Your mercy that I hope for, so do not leave me to myself even for the blink of an eye. Rectify all my affairs. There is no god but You.", reference: "Abu Dawud 4/324", count: 1 },
  { id: 5, title: "Dua in Difficulty", arabicTitle: "دعاء الشدة", arabic: "اللَّهُ اللَّهُ رَبِّي لَا أُشْرِكُ بِهِ شَيْئًا", transliteration: "Allahu Allahu Rabbi, la ushriku bihi shay'an.", translation: "Allah, Allah is my Lord, I do not associate anything with Him.", reference: "Abu Dawud 2/87", count: 1 },
];

// Duas for Forgiveness
export const forgivenessDuas: Azkar[] = [
  { id: 1, title: "Best Istighfar", arabicTitle: "أفضل الاستغفار", arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَـٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ", transliteration: "Astaghfirullaha al-'Adhim alladhi la ilaha illa Huwal-Hayyul-Qayyumu wa atubu ilayh.", translation: "I seek the forgiveness of Allah the Almighty, besides Whom there is no god, the Ever-Living, the Sustainer, and I repent to Him.", reference: "Abu Dawud, Tirmidhi", count: 3 },
  { id: 2, title: "Seeking Forgiveness for Parents", arabicTitle: "الاستغفار للوالدين", arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ", transliteration: "Rabbigh-fir li wa li-walidayya wa lil-mu'minina yawma yaqumul-hisab.", translation: "Our Lord, forgive me and my parents and the believers on the Day the account is established.", reference: "Quran 14:41", count: 1 },
  { id: 3, title: "Comprehensive Forgiveness", arabicTitle: "استغفار شامل", arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، دِقَّهُ وَجِلَّهُ، وَأَوَّلَهُ وَآخِرَهُ، وَعَلَانِيَتَهُ وَسِرَّهُ", transliteration: "Allahumma-ghfir li dhanbi kullahu, diqqahu wa jillahu, wa awwalahu wa akhirahu, wa 'alaniyyatahu wa sirrahu.", translation: "O Allah, forgive me all my sins, the small and the great, the first and the last, the open and the hidden.", reference: "Muslim 1/350", count: 1 },
];

// Duas for Marriage
export const marriageDuas: Azkar[] = [
  { id: 1, title: "For the Newlyweds", arabicTitle: "للعروسين", arabic: "بَارَكَ اللَّهُ لَكَ، وَبَارَكَ عَلَيْكَ، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ", transliteration: "Barakallahu laka, wa baraka 'alayka, wa jama'a baynakuma fi khayr.", translation: "May Allah bless you, bestow His blessings upon you, and unite you both in goodness.", reference: "Abu Dawud, Tirmidhi, Ibn Majah", count: 1 },
  { id: 2, title: "Wedding Night Dua", arabicTitle: "دعاء ليلة الزفاف", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ", transliteration: "Allahumma inni as'aluka khayraha wa khayra ma jabaltaha 'alayh, wa a'udhu bika min sharriha wa sharri ma jabaltaha 'alayh.", translation: "O Allah, I ask You for her good and the good You have instilled in her, and I seek refuge in You from her evil and the evil You have instilled in her.", reference: "Abu Dawud 2/248", count: 1 },
  { id: 3, title: "Before Intimacy", arabicTitle: "قبل الجماع", arabic: "بِسْمِ اللَّهِ، اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ، وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا", transliteration: "Bismillah, Allahumma jannibna ash-shaytan, wa jannibish-shaytana ma razaqtana.", translation: "In the name of Allah. O Allah, keep Satan away from us, and keep Satan away from what You bless us with.", reference: "Bukhari 6/141, Muslim 2/1028", count: 1 },
];

// Duas for Hajj and Umrah
export const hajjDuas: Azkar[] = [
  { id: 1, title: "Talbiyah", arabicTitle: "التلبية", arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ", transliteration: "Labbayk Allahumma labbayk, labbayk la sharika laka labbayk, innal-hamda wan-ni'mata laka wal-mulk, la sharika lak.", translation: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise, grace, and dominion are Yours. You have no partner.", reference: "Bukhari 3/408, Muslim 2/841", count: 1 },
  { id: 2, title: "Between Rukn and Hajar", arabicTitle: "بين الركن اليماني والحجر الأسود", arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.", translation: "Our Lord, give us good in this world and good in the Hereafter, and save us from the punishment of the Fire.", reference: "Quran 2:201, Abu Dawud 2/179", count: 1 },
  { id: 3, title: "On Mount Safa and Marwa", arabicTitle: "على الصفا والمروة", arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ، أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ", transliteration: "Innas-Safa wal-Marwata min sha'a'irillah. Abda'u bima bada'Allahu bih.", translation: "Indeed, Safa and Marwa are among the symbols of Allah. I begin with what Allah began with.", reference: "Muslim 2/888", count: 1 },
  { id: 4, title: "Day of Arafah", arabicTitle: "يوم عرفة", arabic: "لَا إِلَـٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu, wa Huwa 'ala kulli shay'in Qadir.", translation: "There is no god but Allah alone, with no partner. To Him belongs the dominion and all praise, and He is over all things omnipotent.", reference: "Tirmidhi 5/572 - Best dua is the dua of the Day of Arafah", count: 1 },
  { id: 5, title: "When Throwing Pebbles", arabicTitle: "عند رمي الجمار", arabic: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar.", translation: "Allah is the Greatest.", reference: "Muslim - Say with each pebble", count: 7 },
];

// Duas for the Deceased
export const deceasedDuas: Azkar[] = [
  { id: 1, title: "Upon Hearing of Death", arabicTitle: "عند سماع خبر الوفاة", arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ. اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا", transliteration: "Inna lillahi wa inna ilayhi raji'un. Allahumma-'jurni fi musibati wa akhlif li khayran minha.", translation: "Indeed we belong to Allah and to Him we shall return. O Allah, reward me in my calamity and replace it with something better.", reference: "Muslim 2/632", count: 1 },
  { id: 2, title: "Janazah Prayer Dua", arabicTitle: "دعاء صلاة الجنازة", arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ", transliteration: "Allahumma-ghfir lahu warhamhu wa 'afihi wa'fu 'anhu, wa akrim nuzulahu wa wassi' mudkhalahu, waghsilhu bil-ma'i wath-thalji wal-barad, wa naqqihi minal-khataya kama naqqaytath-thawbal-abyada minad-danas.", translation: "O Allah, forgive him, have mercy on him, grant him well-being, pardon him, make his entrance honorable, broaden his grave, wash him with water, snow, and hail, and purify him from sins as You purify a white garment from filth.", reference: "Muslim 2/663", count: 1 },
  { id: 3, title: "For the Deceased Child", arabicTitle: "للطفل المتوفى", arabic: "اللَّهُمَّ اجْعَلْهُ فَرَطًا وَذُخْرًا لِوَالِدَيْهِ، وَشَفِيعًا مُجَابًا", transliteration: "Allahumma-j'alhu faratan wa dhukhran li-walidayhi, wa shafi'an mujaban.", translation: "O Allah, make him a forerunner and a store of reward for his parents, and an intercessor whose prayer is answered.", reference: "Bukhari", count: 1 },
  { id: 4, title: "Visiting the Graveyard", arabicTitle: "عند زيارة القبور", arabic: "السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ، وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ، نَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ", transliteration: "As-salamu 'alaykum ahlad-diyari minal-mu'minina wal-muslimin, wa inna in sha'Allahu bikum lahiqun, nas'alullaha lana wa lakumul-'afiyah.", translation: "Peace be upon you, O inhabitants of these dwellings, from among the believers and Muslims. Indeed, if Allah wills, we will join you. We ask Allah for well-being for us and for you.", reference: "Muslim 2/671", count: 1 },
];

// Duas for Fasting
export const fastingDuas: Azkar[] = [
  { id: 1, title: "Intention for Fasting", arabicTitle: "نية الصيام", arabic: "نَوَيْتُ أَنْ أَصُومَ غَدًا مِنْ شَهْرِ رَمَضَانَ", transliteration: "Nawaytu an asuma ghadan min shahri Ramadan.", translation: "I intend to fast tomorrow in the month of Ramadan.", reference: "Abu Dawud, Nasai", count: 1 },
  { id: 2, title: "Breaking the Fast (Iftar)", arabicTitle: "عند الإفطار", arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ", transliteration: "Dhahaba-dh-dhama'u wab-tallati-l-'uruqu wa thabata-l-ajru in sha'Allah.", translation: "The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills.", reference: "Abu Dawud 2/306", count: 1 },
  { id: 3, title: "Dua When Fasting", arabicTitle: "دعاء الصائم", arabic: "اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ", transliteration: "Allahumma inni laka sumtu wa bika amantu wa 'ala rizqika aftartu.", translation: "O Allah, for You I have fasted, in You I have believed, and with Your provision I break my fast.", reference: "Abu Dawud", count: 1 },
  { id: 4, title: "When Invited to Eat While Fasting", arabicTitle: "إذا دُعي لطعام وهو صائم", arabic: "إِنِّي صَائِمٌ، إِنِّي صَائِمٌ", transliteration: "Inni sa'im, inni sa'im.", translation: "I am fasting, I am fasting.", reference: "Bukhari 4/118, Muslim 2/806", count: 2 },
];

// Duas for Sickness and Healing
export const healingDuas: Azkar[] = [
  { id: 1, title: "Visiting the Sick", arabicTitle: "عيادة المريض", arabic: "لَا بَأْسَ، طَهُورٌ إِنْ شَاءَ اللَّهُ", transliteration: "La ba'sa, tahurun in sha'Allah.", translation: "No harm, it is a purification, Allah willing.", reference: "Bukhari 7/11", count: 1 },
  { id: 2, title: "Dua for the Sick", arabicTitle: "دعاء للمريض", arabic: "أَذْهِبِ الْبَأْسَ رَبَّ النَّاسِ، اشْفِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا", transliteration: "Adh-hibil-ba'sa Rabban-nas, ishfi wa Antash-Shafi, la shifa'a illa shifa'uka, shifa'an la yughadiru saqaman.", translation: "Remove the affliction, O Lord of mankind. Heal, for You are the Healer. There is no healing but Your healing, a healing that leaves no sickness behind.", reference: "Bukhari 7/127, Muslim 4/1721", count: 3 },
  { id: 3, title: "Placing Hand on Pain", arabicTitle: "وضع اليد على مكان الألم", arabic: "بِسْمِ اللَّهِ (ثلاثًا)، أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ", transliteration: "Bismillah (3 times). A'udhu billahi wa qudratihi min sharri ma ajidu wa uhadhir.", translation: "In the name of Allah (3 times). I seek refuge in Allah and His power from the evil of what I feel and fear.", reference: "Muslim 4/1728", count: 7 },
  { id: 4, title: "Ruqyah", arabicTitle: "الرقية الشرعية", arabic: "بِسْمِ اللَّهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ، اللَّهُ يَشْفِيكَ، بِسْمِ اللَّهِ أَرْقِيكَ", transliteration: "Bismillahi arqika, min kulli shay'in yu'dhika, min sharri kulli nafsin aw 'ayni hasidin, Allahu yashfika, bismillahi arqika.", translation: "In the name of Allah I perform ruqyah for you. From everything that harms you, from the evil of every soul or envious eye, Allah heals you. In the name of Allah I perform ruqyah for you.", reference: "Muslim 4/1718", count: 1 },
];

// Duas for Protection
export const protectionDuas: Azkar[] = [
  { id: 1, title: "Protection from Evil Eye", arabicTitle: "الحماية من العين", arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ", transliteration: "A'udhu bi-kalimatillahit-tammati min kulli shaytanin wa hammah, wa min kulli 'aynin lammah.", translation: "I seek refuge in the perfect words of Allah from every devil and poisonous creature, and from every evil eye.", reference: "Bukhari 4/119", count: 1 },
  { id: 2, title: "Against Shaytan", arabicTitle: "ضد الشيطان", arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", transliteration: "A'udhu billahi minash-shaytanir-rajim.", translation: "I seek refuge in Allah from the accursed Satan.", reference: "Bukhari, Muslim", count: 1 },
  { id: 3, title: "When Entering the Restroom", arabicTitle: "عند دخول الخلاء", arabic: "بِسْمِ اللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ", transliteration: "Bismillah, Allahumma inni a'udhu bika minal-khubthi wal-khaba'ith.", translation: "In the name of Allah. O Allah, I seek refuge in You from evil spirits, male and female.", reference: "Bukhari 1/45, Muslim 1/283", count: 1 },
  { id: 4, title: "Leaving the Restroom", arabicTitle: "عند الخروج من الخلاء", arabic: "غُفْرَانَكَ", transliteration: "Ghufranaka.", translation: "I seek Your forgiveness.", reference: "Abu Dawud 1/30, Tirmidhi 1/18", count: 1 },
  { id: 5, title: "Protection from Jinn", arabicTitle: "الحماية من الجن", arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", transliteration: "A'udhu bi-kalimatillahit-tammati min sharri ma khalaq.", translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.", reference: "Muslim 4/2081", count: 3 },
];

// Duas for Children
export const childrenDuas: Azkar[] = [
  { id: 1, title: "For Your Children", arabicTitle: "لحفظ الأبناء", arabic: "أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ", transliteration: "U'idhukuma bi-kalimatillahit-tammati min kulli shaytanin wa hammah, wa min kulli 'aynin lammah.", translation: "I seek protection for you both in the perfect words of Allah from every devil and poisonous creature, and from every evil eye.", reference: "Bukhari 4/119 - Ibrahim (AS) used to seek protection for Isma'il and Ishaq", count: 1 },
  { id: 2, title: "For Righteous Offspring", arabicTitle: "للذرية الصالحة", arabic: "رَبِّ هَبْ لِي مِنَ الصَّالِحِينَ", transliteration: "Rabbi hab li minas-salihin.", translation: "My Lord, grant me [a child] from among the righteous.", reference: "Quran 37:100", count: 1 },
  { id: 3, title: "For Family", arabicTitle: "للأسرة", arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا", transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama.", translation: "Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us leaders of the righteous.", reference: "Quran 25:74", count: 1 },
];

// Duas for Seeking Knowledge
export const knowledgeDuas: Azkar[] = [
  { id: 1, title: "Increase Knowledge", arabicTitle: "زيادة العلم", arabic: "رَبِّ زِدْنِي عِلْمًا", transliteration: "Rabbi zidni 'ilma.", translation: "My Lord, increase me in knowledge.", reference: "Quran 20:114", count: 1 },
  { id: 2, title: "Beneficial Knowledge", arabicTitle: "العلم النافع", arabic: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي، وَعَلِّمْنِي مَا يَنْفَعُنِي، وَزِدْنِي عِلْمًا", transliteration: "Allahumma-nfa'ni bima 'allamtani, wa 'allimni ma yanfa'uni, wa zidni 'ilma.", translation: "O Allah, benefit me with what You have taught me, teach me what will benefit me, and increase me in knowledge.", reference: "Tirmidhi, Ibn Majah", count: 1 },
  { id: 3, title: "Before Studying", arabicTitle: "قبل الدراسة", arabic: "اللَّهُمَّ أَخْرِجْنِي مِنْ ظُلُمَاتِ الْوَهْمِ، وَأَكْرِمْنِي بِنُورِ الْفَهْمِ", transliteration: "Allahumma akhrijni min dhulumatil-wahm, wa akrimni bi-nuril-fahm.", translation: "O Allah, bring me out of the darkness of confusion and bless me with the light of understanding.", reference: "Scholarly tradition", count: 1 },
];

// Duas for Debt and Provision
export const provisionDuas: Azkar[] = [
  { id: 1, title: "Relief from Debt", arabicTitle: "تفريج الدين", arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ", transliteration: "Allahumma-kfini bi-halalika 'an haramik, wa aghnini bi-fadlika 'amman siwak.", translation: "O Allah, suffice me with what is lawful against what is forbidden, and make me independent of all others besides You.", reference: "Tirmidhi 5/560", count: 1 },
  { id: 2, title: "For Provision", arabicTitle: "طلب الرزق", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا", transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan.", translation: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.", reference: "Ibn Majah 1/152", count: 1 },
  { id: 3, title: "Against Debt", arabicTitle: "من كثرة الدين", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْمَأْثَمِ وَالْمَغْرَمِ", transliteration: "Allahumma inni a'udhu bika minal-ma'thami wal-maghram.", translation: "O Allah, I seek refuge in You from sin and from debt.", reference: "Bukhari 1/202, Muslim 1/412", count: 1 },
];

// Duas for Gratitude
export const gratitudeDuas: Azkar[] = [
  { id: 1, title: "Gratitude to Allah", arabicTitle: "الشكر لله", arabic: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ", transliteration: "Alhamdu lillahil-ladhi bi-ni'matihi tatimmus-salihat.", translation: "All praise is for Allah by whose favor good deeds are completed.", reference: "Ibn Majah, Hakim - Said when something good happens", count: 1 },
  { id: 2, title: "When Pleased", arabicTitle: "عند الفرح", arabic: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ", transliteration: "Alhamdu lillahil-ladhi bi-ni'matihi tatimmus-salihat.", translation: "All praise is for Allah by whose favor good deeds are completed.", reference: "Ibn As-Sunni", count: 1 },
  { id: 3, title: "When Displeased", arabicTitle: "عند عدم الرضا", arabic: "الْحَمْدُ لِلَّهِ عَلَى كُلِّ حَالٍ", transliteration: "Alhamdu lillahi 'ala kulli hal.", translation: "All praise is for Allah in every circumstance.", reference: "Ibn As-Sunni, Hakim", count: 1 },
];

// Duas for Safety in Travel
export const travelDuas: Azkar[] = [
  { id: 1, title: "Starting a Journey", arabicTitle: "بداية السفر", arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ", transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina la-munqalibun.", translation: "Glory be to Him who has subjected this to us, and we could never have accomplished this by ourselves. And to our Lord we will surely return.", reference: "Quran 43:13-14", count: 1 },
  { id: 2, title: "Entering a Town", arabicTitle: "عند دخول بلد", arabic: "اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَمَا أَظْلَلْنَ، وَرَبَّ الْأَرَضِينَ السَّبْعِ وَمَا أَقْلَلْنَ، وَرَبَّ الشَّيَاطِينِ وَمَا أَضْلَلْنَ، وَرَبَّ الرِّيَاحِ وَمَا ذَرَيْنَ، أَسْأَلُكَ خَيْرَ هَٰذِهِ الْقَرْيَةِ وَخَيْرَ أَهْلِهَا، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ أَهْلِهَا وَشَرِّ مَا فِيهَا", transliteration: "Allahumma Rabbas-samawatis-sab'i wa ma adhlalna, wa Rabbal-aradinas-sab'i wa ma aqlalna, wa Rabbash-shayatini wa ma adlalna, wa Rabbar-riyahi wa ma dharayna, as'aluka khayra hadhihil-qaryati wa khayra ahliha, wa a'udhu bika min sharriha wa sharri ahliha wa sharri ma fiha.", translation: "O Allah, Lord of the seven heavens and what they shade, Lord of the seven earths and what they carry, Lord of the devils and those they misguide, Lord of the winds and what they scatter; I ask You for the good of this town and the good of its people, and I seek refuge in You from its evil, the evil of its people, and the evil within it.", reference: "Hakim 2/100, Ibn As-Sunni", count: 1 },
  { id: 3, title: "Settling Somewhere", arabicTitle: "عند النزول منزلاً", arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", transliteration: "A'udhu bi-kalimatillahit-tammati min sharri ma khalaq.", translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.", reference: "Muslim 4/2080 - Nothing will harm whoever settles and says this", count: 1 },
];

// Duas for Parents
export const parentsDuas: Azkar[] = [
  { id: 1, title: "For Parents", arabicTitle: "للوالدين", arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا", transliteration: "Rabbir-hamhuma kama rabbayanee saghira.", translation: "My Lord, have mercy upon them as they brought me up when I was small.", reference: "Quran 17:24", count: 1 },
  { id: 2, title: "For Deceased Parents", arabicTitle: "للوالدين المتوفين", arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَنْ دَخَلَ بَيْتِيَ مُؤْمِنًا وَلِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ", transliteration: "Rabbigh-fir li wa li-walidayya wa liman dakhala baytiya mu'minan wa lil-mu'minina wal-mu'minat.", translation: "My Lord, forgive me and my parents and whoever enters my house as a believer, and the believing men and believing women.", reference: "Quran 71:28", count: 1 },
];

// Istikhara Dua
export const istikharaDuas: Azkar[] = [
  { id: 1, title: "Salatul Istikhara", arabicTitle: "صلاة الاستخارة", arabic: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ. اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَٰذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ. وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَٰذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ", transliteration: "Allahumma inni astakhiruka bi-'ilmika, wa astaqdiruka bi-qudratika, wa as'aluka min fadlikal-'adhim, fa innaka taqdiru wa la aqdir, wa ta'lamu wa la a'lam, wa Anta 'allamul-ghuyub. Allahumma in kunta ta'lamu anna hadhal-amra khayrun li fi dini wa ma'ashi wa 'aqibati amri, faqdurhu li wa yassirhu li thumma barik li fih. Wa in kunta ta'lamu anna hadhal-amra sharrun li fi dini wa ma'ashi wa 'aqibati amri, fasrifhu 'anni wasrifni 'anhu, waqdur liyal-khayra haythu kana, thumma ardini bih.", translation: "O Allah, I seek Your guidance by virtue of Your knowledge, and Your ability by virtue of Your power, and I ask You of Your great bounty. You have power and I do not. You know and I do not, and You are the Knower of the unseen. O Allah, if You know this matter is good for me in my religion, livelihood, and the outcome of my affairs, then decree it for me, make it easy for me, and bless me in it. If You know this matter is bad for me in my religion, livelihood, and the outcome of my affairs, then turn it away from me and turn me away from it, and decree for me what is good wherever it may be, and make me pleased with it.", reference: "Bukhari 7/162", count: 1 },
];

// Dua for entering/leaving masjid
export const masjidDuas: Azkar[] = [
  { id: 1, title: "Entering the Masjid", arabicTitle: "عند دخول المسجد", arabic: "أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ. بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ. اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", transliteration: "A'udhu billahil-'Adhim, wa bi-wajhihil-Karim, wa sultanihil-qadim, minash-shaytanir-rajim. Bismillah, was-salatu was-salamu 'ala Rasulillah. Allahumma-ftah li abwaba rahmatik.", translation: "I seek refuge in Allah the Almighty, and in His noble face, and in His eternal authority, from the accursed Satan. In the name of Allah, and peace and blessings be upon the Messenger of Allah. O Allah, open for me the doors of Your mercy.", reference: "Abu Dawud, Ibn As-Sunni", count: 1 },
  { id: 2, title: "Leaving the Masjid", arabicTitle: "عند الخروج من المسجد", arabic: "بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ. اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ", transliteration: "Bismillah, was-salatu was-salamu 'ala Rasulillah. Allahumma inni as'aluka min fadlik.", translation: "In the name of Allah, and peace and blessings be upon the Messenger of Allah. O Allah, I ask of You from Your bounty.", reference: "Muslim 1/494", count: 1 },
];

// Quranic Duas
export const quranicDuas: Azkar[] = [
  { id: 1, title: "Dua of Adam (AS)", arabicTitle: "دعاء آدم عليه السلام", arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ", transliteration: "Rabbana dhalamna anfusana wa in lam taghfir lana wa tarhamna la-nakunanna minal-khasirin.", translation: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.", reference: "Quran 7:23", count: 1 },
  { id: 2, title: "Dua of Ibrahim (AS)", arabicTitle: "دعاء إبراهيم عليه السلام", arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ", transliteration: "Rabbij-'alni muqimas-salati wa min dhurriyyati. Rabbana wa taqabbal du'a'.", translation: "My Lord, make me an establisher of prayer, and from my descendants. Our Lord, and accept my supplication.", reference: "Quran 14:40", count: 1 },
  { id: 3, title: "Dua of Musa (AS)", arabicTitle: "دعاء موسى عليه السلام", arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي", transliteration: "Rabbish-rah li sadri, wa yassir li amri, wahlul 'uqdatan min lisani, yafqahu qawli.", translation: "My Lord, expand for me my chest, ease my task for me, and untie the knot from my tongue, so that they may understand my speech.", reference: "Quran 20:25-28", count: 1 },
  { id: 4, title: "Dua of Sulayman (AS)", arabicTitle: "دعاء سليمان عليه السلام", arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ", transliteration: "Rabbi awzi'ni an ashkura ni'matakal-lati an'amta 'alayya wa 'ala walidayya wa an a'mala salihan tardahu wa adkhilni bi-rahmatika fi 'ibadikassalihin.", translation: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents, and to do righteousness of which You approve, and admit me by Your mercy among Your righteous servants.", reference: "Quran 27:19", count: 1 },
  { id: 5, title: "Dua of Ayyub (AS)", arabicTitle: "دعاء أيوب عليه السلام", arabic: "أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ", transliteration: "Anni massaniyadh-dhurru wa Anta arhamur-rahimin.", translation: "Indeed, adversity has touched me, and You are the Most Merciful of the merciful.", reference: "Quran 21:83", count: 1 },
  { id: 6, title: "Dua of Zakariyya (AS)", arabicTitle: "دعاء زكريا عليه السلام", arabic: "رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ", transliteration: "Rabbi la tadharni fardan wa Anta khayrul-warithin.", translation: "My Lord, do not leave me alone [with no heir], while You are the best of inheritors.", reference: "Quran 21:89", count: 1 },
];

// Comprehensive Duas for various occasions
export const variousDuas: Azkar[] = [
  { id: 1, title: "When Angry", arabicTitle: "عند الغضب", arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", transliteration: "A'udhu billahi minash-shaytanir-rajim.", translation: "I seek refuge in Allah from the accursed Satan.", reference: "Bukhari 7/99, Muslim 4/2015", count: 1 },
  { id: 2, title: "When Seeing Something You Like", arabicTitle: "عند رؤية ما يعجبك", arabic: "مَا شَاءَ اللَّهُ لَا قُوَّةَ إِلَّا بِاللَّهِ", transliteration: "Ma sha'Allah, la quwwata illa billah.", translation: "What Allah has willed [has occurred]; there is no power except with Allah.", reference: "Quran 18:39, Bukhari", count: 1 },
  { id: 3, title: "When Scared", arabicTitle: "عند الخوف", arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", transliteration: "Hasbunallahu wa ni'mal-wakil.", translation: "Sufficient for us is Allah, and [He is] the best Disposer of affairs.", reference: "Quran 3:173, Bukhari 5/172", count: 1 },
  { id: 4, title: "During Eclipse", arabicTitle: "عند الكسوف", arabic: "اللَّهُ أَكْبَرُ، أَعُوذُ بِاللَّهِ مِنْ عَذَابِ الْقَبْرِ", transliteration: "Allahu Akbar. A'udhu billahi min 'adhabil-qabr.", translation: "Allah is the Greatest. I seek refuge in Allah from the punishment of the grave.", reference: "Bukhari 2/30", count: 1 },
  { id: 5, title: "For Guidance", arabicTitle: "طلب الهداية", arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي", transliteration: "Allahumma-hdini wa saddidni.", translation: "O Allah, guide me and keep me on the right path.", reference: "Muslim 4/2090", count: 1 },
  { id: 6, title: "When Hearing Good News", arabicTitle: "عند سماع خبر سار", arabic: "الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ", transliteration: "Alhamdu lillahil-ladhi bi-ni'matihi tatimmus-salihat.", translation: "All praise is for Allah by whose favor good deeds are completed.", reference: "Ibn Majah", count: 1 },
  { id: 7, title: "When Hearing Bad News", arabicTitle: "عند سماع خبر سيئ", arabic: "الْحَمْدُ لِلَّهِ عَلَى كُلِّ حَالٍ", transliteration: "Alhamdu lillahi 'ala kulli hal.", translation: "All praise is for Allah in every circumstance.", reference: "Ibn As-Sunni", count: 1 },
  { id: 8, title: "For Steadfastness", arabicTitle: "للثبات", arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ", transliteration: "Ya Muqallibal-qulubi thabbit qalbi 'ala dinik.", translation: "O Turner of hearts, keep my heart firm upon Your religion.", reference: "Tirmidhi 5/538", count: 3 },
];

export const azkarCategories: AzkarCategory[] = [
  { id: "morning", name: "Morning Azkar", arabicName: "أذكار الصباح", icon: "☀️", azkar: morningAzkar },
  { id: "evening", name: "Evening Azkar", arabicName: "أذكار المساء", icon: "🌙", azkar: eveningAzkar },
  { id: "daily", name: "Daily Supplications", arabicName: "الأذكار اليومية", icon: "📿", azkar: dailySupplications },
  { id: "sleep", name: "Sleep Supplications", arabicName: "أذكار النوم", icon: "😴", azkar: sleepSupplications },
  { id: "prayer", name: "After Prayer", arabicName: "أذكار بعد الصلاة", icon: "🕌", azkar: afterPrayerAzkar },
  { id: "anxiety", name: "Anxiety & Distress", arabicName: "أدعية الهم والكرب", icon: "💚", azkar: anxietyDuas },
  { id: "forgiveness", name: "Seeking Forgiveness", arabicName: "أدعية الاستغفار", icon: "🤲", azkar: forgivenessDuas },
  { id: "marriage", name: "Marriage Duas", arabicName: "أدعية الزواج", icon: "💍", azkar: marriageDuas },
  { id: "hajj", name: "Hajj & Umrah", arabicName: "أدعية الحج والعمرة", icon: "🕋", azkar: hajjDuas },
  { id: "deceased", name: "For the Deceased", arabicName: "أدعية الميت", icon: "🌿", azkar: deceasedDuas },
  { id: "fasting", name: "Fasting Duas", arabicName: "أدعية الصيام", icon: "🌅", azkar: fastingDuas },
  { id: "healing", name: "Sickness & Healing", arabicName: "أدعية المرض والشفاء", icon: "🏥", azkar: healingDuas },
  { id: "protection", name: "Protection Duas", arabicName: "أدعية الحماية", icon: "🛡️", azkar: protectionDuas },
  { id: "children", name: "Children & Family", arabicName: "أدعية الأبناء والأسرة", icon: "👨‍👩‍👧‍👦", azkar: childrenDuas },
  { id: "knowledge", name: "Seeking Knowledge", arabicName: "أدعية طلب العلم", icon: "📚", azkar: knowledgeDuas },
  { id: "provision", name: "Debt & Provision", arabicName: "أدعية الرزق والدين", icon: "💰", azkar: provisionDuas },
  { id: "gratitude", name: "Gratitude", arabicName: "أدعية الشكر", icon: "🙏", azkar: gratitudeDuas },
  { id: "travel", name: "Travel Duas", arabicName: "أدعية السفر", icon: "✈️", azkar: travelDuas },
  { id: "parents", name: "For Parents", arabicName: "أدعية للوالدين", icon: "❤️", azkar: parentsDuas },
  { id: "istikhara", name: "Istikhara", arabicName: "صلاة الاستخارة", icon: "🌟", azkar: istikharaDuas },
  { id: "masjid", name: "Masjid Duas", arabicName: "أدعية المسجد", icon: "🕌", azkar: masjidDuas },
  { id: "quran", name: "Quranic Duas", arabicName: "أدعية قرآنية", icon: "📖", azkar: quranicDuas },
  { id: "various", name: "Various Occasions", arabicName: "أدعية متنوعة", icon: "⭐", azkar: variousDuas },
];
