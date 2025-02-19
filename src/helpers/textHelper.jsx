// export const textAbout = `
//     <div class="t1">INDEPENDENT FULL-STACK</div>
//     <div class="t2"><%= DEVELOPER %></div>
//     <div class="t3">CURRENTLY FIXIN </div>
//     <div class="t4">BASED IN MELBOURNE</div>
//     <div class="t5">OR ANYWHERE IN THE WORLD</div>
// `;

// export const textAboutMask = `
//     <div class="t1">SELF THOUGHT FRONT-END</div>
//     <div class="t2">{<Developer style={style.dev}</div>
//     <div class="t3">CURRENTLY PLAYING w 3D</div>
//     <div class="t4">BASED IN MELBOURNE</div>
//     <div class="t5">OR ANYWHERE IN THE WORLD</div>
// `;

export const textAbout = () => {
  return (
    <>
      <div>
        INDEPENDENT <span className="backend">BACK-END</span>
      </div>
      <div>{`<%= DEVELOPER %>`}</div>
      <div>DEVELOPING API</div>
      <div>MANAGING DATA</div>
      <div>OPTIMISING & DEPLOYING...</div>
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
