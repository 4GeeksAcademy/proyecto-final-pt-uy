import React from 'react';


const Carousel = (props) => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={props.img1} className="d-block w-100 img-fluid rounded" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src={props.img2} className="d-block w-100 img-fluid rounded" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src={props.img3} className="d-block w-100 img-fluid rounded" alt="Slide 3" />
        </div>
        <div className="carousel-item">
          <img src={props.img4} className="d-block w-100 img-fluid rounded" alt="Slide 4" />
        </div>
        <div className="carousel-item">
          <img src={props.img5} className="d-block w-100 img-fluid rounded" alt="Slide 5" />
        </div>
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
          <div data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active">
            <img src={props.img1} className="d-block w-100 img-thumbnail rounded" alt="Indicator 1" />
          </div>
          <div data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1">
            <img src={props.img2} className="d-block w-100 img-thumbnail rounded" alt="Indicator 2" />
          </div>
          <div data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2">
            <img src={props.img3} className="d-block w-100 img-thumbnail rounded" alt="Indicator 3" />
          </div>
          <div data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3">
            <img src={props.img4} className="d-block w-100 img-thumbnail rounded" alt="Indicator 4" />
          </div>
          <div data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4">
            <img src={props.img5} className="d-block w-100 img-thumbnail rounded" alt="Indicator 5" />
          </div>
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