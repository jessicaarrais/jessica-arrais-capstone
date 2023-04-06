import starIcon from "../../assets/icons/star-icon.png";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__box">
        <label className="footer__label">Phone :</label>
        <p className="footer__link">+1 (987) 654-3210</p>
      </div>
      <div className="footer__box">
        <label className="footer__label">Email :</label>
        <p className="footer__link">instahome@instahome.com</p>
      </div>
      <div className="footer__box">
        <label className="footer__label">Address :</label>
        <p className="footer__link">123 Ave, Manhattan - NY</p>
      </div>
      <div className="footer__box">
        <img className="footer__icon" src={starIcon} alt="star icon" />
        <img className="footer__icon" src={starIcon} alt="star icon" />
        <img className="footer__icon" src={starIcon} alt="star icon" />
      </div>
    </footer>
  );
}
