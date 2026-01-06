// טעינת משתני סביבה כדי שה-MONGO_URI יעבוד
require('dotenv').config(); 

const mongoose = require('mongoose');
const User = require('./models/User'); 
const Player = require('./models/Player'); // עכשיו זה יעבוד כי יצרת את הקובץ בשלב 1

const MONGO_URI = process.env.MONGO_URI; 

const migrateData = async () => {
  if (!MONGO_URI) {
      console.error("Error: MONGO_URI is missing from .env file");
      return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB...");

    // 1. שליפת כל השחקנים מהטבלה הישנה
    const playersToMove = await User.find({ role: 'player' }).lean();
    console.log(`Found ${playersToMove.length} players to migrate.`);

    if (playersToMove.length > 0) {
        // מחיקת ה-_id כדי שמונגו ייצר חדש וימנע התנגשויות (מומלץ)
        // או השארתם אם אתה רוצה לשמור על ה-ID המקורי. כאן נשמור על המקורי.
        
        // 2. הכנסה לטבלה החדשה
        // שימוש ב-insertMany עלול להיכשל אם יש כפילויות, אז נשתמש בלולאה פשוטה לבטיחות
        for (const player of playersToMove) {
            // בודק אם השחקן כבר קיים בטבלה החדשה לפי אימייל
            const exists = await Player.findOne({ email: player.email });
            if (!exists) {
                await Player.create(player);
                console.log(`Migrated: ${player.name}`);
            } else {
                console.log(`Skipped (already exists): ${player.name}`);
            }
        }
        
        console.log("Migration completed successfully!");
    } else {
        console.log("No players found to migrate.");
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Migration failed:", error);
    mongoose.connection.close();
  }
};

migrateData();