const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Seeding Connected"))
  .catch(err => console.log(err));

const seedDB = async () => {
    console.log('🧹 מוחק נתונים ישנים...');
    await User.deleteMany({}); // מחיקה מוחלטת של הכל

    const salt = await bcrypt.genSalt(10);
    // סיסמה גנרית למאמנים בלבד
    const coachPassword = await bcrypt.hash('123456', salt);

    const users = [];

    // --- יצירת צוות אימון ---
    users.push({ name: 'Head Coach', email: 'head@mars.com', password: coachPassword, role: 'head-coach' });
    users.push({ name: 'Assistant 1', email: 'asst1@mars.com', password: coachPassword, role: 'coach' });

    // --- הנתונים שלך (18 שחקנים) ---
    const playersRaw = [
        { "playerId": 21792, "name": "ג'ונתן מוטלי", "number": "0", "position": "פורוורד-סנטר", "height": "2.06", "birthDate": "04/05/1995", "imageUrl": "https://basket.co.il/pics/2025-2026/motley.jpg" },
        { "playerId": 21784, "name": "כריס ג'ונס", "number": "1", "position": "רכז", "height": "1.88", "birthDate": "10/04/1993", "imageUrl": "https://basket.co.il/pics/2025-2026/jones(1).jpg" },
        { "playerId": 21789, "name": "אנטוניו בלייקני", "number": "2", "position": "גארד", "height": "1.93", "birthDate": "04/10/1996", "imageUrl": "https://basket.co.il/pics/2025-2026/blakeny.jpg" },
        { "playerId": 21781, "name": "אלייז'ה בראיינט", "number": "3", "position": "גארד", "height": "1.96", "birthDate": "19/04/1995", "imageUrl": "https://basket.co.il/pics/2025-2026/bryantr.jpg" },
        { "playerId": 21787, "name": "איתי שגב", "number": "6", "position": "סנטר", "height": "2.04", "birthDate": "15/06/1995", "imageUrl": "https://basket.co.il/pics/2025-2026/segev.jpg" },
        { "playerId": 21793, "name": "גיא פלטין", "number": "9", "position": "גארד", "height": "1.92", "birthDate": "25/09/2000", "imageUrl": "https://basket.co.il/pics/2025-2026/palatin.jpg" },
        { "playerId": 21791, "name": "בר טימור", "number": "10", "position": "גארד", "height": "1.90", "birthDate": "02/03/1992", "imageUrl": "https://basket.co.il/pics/2025-2026/bar.jpg" },
        { "playerId": 21783, "name": "טיילר אניס", "number": "11", "position": "רכז", "height": "1.89", "birthDate": "24/08/1994", "imageUrl": "https://basket.co.il/pics/2025-2026/ennis.jpg" },
        { "playerId": 21794, "name": "עוז בלייזר", "number": "14", "position": "פורוורד", "height": "1.99", "birthDate": "29/12/1992", "imageUrl": "https://basket.co.il/pics/2025-2026/oz.jpg" },
        { "playerId": 21779, "name": "קולין מלקולם", "number": "17", "position": "פורוורד", "height": "2.01", "birthDate": "02/07/1997", "imageUrl": "https://basket.co.il/pics/2025-2026/colin.jpg" },
        { "playerId": 21777, "name": "טאי אודיאסי", "number": "21", "position": "סנטר", "height": "2.06", "birthDate": "21/09/1995", "imageUrl": "https://basket.co.il/pics/2025-2026/tai.jpg" },
        { "playerId": 21780, "name": "ואסיליה מיציץ'", "number": "22", "position": "רכז", "height": "1.96", "birthDate": "13/01/1994", "imageUrl": "https://basket.co.il/pics/2025-2026/micic.jpg" },
        { "playerId": 21795, "name": "איש וויינרייט", "number": "24", "position": "פורוורד", "height": "1.96", "birthDate": "12/09/1994", "imageUrl": "https://basket.co.il/pics/2025-2026/ish.jpg" },
        { "playerId": 21778, "name": "דן אוטורו", "number": "25", "position": "סנטר", "height": "2.08", "birthDate": "20/09/1999", "imageUrl": "https://basket.co.il/pics/2025-2026/dan.jpg" },
        { "playerId": 21797, "name": "ים מדר", "number": "26", "position": "גארד", "height": "1.90", "birthDate": "21/12/2000", "imageUrl": "https://basket.co.il/pics/2025-2026/yammm.jpg" },
        { "playerId": 21798, "name": "תומר גינת", "number": "41", "position": "פורוורד", "height": "2.02", "birthDate": "07/11/1994", "imageUrl": "https://basket.co.il/pics/2025-2026/ginat.jpg" },
        { "playerId": 21799, "name": "ברונו קאבוקלו", "number": "51", "position": "סנטר", "height": "2.08", "birthDate": "21/09/1995", "imageUrl": "https://basket.co.il/pics/2025-2026/bruno.jpg" },
        { "playerId": 21788, "name": "יפתח זיו", "number": "99", "position": "רכז", "height": "1.91", "birthDate": "09/07/1995", "imageUrl": "https://basket.co.il/pics/2025-2026/ziv.jpg" }
    ];

    console.log('🏀 טוען שחקנים ומייצר סיסמאות אישיות...');
    
    // שימוש בלולאת for...of כדי לאפשר await בתוך הלולאה
    for (const p of playersRaw) {
        
        // --- לוגיקת הסיסמה החדשה ---
        // לוקחים את המספר (למשל "0") ומשכפלים אותו עד שיהיו לפחות 6 תווים ("000000")
        let passString = p.number.toString();
        while (passString.length < 6) {
            passString += p.number.toString();
        }
        // גוזרים בדיוק 6 תווים (אופציונלי, למראה אחיד, או משאירים את מה שיצא)
        // בדוגמה כאן: עבור 0 זה יהיה 000000, עבור 10 זה יהיה 101010
        
        const playerPassword = await bcrypt.hash(passString, salt);

        users.push({
            name: p.name,
            email: `player${p.number}@mars.com`, // אימייל לפי מספר גופייה
            password: playerPassword,
            role: 'player',
            externalId: p.playerId,
            jerseyNumber: p.number,
            position: p.position,
            height: p.height || "לא צוין",
            birthDate: p.birthDate || "לא צוין",
            imageUrl: p.imageUrl,
            trainingPlan: { shooting: '300 זריקות', fitness: 'אירובי קל', weightTarget: 90 },
            nutritionPlan: 'תפריט מאוזן'
        });
    }

    await User.insertMany(users);
    console.log(`✅ בוצע! ${users.length} משתמשים נוצרו.`);
    console.log(`ℹ️ דוגמה: ג'ונתן מוטלי (0) -> player0@mars.com | סיסמה: 000000`);
    console.log(`ℹ️ דוגמה: כריס ג'ונס (1) -> player1@mars.com | סיסמה: 111111`);
    process.exit();
};

seedDB();