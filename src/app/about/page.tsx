import { EmergencyBanner } from "@/components/EmergencyBanner";
import { getServiceStats } from "@/lib/data";

export const metadata = {
  title: "מידע ואודות",
};

export default function AboutPage() {
  const stats = getServiceStats();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">מידע ואודות</h1>

      <section className="prose prose-slate max-w-none space-y-4 mb-8">
        <h2 className="text-lg font-semibold">מה זה מענה?</h2>
        <p className="text-sm leading-relaxed">
          <strong>מענה</strong> הוא מאגר מידע שמסייע לאנשים בישראל למצוא שירותי טיפול בהתמכרויות —
          שירותים ציבוריים ומסגרות פרטיות מפוקחות, במקום אחד.
        </p>
        <p className="text-sm leading-relaxed">
          המידע באתר נועד לסייע באיתור שירותים ואינו מחליף אבחון או ייעוץ רפואי.
          במצב חירום או סכנה מיידית יש לפנות לשירותי החירום.
        </p>

        <h2 className="text-lg font-semibold mt-6">מה כלול במאגר?</h2>
        <ul className="text-sm space-y-2 list-disc list-inside">
          <li>
            <strong>שירותים ציבוריים</strong> — שירות שמופעל ישירות על ידי משרד ממשלתי,
            רשות מקומית, קופת חולים או בית חולים ציבורי.
          </li>
          <li>
            <strong>מסגרות פרטיות / מלכ״ר מפוקחות</strong> — מסגרת שאינה שירות ממשלתי ישיר
            אך מופיעה כמורשית, מפוקחת, מתקשרת או מופעלת במיקור חוץ על ידי גוף ממשלתי.
          </li>
        </ul>

        <h2 className="text-lg font-semibold mt-6">מדיניות מידע</h2>
        <p className="text-sm leading-relaxed">
          כל מוסד במאגר כולל מקור רשמי, תאריך בדיקה אחרון, ומידע על מעמד הפיקוח.
          לא מפרסמים מספרי טלפון שלא אומתו. אם מידע חסר, מוצגת אזהרה ברורה.
        </p>

        <h2 className="text-lg font-semibold mt-6">מקורות נתונים</h2>
        <p className="text-sm leading-relaxed">
          הנתונים מבוססים על מקורות רשמיים של משרד הבריאות, משרד הרווחה,
          רשויות מקומיות, קופות חולים ובתי חולים ציבוריים.
        </p>

        <h2 className="text-lg font-semibold mt-6">פרטיות</h2>
        <p className="text-sm leading-relaxed">
          אין צורך בהרשמה. אין מעקב אחר חיפושים. המועדפים נשמרים רק בדפדפן שלך.
          לא נשלחים נתונים לצד שלישי.
        </p>

        <div className="rounded-xl bg-slate-100 p-4 text-sm mt-6">
          <p><strong>סטטיסטיקות מאגר:</strong></p>
          <ul className="mt-2 space-y-1">
            <li>{stats.total} מוסדות במאגר</li>
            <li>{stats.public} שירותים ציבוריים</li>
            <li>{stats.supervised} מסגרות פרטיות / מלכ״ר מפוקחות</li>
            <li>{stats.regions} אזורים</li>
          </ul>
        </div>
      </section>

      <EmergencyBanner />
    </div>
  );
}
