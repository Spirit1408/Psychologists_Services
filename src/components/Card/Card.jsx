import css from "./Card.module.css";
import star from "../../images/rating.svg";
import { useState } from "react";

export const Card = ({ specialist }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [isReviewsOpen, setIsReviewsOpen] = useState(false);
	const isOnline = specialist.is_online;

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
				<img
					src={specialist.avatar_url}
					alt="specialist face"
					className={css.photo}
				/>
			</div>

			<div>
				<div className={css.specInfoContainer}>
					<div className={css.specInfo}>
						<p className={css.specTitle}>Psychologist</p>
						<p className={css.specName}>{specialist.name}</p>
					</div>

					<div className={css.specInfoNum}>
						<p className={css.rating}>
							<img src={star} alt="rating icon" className={css.rating} />
							Rating: {specialist.rating}
						</p>

						<p className={css.price}>
							Price / 1 hour:<span>{specialist.price_per_hour}$</span>
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
							Experience: <span>{specialist.experience}</span>
						</p>
					</li>
					<li className={css.specExpItem}>
						<p className={css.specExpItemTitle}>
							License:
							<span>{specialist.license}</span>
						</p>
					</li>
					<li className={css.specExpItem}>
						<p className={css.specExpItemTitle}>
							Specialization: <span>{specialist.specialization}</span>
						</p>
					</li>
					<li className={css.specExpItem}>
						<p className={css.specExpItemTitle}>
							Initial consultation:{" "}
							<span>{specialist.initial_consultation}</span>
						</p>
					</li>
				</ul>

				<p className={css.specDesc}>{specialist.about}</p>

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
							{specialist.reviews.map((review, index) => (
									<li key={index}>
										<div className={css.revContainer}>
											<div className={css.initialRev}>
												{review.reviewer.charAt(0)}
											</div>

											<div className={css.revInfo}>
												<p className={css.revName}>{review.reviewer}</p>
												<p className={css.revRating}>
													<img src={star} alt="rating icon" />
													{review.rating}
												</p>
											</div>
										</div>

										<p className={css.revText}>{review.comment}</p>
									</li>
								))}
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
