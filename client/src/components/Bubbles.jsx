import React, { useEffect, useRef } from "react";
import "../assets/css/buble.css"; // Import the css file

const Bubbles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const particleArray = [];

    const handleDrawCircle = (event) => {
      const x = event.pageX;
      const y = event.pageY;

      drawCircle(x, y);
    };

    const drawCircle = (x, y) => {
      for (let i = 0; i < 25; i++) {
        const particle = new Particle(x, y);
        particleArray.push(particle);
      }
    };

    const animate = () => {
      canvas.width = window.innerWidth - 20; // Set canvas width to window width
      canvas.height = window.innerHeight / 4; // Set canvas height to window height

      context.clearRect(0, 0, canvas.width, canvas.height);

      particleArray.forEach((particle) => {
        particle?.move();
        particle?.draw();
      });

      // Draw the text
      context.fillStyle = "#112434";
      context.font = "clamp(5rem, 7vw + .5rem, 3rem) Mooli";
      context.textAlign = "center";
      context.fillText("TravalCraft", canvas.width / 2, canvas.height / 2);
      context.fillStyle = "#112434";
      context.font = "clamp(1rem, 1vw + .5rem, 3rem) Mooli";
      context.textAlign = "center";
      context.fillText(
        "Unlock the Wonders of the World: Start Your Journey Here",
        canvas.width / 2,
        canvas.height / 2 + 50
      );

      requestAnimationFrame(animate);
    };

    class Particle {
      constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 50;
        this.dx = Math.random() * 3;
        this.dy = Math.random() * 7;
        this.color = "#2E8BC0";
      }

      draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.strokeStyle = this.color;
        context.stroke();

        const gradient = context.createRadialGradient(
          this.x,
          this.y,
          1,
          this.x + 0.5,
          this.y + 0.5,
          this.radius
        );

        gradient.addColorStop(0.3, "#5EB0E530");
        gradient.addColorStop(0.95, "#F1F2ED50");

        context.fillStyle = gradient;
        context.fill();
      }

      move() {
        this.x = this.x + this.dx;
        this.y = this.y - this.dy;
      }
    }

    canvas.addEventListener("click", handleDrawCircle);
    //drawCircle(canvas.width / 2, canvas.height / 2);
    drawCircle(canvas.width / 4, canvas.height / 4);
    drawCircle(canvas.width / 3, canvas.height / 3);
    drawCircle(canvas.width + 4, canvas.height + 4);
    drawCircle(canvas.width * 0.75, canvas.height * 0.75);
    drawCircle(canvas.width * 0.25, canvas.height * 0.75);
    drawCircle(canvas.width * 0.75, canvas.height * 0.25);
    animate();

    return () => {
      // Cleanup function
      canvas.removeEventListener("click", handleDrawCircle);
    };
  }, []); // Run only once on component mount

  return (
    <div className="">
      <canvas id="bubbles" ref={canvasRef}></canvas>
    </div>
  );
};

export default Bubbles;
