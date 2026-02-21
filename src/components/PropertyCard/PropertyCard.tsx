"use client";
import { useEffect, useState } from "react";
import type { Property } from "../../types/property";
import css from "./PropertyCard.module.css";
import Modal from "../Modal/Modal";
import toast from "react-hot-toast";
import { sendApplication } from "../../api/propertiesApi";
import { useSelector } from "react-redux";
import { type RootState } from "../../app/store";
interface PropertyCardProps {
  data: Property;
}
export default function PropertyCard({ data }: PropertyCardProps) {
  const userEmail = useSelector((state: RootState) => state.auth.email);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: userEmail || "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    image_url,
    image_url_2x,
    title,
    total_price,
    yield_percentage,
    solid_percentage,
    tiket_price,
    end_date,
  } = data;
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email: userEmail || "",
    }));
  }, [userEmail]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendApplication(formData);
      toast.success(`A request for ${title} successfully sent!`);
      setFormData({ name: "", email: "", phone: "" });
      setIsModalOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong. Please try again later");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <li className={css.card}>
      <div className={css.imageContainer}>
        <img
          src={image_url}
          srcSet={`${image_url} 1x, ${image_url_2x} 2x`}
          alt={title}
        />
        <button
          className={css.investButton}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Invest
        </button>
        <div className={css.cardContent}>
          <h3>{title}</h3>
          <div className={css.stats}>
            <p>
              {Number(total_price).toLocaleString().replaceAll(",", " ")} Dhs
            </p>
            <p>Yield {yield_percentage}%</p>
            <p>Sold {solid_percentage}%</p>
            <p>
              Ticket -{" "}
              {Number(tiket_price).toLocaleString().replaceAll(",", " ")} Dhs
            </p>
            <p>Days left {end_date}</p>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className={css.formTitle}>Invest in {title}</h2>
        <form onSubmit={handleSubmit}>
          <div className={css.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className={css.input}
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className={css.input}
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              className={css.input}
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={css.submitBtn}>
            {isSubmitting ? "Sending..." : "Send Request"}
          </button>
        </form>
      </Modal>
    </li>
  );
}
