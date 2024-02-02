import React from 'react';


const Carousel = ({imgUrlsArray}) => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {
          imgUrlsArray.map((url, index) => {
            return (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <img src={url} className="d-block w-100 img-fluid rounded" alt={`Slide ${index + 1}`} />
              </div>
            )
          })
        }
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true">
        </span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true">
        </span>
        <span className="visually-hidden">Next</span>
      </button>
      <div className="carousel-indicators">
        <div className="d-flex">
          {
            imgUrlsArray.map((url, index) => {
              return (
                <div key={index} data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? "active" : ""} style={{width: "65px"}}>
                  <img src={url} className="d-block w-100 img-thumbnail rounded" alt={`Indicator ${index}`} />
                </div>
              )
            })
          }
        </div>
      </div>
      <style>
        {`
          .carousel-indicators {
            position: static;
          }

          .carousel-indicators div {
            flex: 0 0 20%; /* Adjust the width as needed */
          }

          .carousel-indicators img,
          .img-thumbnail {
            width: 100%;
            max-width: 150px; /* Adjust the maximum width for larger thumbnails */
            height: auto;
            border-radius: 10px; /* Adjust the border-radius as needed */
          }

          /* Style for carousel control buttons */
          .carousel-control-prev, .carousel-control-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 2em;
          }

          .carousel-control-prev-icon, .carousel-control-next-icon {
            color: #000; /* Adjust the color as needed */
          }
        `}
      </style>
    </div>
  );
};

export default Carousel;