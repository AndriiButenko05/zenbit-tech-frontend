import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./Properties.module.css";
import type { AppDispatch, RootState } from "../../app/store";
import { loadProperties } from "../../features/propertiesSlice";
import PropertyCard from "../PropertyCard/PropertyCard";
import Loader from "../Loader/Loader";
export default function Properties() {
  const dispatch = useDispatch<AppDispatch>();
  const { deals, loading, error } = useSelector(
    (state: RootState) => state.properties,
  );
  useEffect(() => {
    dispatch(loadProperties());
  }, [dispatch]);
  if (loading) return <Loader />;
  if (error)
    return (
      <section className={css.section}>
        <h2 className={css.title}>Error: {error}</h2>
      </section>
    );
  return (
    <section className={css.section} id="properties">
      <h2 className={css.title}>Open Deals</h2>
      <ul className={css.grid}>
        {deals &&
          deals.map((deal) => <PropertyCard key={deal.id} data={deal} />)}
      </ul>
    </section>
  );
}
