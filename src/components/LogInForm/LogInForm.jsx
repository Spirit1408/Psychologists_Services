import css from "./LogInForm.module.css";
import eyeOff from "../../images/eye-off.svg"; 


export const LogInForm = () => {
	return (
		<>
			<h2 className={css.title}>Log In</h2>

			<p className={css.text}>
				Welcome back! Please enter your credentials to access your account and
				continue your search for a psychologist.
			</p>

			<form>
				<div className={css.inputsContainer}>
				    <input type="text" placeholder="Email" className={css.input} />
    
    				<div className={css.inputPassContainer}>
    				    <input type="password" placeholder="Password" className={css.input} />
        
        				<button type="button" className={css.showPassBtn}>
        					<img src={eyeOff} alt="close eye icon" className={css.showPassIcon} />
        				</button>
    				</div>
				</div>

				<button type="submit" className={css.submitBtn}>
					Log In
				</button>
			</form>
		</>
	);
};
