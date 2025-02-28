import { landingPageText, logoTextAnimation } from "./textAnimationHelper";

export const textLanding = (isLocked, styles) => {
  return (
    <>
      <div className={styles.line1}>{landingPageText("DAVID GIM")}</div>
      <div className={styles.line2}>{landingPageText("{ style.web }")}</div>
      <div className={styles.line3}>{landingPageText("DEVELOPER")}</div>
      <div className={styles.line4}>
        <div className={styles.line4_text}>
          {landingPageText(
            isLocked ? "CLICK ANYWHERE TO ADD COLOR & SOUND." : `SCROLL DOWN`
          )}
        </div>
      </div>
    </>
  );
};

export const textAboutMask = () => {
  return (
    <>
      <div className="t1">
        CREATIVE <span className="frontend">FRONT-END</span>
      </div>
      <div className="t2">{`<Developer id={style.dev} />`}</div>
      <div className="t3">PLAYING WITH 3D</div>
      <div className="t4">ADDING SUBTLE ANIMATION</div>
      <div className="t5">BRINGING IDEAS TO LIFE!</div>
    </>
  );
};
