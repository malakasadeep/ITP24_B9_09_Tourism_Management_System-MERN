import React, { useEffect, useState } from "react";
import veh1 from "../../assets/img/TrainImages/singletrain.jpg";
import { FaStar, FaTrain } from "react-icons/fa";
import { WiTime3 } from "react-icons/wi";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-modal";

export default function TrainBook() {
  const id = useParams().id;
  const [singleTrain, setSingleTrain] = useState({});

  useEffect(() => {
    const getOneTrain = () => {
      axios
        .get(`/api/train/get/${id}`)
        .then((res) => {
          setSingleTrain(res.data.traindetails);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    getOneTrain();
  }, [id]);

  useEffect(() => {
    localStorage.setItem("trainName", singleTrain.trainName);
    localStorage.setItem("price", singleTrain.price);
    localStorage.setItem("trainID", singleTrain._id);
    localStorage.setItem("TO", singleTrain.to);
    localStorage.setItem("FROM", singleTrain.from);
    localStorage.setItem("ATime", singleTrain.arrivalTime);
    localStorage.setItem("DTime", singleTrain.depatureTime);
  }, [singleTrain]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [seats, setSeats] = useState([]);

  const openModal = async (trainID) => {
    try {
      const res = await fetch(`/api/train/seats/${trainID}`);
      const data = await res.json();
      setSeats(data.seats);
      setModalIsOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    const isSeatSelected = selectedSeats.some(
      (selectedSeat) => selectedSeat.seatNumber === seat.seatNumber
    );

    if (isSeatSelected) {
      setSelectedSeats(
        selectedSeats.filter(
          (selectedSeat) => selectedSeat.seatNumber !== seat.seatNumber
        )
      );
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBookSeat = () => {
    console.log("Booked seats:", selectedSeats);
    setSelectedSeats([]);
  };
  return (
    <div className="min-h-screen mt-6">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="md:w-1/2">
            <img
              src={veh1}
              alt="Train"
              className="object-cover h-80 w-full md:h-full md:w-auto"
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {singleTrain.trainName}
            </h1>
            <div className="flex items-center mb-4">
              <FaStar className="text-yellow-400 mr-2" />
              <p className="text-gray-600 text-sm">4.2</p>
            </div>
            <div className="flex items-center mb-4">
              <FaTrain className="text-gray-600 mr-2" />
              <p className="text-gray-600 text-sm">
                {singleTrain.to} - {singleTrain.from}
              </p>
            </div>
            <div className="flex items-center mb-4">
              <WiTime3 className="text-gray-600 mr-2" />
              <p className="text-gray-600 text-sm">
                {singleTrain.depatureTime} - {singleTrain.arrivalTime}
              </p>
            </div>
            <div className="flex items-center mb-4">
              <MdAirlineSeatReclineNormal className="text-gray-600 mr-2" />
              <p className="text-gray-600 text-sm">
                {singleTrain.noOfSeats} Seats Available
              </p>
            </div>
            <div className="flex items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                $ {singleTrain.price}
              </h1>
            </div>
            <Link>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full md:w-[350px] lg:w-[300px]"
                onClick={() => openModal(singleTrain._id)}
              >
                BOOK
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="mt-28"
      >
        <div
          className="modal-content bg-skyblue-200 rounded-lg p-6 relative mt-4 ml-4 mr-4 overflow-y-auto"
          style={{ maxHeight: "80vh" }}
        >
          <button
            className="close-btn  top-30 right-10 mt-4 mr-4 bg-skyblue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-skyblue-600 fixed"
            onClick={() => setModalIsOpen(false)}
          >
            X
          </button>
          <h2 className="text-xl font-bold mb-4">Seat Information</h2>
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 mr-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-skyblue-500">Available Seats</p>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 mr-2 bg-red-500 rounded-full"></div>
            <p className="text-sm text-skyblue-500">Booked Seats</p>
          </div>
          <div className="seats-container grid grid-cols-4 gap-4">
            {seats.map((seat, index) => (
              <div
                key={index}
                className={`seat rounded-lg p-3 flex items-center justify-center ${
                  selectedSeats.some(
                    (selectedSeat) =>
                      selectedSeat.seatNumber === seat.seatNumber
                  )
                    ? "bg-blue-500 cursor-not-allowed"
                    : seat.available
                    ? "bg-red-200 cursor-pointer"
                    : "bg-green-200 cursor-pointer"
                }`}
                onClick={() => (!seat.available ? handleSeatClick(seat) : null)}
              >
                <p className="text-lg font-semibold">{seat.seatNumber}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-semibold">
              Selected Seats: {selectedSeats.length}
            </p>
            <p className="text-lg font-semibold">
              Total Cost: ${selectedSeats.length * singleTrain.price}
            </p>
            <div>
              <button
                className="book-btn bg-sky-500 text-white rounded-lg px-4 py-2 hover:bg-skyblue-600"
                onClick={handleBookSeat}
              >
                Book the Seats
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
