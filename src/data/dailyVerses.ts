// Daily verses with moral lessons - changes based on the day of the year

export interface DailyVerseData {
  arabic: string;
  translation: string;
  reference: string;
  surah: number;
  ayah: number;
  moralLesson: string;
  theme: string;
}

export const dailyVerses: DailyVerseData[] = [
  {
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    translation: "And whoever relies upon Allah – then He is sufficient for him.",
    reference: "At-Talaq 65:3",
    surah: 65,
    ayah: 3,
    moralLesson: "True reliance on Allah brings peace and sufficiency. Trust Him while still taking the right means (effort, planning, seeking help), then leave the outcome to Him. When worries rise, return to dua, prayer, and gratitude—Allah is enough for every situation.",
    theme: "Trust in Allah"
  },
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Indeed, with hardship comes ease.",
    reference: "Ash-Sharh 94:6",
    surah: 94,
    ayah: 6,
    moralLesson: "Every difficulty is accompanied by relief—sometimes immediately, sometimes after growth and purification. This verse trains the heart to stay hopeful, keep doing what is right, and avoid panic decisions. Patience, sincere dua, and consistent worship are often the bridge to Allah’s ease.",
    theme: "Hope & Patience"
  },
  {
    arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ",
    translation: "And do not despair of relief from Allah.",
    reference: "Yusuf 12:87",
    surah: 12,
    ayah: 87,
    moralLesson: "Despair is forbidden in Islam because it assumes the door of Allah’s mercy is closed. No matter how dark the situation, keep turning back with repentance, dua, and small steady actions. Relief can come through unexpected people, new opportunities, or inner strength—Allah’s help is nearer than we think.",
    theme: "Never Despair"
  },
  {
    arabic: "فَإِنَّ ذِكْرَ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    translation: "Verily, in the remembrance of Allah do hearts find rest.",
    reference: "Ar-Ra'd 13:28",
    surah: 13,
    ayah: 28,
    moralLesson: "Inner peace comes through connecting with Allah—not through constant control of life’s outcomes. Regular dhikr, prayer, and Qur’an recitation calm the heart, reframe worries, and build resilience. Start with a small daily routine (morning/evening adhkar, a few minutes of Qur’an) and let consistency transform you.",
    theme: "Inner Peace"
  },
  {
    arabic: "وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ",
    translation: "And be patient, and your patience is not but through Allah.",
    reference: "An-Nahl 16:127",
    surah: 16,
    ayah: 127,
    moralLesson: "True patience is a gift from Allah, not just self-control. Ask Him for steadfastness, then practice patience by avoiding complaints that weaken faith and by continuing good deeds even when tired. Patience includes staying away from sin and keeping hope alive while you wait for Allah’s timing.",
    theme: "Patience"
  },
  {
    arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    translation: "And say, 'My Lord, increase me in knowledge.'",
    reference: "Ta-Ha 20:114",
    surah: 20,
    ayah: 114,
    moralLesson: "Seeking knowledge is a lifelong journey that begins with humility. Ask Allah to increase you in beneficial knowledge—knowledge that improves your worship, character, and service to others. Learn consistently (even a little daily), act on what you learn, and let knowledge soften the heart instead of inflating the ego.",
    theme: "Knowledge"
  },
  {
    arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ",
    translation: "And when My servants ask you concerning Me – indeed I am near.",
    reference: "Al-Baqarah 2:186",
    surah: 2,
    ayah: 186,
    moralLesson: "Allah is always near, hearing every sincere call—no intermediaries are needed. This should remove loneliness and shame: you can return to Him at any moment. Make dua with presence, repeat it with certainty, and understand that answers may come as what you asked, something better, or protection from harm.",
    theme: "Closeness to Allah"
  },
  {
    arabic: "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ",
    translation: "And We have not sent you except as a mercy to the worlds.",
    reference: "Al-Anbiya 21:107",
    surah: 21,
    ayah: 107,
    moralLesson: "The Prophet Muhammad ﷺ was sent as mercy, and following him means spreading mercy through character. Be gentle in speech, patient with people’s mistakes, and helpful without seeking praise. Mercy includes family, neighbors, strangers, and even animals—when mercy becomes a habit, Allah’s mercy descends upon you.",
    theme: "Mercy"
  },
  {
    arabic: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ",
    translation: "Indeed, Allah will not change the condition of a people until they change what is in themselves.",
    reference: "Ar-Ra'd 13:11",
    surah: 13,
    ayah: 11,
    moralLesson: "Change starts from within: beliefs, habits, and intentions. Ask yourself what needs correcting—prayer consistency, honesty, anger, time management—and take small practical steps. When individuals reform themselves sincerely, Allah opens doors for family and community change as well.",
    theme: "Self-Improvement"
  },
  {
    arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ",
    translation: "And cooperate in righteousness and piety.",
    reference: "Al-Ma'idah 5:2",
    surah: 5,
    ayah: 2,
    moralLesson: "Islam encourages collective good: help each other worship better, live cleaner, and serve more. Support others with reminders, resources, and sincere advice—without judgment. A strong community is built when we make it easier for people to do good and harder for them to fall into harm.",
    theme: "Community"
  },
  {
    arabic: "وَلَا تَمْشِ فِي الْأَرْضِ مَرَحًا",
    translation: "And do not walk upon the earth exultantly.",
    reference: "Al-Isra 17:37",
    surah: 17,
    ayah: 37,
    moralLesson: "Humility is a virtue and arrogance is a spiritual disease. Remember: every blessing—health, intelligence, wealth—can be taken away, so gratitude and modesty protect the heart. True greatness is honoring others, accepting advice, admitting mistakes, and recognizing Allah as the source of all success.",
    theme: "Humility"
  },
  {
    arabic: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا",
    translation: "And those who strive for Us – We will surely guide them to Our ways.",
    reference: "Al-Ankabut 29:69",
    surah: 29,
    ayah: 69,
    moralLesson: "Sincere effort for Allah brings guidance—especially when you struggle against your nafs (ego, laziness, temptations). Keep striving in worship, character, and lawful livelihood. When you take steps toward Allah, He opens doors of clarity, good company, and unexpected ease.",
    theme: "Striving"
  },
  {
    arabic: "وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ",
    translation: "And do good; indeed, Allah loves the doers of good.",
    reference: "Al-Baqarah 2:195",
    surah: 2,
    ayah: 195,
    moralLesson: "Ihsan means doing things beautifully as if you see Allah, and knowing He surely sees you. Improve the quality of prayer by slowing down and understanding what you recite. Bring excellence to work and relationships through honesty, consistency, and kindness—small upgrades done daily create a life Allah loves.",
    theme: "Excellence"
  },
  {
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
    translation: "O you who believe, seek help through patience and prayer.",
    reference: "Al-Baqarah 2:153",
    surah: 2,
    ayah: 153,
    moralLesson: "When life becomes heavy, patience and prayer become your strongest tools. Patience stops you from reacting in harmful ways; prayer reconnects you to Allah and restores perspective. Turn to salah first, then take practical steps—Islam teaches both spiritual reliance and responsible action.",
    theme: "Seeking Help"
  },
  {
    arabic: "وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ",
    translation: "Those who restrain anger and pardon the people.",
    reference: "Aal-E-Imran 3:134",
    surah: 3,
    ayah: 134,
    moralLesson: "Controlling anger and forgiving others are signs of taqwa. Anger often says more about our ego than the situation—pause, seek refuge with Allah, and choose a response that pleases Him. Forgiveness does not mean approving wrong; it means releasing hatred and seeking justice with wisdom.",
    theme: "Forgiveness"
  },
  {
    arabic: "وَاللَّهُ يُحِبُّ الصَّابِرِينَ",
    translation: "And Allah loves the steadfast.",
    reference: "Aal-E-Imran 3:146",
    surah: 3,
    ayah: 146,
    moralLesson: "Steadfastness earns Allah’s love: keep your faith and worship consistent through ease and hardship. Protect your iman with good company, regular Qur’an, and avoiding environments that weaken you. When you slip, return quickly—steadfastness is about direction, not perfection.",
    theme: "Steadfastness"
  },
  {
    arabic: "وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ",
    translation: "Establish prayer. Indeed, prayer prohibits immorality and wrongdoing.",
    reference: "Al-Ankabut 29:45",
    surah: 29,
    ayah: 45,
    moralLesson: "Prayer is a shield that trains the soul to resist immorality and wrongdoing. The effect increases when prayer is done on time, with focus, and with humility. Let salah shape your day: plan around it, protect it from distractions, and watch your character gradually improve.",
    theme: "Prayer"
  },
  {
    arabic: "وَلَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
    translation: "And do not despair of the mercy of Allah.",
    reference: "Az-Zumar 39:53",
    surah: 39,
    ayah: 53,
    moralLesson: "Allah’s mercy encompasses all things, and sincere repentance wipes away even major sins. Repent with regret, stop the sin, resolve not to return, and repair harms when possible. Never let shame keep you away from Allah—shame should push you toward Him, not away from Him.",
    theme: "Divine Mercy"
  },
  {
    arabic: "وَمَنْ أَحْسَنُ قَوْلًا مِّمَّن دَعَا إِلَى اللَّهِ",
    translation: "And who is better in speech than one who invites to Allah.",
    reference: "Fussilat 41:33",
    surah: 41,
    ayah: 33,
    moralLesson: "Inviting others to Allah is best speech when done with wisdom, gentleness, and sincerity. Your character is often the loudest dawah—be truthful, reliable, and compassionate. Speak in a way people can receive: choose good timing, avoid arguments, and make dua for their guidance.",
    theme: "Dawah"
  },
  {
    arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ",
    translation: "The believers are but brothers.",
    reference: "Al-Hujurat 49:10",
    surah: 49,
    ayah: 10,
    moralLesson: "Faith creates a bond stronger than blood: believers are family in purpose and destiny. Protect each other’s honor, remove jealousy, and make excuses for mistakes. Strengthen brotherhood through greetings, helping in hardship, and making dua for one another in private.",
    theme: "Brotherhood"
  },
  {
    arabic: "وَاذْكُرُوا اللَّهَ كَثِيرًا لَّعَلَّكُمْ تُفْلِحُونَ",
    translation: "And remember Allah often that you may succeed.",
    reference: "Al-Jumu'ah 62:10",
    surah: 62,
    ayah: 10,
    moralLesson: "Success in this life and the next is tied to frequent remembrance of Allah. Dhikr renews faith, calms anxiety, and keeps intentions sincere. Build a simple routine: morning/evening adhkar, tasbeeh after prayer, and a few minutes of istighfar—consistency beats intensity.",
    theme: "Remembrance"
  },
  {
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُبْطِلُوا صَدَقَاتِكُم بِالْمَنِّ وَالْأَذَىٰ",
    translation: "O you who believe, do not invalidate your charities with reminders or injury.",
    reference: "Al-Baqarah 2:264",
    surah: 2,
    ayah: 264,
    moralLesson: "Give charity purely for Allah’s sake, with humility and respect. Reminding others of your generosity, shaming them, or seeking status can destroy the reward. Give quietly when possible, protect the recipient’s dignity, and remember that Allah is the One you are truly trying to please.",
    theme: "Sincerity in Charity"
  },
  {
    arabic: "وَإِنَّ السَّاعَةَ لَآتِيَةٌ ۖ فَاصْفَحِ الصَّفْحَ الْجَمِيلَ",
    translation: "And indeed, the Hour is coming; so forgive with gracious forgiveness.",
    reference: "Al-Hijr 15:85",
    surah: 15,
    ayah: 85,
    moralLesson: "With the Day of Judgment approaching, choose forgiveness over grudges and resentment. Gracious forgiveness means letting go without insulting or humiliating the other person. This frees the heart, preserves relationships, and prepares you to meet Allah with a lighter record.",
    theme: "Gracious Forgiveness"
  },
  {
    arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا",
    translation: "And hold firmly to the rope of Allah all together and do not become divided.",
    reference: "Aal-E-Imran 3:103",
    surah: 3,
    ayah: 103,
    moralLesson: "Unity comes through holding firmly to Allah’s guidance and prioritizing shared essentials over ego and pride. Avoid gossip, factionalism, and unnecessary arguments that harden the heart. Seek unity through sincere advice, justice, and mercy—division weakens us all.",
    theme: "Unity"
  },
  {
    arabic: "وَقُولُوا لِلنَّاسِ حُسْنًا",
    translation: "And speak to people good words.",
    reference: "Al-Baqarah 2:83",
    surah: 2,
    ayah: 83,
    moralLesson: "Kind speech is a form of charity and a sign of a healthy heart. Choose words that heal rather than harm, and speak gently even when correcting mistakes. If you can’t say something good, silence can be worship—your tongue can be a path to Jannah or a cause of regret.",
    theme: "Kind Speech"
  },
  {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
    translation: "Our Lord, give us in this world good and in the Hereafter good.",
    reference: "Al-Baqarah 2:201",
    surah: 2,
    ayah: 201,
    moralLesson: "This dua teaches balance: we ask for goodness in the dunya and the akhirah, because Islam is not neglect of life nor obsession with it. Seek lawful success, health, and family harmony, but keep your heart attached to the hereafter. Make decisions that bring benefit now without sacrificing eternal success.",
    theme: "Balance"
  },
  {
    arabic: "وَسَارِعُوا إِلَىٰ مَغْفِرَةٍ مِّن رَّبِّكُمْ",
    translation: "And hasten to forgiveness from your Lord.",
    reference: "Aal-E-Imran 3:133",
    surah: 3,
    ayah: 133,
    moralLesson: "Don’t delay repentance; hearts harden with repeated sins and delayed turning back. Hasten to forgiveness by making istighfar, fixing what you can, and replacing bad habits with good ones. Allah loves those who return quickly—today can be the day your record changes.",
    theme: "Repentance"
  },
  {
    arabic: "وَاللَّهُ خَيْرُ الرَّازِقِينَ",
    translation: "And Allah is the best of providers.",
    reference: "Al-Jumu'ah 62:11",
    surah: 62,
    ayah: 11,
    moralLesson: "Trust in Allah’s provision while working honestly and avoiding haram. Provision is not only money—it can be contentment, good health, supportive people, and barakah in time. When fear of the future rises, remember the One who provided yesterday will provide tomorrow.",
    theme: "Divine Provision"
  },
  {
    arabic: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
    translation: "So which of the favors of your Lord would you deny?",
    reference: "Ar-Rahman 55:13",
    surah: 55,
    ayah: 13,
    moralLesson: "Count your blessings—Allah’s favors are countless, even the ones we overlook. Gratitude is shown by the heart (recognizing the Giver), the tongue (praise), and actions (using blessings in halal ways). The more you notice blessings, the more your heart becomes calm and hopeful.",
    theme: "Gratitude"
  },
  {
    arabic: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ",
    translation: "My success is only through Allah. Upon Him I have relied, and to Him I return.",
    reference: "Hud 11:88",
    surah: 11,
    ayah: 88,
    moralLesson: "All success comes from Allah alone; He is the One who grants ability, opportunity, and acceptance. Acknowledge Him when you achieve something, and return to Him when you struggle—both moments are tests. Reliance is not passive: work sincerely, stay humble, and keep making dua for a good ending.",
    theme: "Reliance on Allah"
  }
];

// Get verse for a specific day of the year
export const getDailyVerse = (): DailyVerseData => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Cycle through verses based on day of year
  const verseIndex = dayOfYear % dailyVerses.length;
  return dailyVerses[verseIndex];
};
