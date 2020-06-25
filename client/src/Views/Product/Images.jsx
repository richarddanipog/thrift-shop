import React from "react";

export default function Images({ images }) {
  const changeMainImg = (imgUrl) => {
    document.querySelector(
      "#mainImg"
    ).style.backgroundImage = `url(http://localhost:3500/${imgUrl})`;
  };
  const image = (img, i) => {
    return (
      <div className="singleImg" key={i} onClick={() => changeMainImg(img)}>
        <img src={`http://localhost:3500/${img}`} alt="product" />
      </div>
    );
  };

  return (
    <div className="col-sm-12 col-lg-6 singleProduct__inner--images">
      {images && (
        <>
          {" "}
          <div
            id="mainImg"
            style={{
              backgroundImage: `url(http://localhost:3500/${images[0]})`,
            }}
          ></div>
          <div id="optionImgs">{images.map((img, i) => image(img, i))}</div>
        </>
      )}
    </div>
  );
}
