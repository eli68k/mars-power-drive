const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // או bcryptjs אם זה מה שמותקן אצלך
const User = require('./models/User');
const Player = require('./models/Player');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// וודא שיש לך MONGO_URI בקובץ .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Seeding Connected"))
  .catch(err => console.log(err));

// טקסט ברירת המחדל
const defaultDrills = `סדר תרגילים לאימון קליעות:

1. 50 זריקות יד אחת מה-L.POST זווית 180 מעלות לטבעת:
   - 25 כל צד.
   - לספור כמה סלים חלקים נקלעו.
   --- 10 זריקות עונשין מנוחה ---

2. 50 זריקות מסירה עצמית מקו העונשין באלכסון ל-M.POST:
   - תפיסת הכדור ועצירה שתי רגליים ל-JUMP גבוה טווח קצר.
   --- 10 זריקות עונשין מנוחה ---

3. 50 זריקות לאחר הטעייה בזמן כדרור על קשת השלוש:
   - לבצע הרצה ועצירה רגל רגל ל-JUMP רגל רגל חצי מרחק.
   --- 10 זריקות עונשין מנוחה ---

4. 50 זריקות ל-3 לאחר הטעייה בזמן כדרור.
   --- 10 זריקות עונשין מנוחה ---

5. 50 זריקות ל-3 לאחר מסירה עצמית.
   --- 10 זריקות עונשין מנוחה ---

* ובסוף... לא עוזבים את המגרש עד שקולעים 10 זריקות עונשין רצופות!`;

const seedDB = async () => {
    try {
        console.log('🧹 מוחק נתונים ישנים משתי הטבלאות...');
        await User.deleteMany({}); 
        await Player.deleteMany({}); 

        const salt = await bcrypt.genSalt(10);
        const coachPassword = await bcrypt.hash('123456', salt);

        // --- יצירת מאמנים (Users Collection) ---
        const coaches = [
            { name: 'Head Coach', email: 'head@mars.com', password: coachPassword, role: 'head-coach' },
            { name: 'Assistant 1', email: 'asst1@mars.com', password: coachPassword, role: 'coach' }
        ];
        
        await User.insertMany(coaches);
        console.log('✅ מאמנים נוצרו בטבלת users');

        // --- יצירת שחקנים (Players Collection) ---
        const playersRaw = [
        { "playerId": 100, "name": "רוני 'הטיל' לוי", "number": "0", "position": "רכז", "height": "1.85", "birthDate": "12/05/1998" },
        { "playerId": 101, "name": "דני 'החומה' כהן", "number": "1", "position": "סנטר", "height": "2.10", "birthDate": "10/01/1995" },
        { "playerId": 102, "name": "גל 'ספידי' מור", "number": "2", "position": "גארד", "height": "1.91", "birthDate": "04/10/1996" },
        { "playerId": 103, "name": "טל 'הצלף' אור", "number": "3", "position": "גארד", "height": "1.96", "birthDate": "19/04/1995" },
        { "playerId": 104, "name": "בן 'ביג בן' שחר", "number": "6", "position": "סנטר", "height": "2.05", "birthDate": "15/06/1995" },
        { "playerId": 105, "name": "יוסי 'הקוסם' כץ", "number": "9", "position": "רכז", "height": "1.88", "birthDate": "25/09/2000" },
        { "playerId": 106, "name": "אבי 'אייר' גולן", "number": "10", "position": "פורוורד", "height": "2.01", "birthDate": "02/03/1992" },
        { "playerId": 107, "name": "שי 'הפטיש' מזרחי", "number": "11", "position": "פורוורד", "height": "1.99", "birthDate": "24/08/1994" },
        { "playerId": 108, "name": "עידן 'חלק' פרץ", "number": "14", "position": "גארד", "height": "1.95", "birthDate": "29/12/1992" },
        { "playerId": 109, "name": "תומר 'הטנק' אברהם", "number": "17", "position": "סנטר", "height": "2.08", "birthDate": "02/07/1997" },
        { "playerId": 110, "name": "גיל 'ספיידר' וייס", "number": "21", "position": "פורוורד", "height": "2.03", "birthDate": "21/09/1995" },
        { "playerId": 111, "name": "עומרי 'פלאש' גורדון", "number": "22", "position": "רכז", "height": "1.90", "birthDate": "13/01/1994" },
        { "playerId": 112, "name": "ניר 'בלוק' דהן", "number": "24", "position": "סנטר", "height": "2.12", "birthDate": "12/09/1994" },
        { "playerId": 113, "name": "ארז 'השף' סגל", "number": "25", "position": "גארד", "height": "1.94", "birthDate": "20/09/1999" },
        { "playerId": 114, "name": "מתן 'קרח' פרידמן", "number": "26", "position": "פורוורד", "height": "2.00", "birthDate": "21/12/2000" },
        { "playerId": 115, "name": "דור 'הגרזן' רובין", "number": "41", "position": "פורוורד", "height": "2.02", "birthDate": "07/11/1994" },
        { "playerId": 116, "name": "יניב 'ספארק' אזולאי", "number": "51", "position": "גארד", "height": "1.89", "birthDate": "21/09/1995" },
        { "playerId": 117, "name": "זיו 'הקפטן' בר", "number": "99", "position": "רכז", "height": "1.82", "birthDate": "09/07/1995" }
        ];

        const players = [];

        for (const p of playersRaw) {
            // יצירת סיסמה (מספר חולצה כפול 6 פעמים)
            let passString = p.number.toString();
            while (passString.length < 6) passString += p.number.toString();
            const playerPassword = await bcrypt.hash(passString, salt);
            
            const localImage = `/images/${p.number}.jpg`; 

            players.push({
                name: p.name,
                email: `player${p.number}@mars.com`, 
                password: playerPassword,
                role: 'player', // תפקיד שחקן
                externalId: p.playerId,
                jerseyNumber: p.number,
                position: p.position,
                height: p.height,
                birthDate: p.birthDate,
                imageUrl: localImage,
                trainingPlan: { 
                    shooting: '300 זריקות', 
                    shootingDrills: defaultDrills, 
                    fitness: 'אירובי בינוני/קשה', 
                    weightTarget: 90 
                },
                nutritionPlan: 'תפריט מאוזן'
            });
        }

        await Player.insertMany(players);
        console.log(`✅ ${players.length} שחקנים נוצרו בטבלת players`);

        console.log("🚀 תהליך ה-Seed הסתיים בהצלחה!");
        process.exit();

    } catch (err) {
        console.error("❌ שגיאה ב-Seed:", err);
        process.exit(1);
    }
};

seedDB();