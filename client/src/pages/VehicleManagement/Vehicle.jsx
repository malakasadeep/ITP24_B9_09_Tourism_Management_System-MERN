import React,{useEffect,useState} from 'react'
import axios from 'axios';
import{Link} from 'react-router-dom';


function Vehicle() {
  const[vehicles,setVehicles]=useState([]);
  const[loading,setLoading]=useState(false);
  useEffect(()=>{
  setLoading(true);
   axios
  .get('http://localhost:5000/api/vehicles.js')
  .then((res)=>{
    setVehicles(res.data);
    setLoading(false);
  })
  
  .catch((error) => { 
  console.log(error);
  setLoading(false);
  });
  }); 
  
  return (
    <div>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
<main class="main">
    <div class="container">
      <section class="grid_cards">
        <article class="card_ui">
          <div class="car_header">
            <div class="car_header_status">
              <a href="#" class="status_rating">
                <i class="fas fa-star status_rating_star"></i>
                <span>4.7</span>
                <span class="status_rating_number_comments">(109)</span>
              </a>
              <div class="status_disponibility status_available">
                <span>Disponible</span>
              </div>
            </div>
            <div>
              <button class="button_like">
                <i class="far fa-heart"></i>
              </button>
            </div>
          </div>
          <div class="car_body"></div>
            <div class="car_body_img_container">
              <a href="#" class="car_img_content_link">
                <figure class="car_img_content">
                <img src="https://raw.githubusercontent.com/emmywebgiart/card_ui_vehicle_rent/master/img/ford_focus.png" alt="Ford Focus" />
                </figure>
              </a>
            <div>
              <p class="car_name">FORD</p>
              <div class="car_price_container">
                <a href="#" class="car_model_link">
                  <h2 class="car_model" title="FOCUS">FOCUS</h2>
                </a>
                <p class="car_price">$500.00 <span class="car_price_time">/hora</span></p>
              </div>
            </div>
          </div>
          <div class="car_footer">
            <ul class="car_list_characteristics">
              <li>
                <i class="fas fa-sliders-h"></i>
                <span title="Manual">Manual</span>
              </li>
              <li>
                <i class="fas fa-tachometer-alt"></i>
                <span title="Kilometraje ilimitado">Kilometraje ilimitado</span>
              </li>
              <li>
                <i class="fas fa-user"></i>
                <span title="5">5</span>
              </li>
            </ul>
          </div>
        </article>
        <article class="card_ui">
          <div class="car_header">
            <div class="car_header_status">
              <a href="#" class="status_rating">
                <i class="fas fa-star status_rating_star"></i>
                <span>4.6</span>
                <span class="status_rating_number_comments">(58)</span>
              </a>
              <div class="status_disponibility status_available">
                <span>Disponible</span>
              </div>
            </div>
            <div>
              <button class="button_like">
                <i class="far fa-heart"></i>
              </button>
            </div>
          </div>
          <div class="car_body">
            <div class="car_body_img_container">
                <a href="#" class="car_img_content_link">
                <figure class="car_img_content">
                  <img src="https://raw.githubusercontent.com/emmywebgiart/card_ui_vehicle_rent/master/img/kia_forte.png" alt="Nissan Sentra" />
                </figure>
                </a>
              </div>
            <div>
              <p class="car_name">NISSAN</p>
              <div class="car_price_container">
                <a href="#" class="car_model_link">
                  <h2 class="car_model" title="SENTRA">SENTRA</h2>
                </a>
                <p class="car_price">$420.00 <span class="car_price_time">/hora</span></p>
              </div>
            </div>
          </div>
          <div class="car_footer">
            <ul class="car_list_characteristics">
              <li>
                <i class="fas fa-sliders-h"></i>
                <span title="Manual">Manual</span>
              </li>
              <li>
                <i class="fas fa-tachometer-alt"></i>
                <span title="Kilometraje ilimitado">Kilometraje ilimitado</span>
              </li>
              <li>
                <i class="fas fa-user"></i>
                <span title="5">5</span>
              </li>
            </ul>
          </div>
        </article>
        <article class="card_ui">
          <div class="car_header">
            <div class="car_header_status">
              <a href="#" class="status_rating">
                <i class="fas fa-star status_rating_star"></i>
                <span>4.5</span>
                <span class="status_rating_number_comments">(77)</span>
              </a>
              <div class="status_disponibility status_not_available">
                <span>No disponible</span>
              </div>
            </div>
            <div>
              <button class="button_like">
                <i class="far fa-heart"></i>
              </button>
            </div>
          </div>
          <div class="car_body">
            <div class="car_body_img_container">
                <a href="#" class="car_img_content_link">
                <figure class="car_img_content">
                  <img src="https://raw.githubusercontent.com/emmywebgiart/card_ui_vehicle_rent/master/img/nissan_sentra.png" alt="KIA Forte" />
                </figure>
                </a>
              </div>
            <div>
              <p class="car_name">KIA</p>
              <div class="car_price_container">
                <a href="#" class="car_model_link">
                  <h2 class="car_model" title="FORTE">FORTE</h2>
                </a>
                <p class="car_price">$600.00 <span class="car_price_time">/hora</span></p>
              </div>
            </div>
          </div>
          <div class="car_footer">
            <ul class="car_list_characteristics">
              <li>
                <i class="fas fa-sliders-h"></i>
                <span title="Manual">Manual</span>
              </li>
              <li>
                <i class="fas fa-tachometer-alt"></i>
                <span title="Kilometraje ilimitado">Kilometraje ilimitado</span>
              </li>
              <li>
                <i class="fas fa-user"></i>
                <span title="5">5</span>
              </li>
            </ul>
          </div>
        </article>
      </section>
    </div>
  </main>
  </div>
  );
  }

export default Vehicle;



