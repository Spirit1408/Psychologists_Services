import css from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";

export function NotFoundPage() {
	return (
		<div className={css.container}>
			<h1 className="title">Oops.. Page not found!</h1>
            <Link to="/" className={css.link}>Go back</Link>
		</div>
	);
}
