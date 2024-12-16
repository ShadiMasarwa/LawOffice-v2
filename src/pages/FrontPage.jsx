import React from "react";
import MainImage from "../images/mainImage.webp";

const FrontPage = () => {
  return (
    <div>
      <header class="header">
        <h2>משפט נט - ניהול משרד עורכי דין</h2>
      </header>

      <section className="image-container">
        <img
          src={MainImage}
          alt="תמונה מרכזית של משרד עורכי דין"
          class="main-image"
        />
      </section>

      <section class="cards">
        <div class="card">
          <h3>ניהול לקוחות</h3>
          <p>ניהול פרטי הלקוחות, היסטוריית פניות והתקדמות בתיקים.</p>
        </div>
        <div class="card">
          <h3>ניהול תיקי משרד</h3>
          <p>מעקב אחרי תיקים פנימיים של המשרד, סטטוסים ודיווחים.</p>
        </div>
        <div class="card">
          <h3>ניהול תיקים בבית משפט</h3>
          <p>ניהול תיקים בבית משפט כולל סטטוס הליכים ותאריכי דיון.</p>
        </div>
        <div class="card">
          <h3>ניהול משימות משרד</h3>
          <p>מעקב אחרי משימות המשרד, כולל תזכורות ומועדים.</p>
        </div>
        <div class="card">
          <h3>ניהול משימות משפטיות</h3>
          <p>מעקב אחרי משימות משפטיות לפי סדר עדיפויות ותחומים.</p>
        </div>
        <div class="card">
          <h3>ניהול יומן משרד</h3>
          <p>תזמון פגישות, תאריכי דיונים ותזכורות ביומן המרכזי.</p>
        </div>
        <div class="card">
          <h3>ניהול פיננסי</h3>
          <p>מעקב אחר תשלומים, הפקת חשבוניות ודוחות פיננסיים עבור כל תיק.</p>
        </div>
      </section>
    </div>
  );
};

export default FrontPage;
