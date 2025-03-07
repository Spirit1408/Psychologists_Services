import { useEffect } from "react";
import css from "./ThemeSwitcher.module.css";

export const ThemeSwitcher = () => {

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			themeSwitch(savedTheme);
		}
	}, []);

	const themeSwitch = (color) => {
		localStorage.setItem("theme", color);

        switch (color) {
            case "blue":
                document.documentElement.classList.remove("theme-green");
                document.documentElement.classList.remove("theme-orange");
                document.documentElement.classList.add("theme-blue");
                break;
            case "orange":
                document.documentElement.classList.remove("theme-green");
                document.documentElement.classList.remove("theme-blue");
                document.documentElement.classList.add("theme-orange");
                break;
            default:
                document.documentElement.classList.remove("theme-blue");
                document.documentElement.classList.remove("theme-orange");
                break;
        }

    }

	return (
		<div className={css.themeSwitcherContainer}>
			<ul className={css.themeSwitcher}>
				<li>
					<button type="button" className={css.themeSwitcherBtn} onClick={() => themeSwitch("green")}>
						<div className={`${css.color} ${css.green}`} />
					</button>
				</li>
				<li>
					<button type="button" className={css.themeSwitcherBtn} onClick={() => themeSwitch("blue")}>
						<div className={`${css.color} ${css.blue}`} />
					</button>
				</li>
				<li>
					<button type="button" className={css.themeSwitcherBtn} onClick={() => themeSwitch("orange")}>
						<div className={`${css.color} ${css.orange}`} />
					</button>
				</li>
			</ul>
		</div>
	);
};
