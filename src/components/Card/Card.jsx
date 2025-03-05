import css from "./Card.module.css";
import photo from "../../images/dummy/spec-photo.jpg";
import star from "../../images/rating.svg";
import { useState } from "react";

export const Card = () => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [isReviewsOpen, setIsReviewsOpen] = useState(false);
	const isOnline = true;

	const toggleFavorite = () => {
		setIsFavorite((prev) => !prev);
	};

	const toggleReviews = () => {
		setIsReviewsOpen((prev) => !prev);
	};

	return (
		<div className={css.card}>
			<div className={css.photoContainer}>
				{isOnline && <span className={css.status} />}
				<img src={photo} alt="specialist face" className={css.photo} />
			</div>

			<div>
				<div className={css.specInfoContainer}>
					<div className={css.specInfo}>
						<p className={css.specTitle}>Psychologist</p>
						<p className={css.specName}>Dr. Sarah Davis</p>
					</div>

					<div className={css.specInfoNum}>
						<p className={css.rating}>
							<img src={star} alt="rating icon" className={css.rating} />
							Rating: 4.75
						</p>

						<p className={css.price}>
							Price / 1 hour:<span>120$</span>
						</p>

						<button
							type="button"
							className={css.favBtn}
							onClick={toggleFavorite}
						>
							<svg
								className={
									isFavorite ? `${css.favIcon} ${css.active}` : css.favIcon
								}
							>
								<use href="src/images/sprite.svg#icon-heart" />
							</svg>
						</button>
					</div>
				</div>

				<ul className={css.specExp}>
					<li className={css.specExpItem}>
						<p className={css.specExpItemTitle}>
							Experience: <span>12 years</span>
						</p>
					</li>
					<li className={css.specExpItem}>
						<p className={css.specExpItemTitle}>
							License: <span>Licensed Psychologist (License #67890)</span>
						</p>
					</li>
					<li className={css.specExpItem}>
						<p className={css.specExpItemTitle}>
							Specialization: <span>Depression and Mood Disorders</span>
						</p>
					</li>
					<li className={css.specExpItem}>
						<p className={css.specExpItemTitle}>
							Initial consultation:{" "}
							<span>Free 45-minutes initial consultation</span>
						</p>
					</li>
				</ul>

				<p className={css.specDesc}>
					Dr. Sarah Davis is a highly experienced and licensed psychologist
					specializing in Depression and Mood Disorders. With 12 years of
					practice, she has helped numerous individuals overcome their
					depression and regain control of their lives. Dr. Davis is known for
					her empathetic and understanding approach to therapy, making her
					clients feel comfortable and supported throughout their journey to
					better mental health.
				</p>

				{!isReviewsOpen && (
					<button
						type="button"
						className={css.readMoreBtn}
						onClick={toggleReviews}
					>
						Read more
					</button>
				)}

				{isReviewsOpen && (
					<div className={css.specReviews}>
						<ul className={css.specReviewsList}>
							<li>
								<div className={css.revContainer}>
									<div className={css.initialRev}>M</div>

									<div className={css.revInfo}>
										<p className={css.revName}>Michael Brown</p>
										<p className={css.revRating}>
											<img src={star} alt="rating icon" />
											4.5
										</p>
									</div>
								</div>

								<p className={css.revText}>
									Dr. Davis has been a great help in managing my depression. Her
									insights have been valuable.
								</p>
							</li>

							<li>
								<div className={css.revContainer}>
									<div className={css.initialRev}>L</div>

									<div className={css.revInfo}>
										<p className={css.revName}>Linda Johnson</p>
										<p className={css.revRating}>
											<img src={star} alt="rating icon" />
											5.0
										</p>
									</div>
								</div>

								<p className={css.revText}>
									I'm very satisfied with Dr. Davis's therapy. She's
									understanding and empathetic.
								</p>
							</li>
						</ul>

						<button type="button" className={css.makeAppBtn}>
							Make an appointment
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
