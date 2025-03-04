import css from "./Psychologists.module.css";
import { Filter } from "../../components/Filter/Filter";

export function Psychologists() {
    return <div className={css.container}>
        <Filter />
    </div>;
}