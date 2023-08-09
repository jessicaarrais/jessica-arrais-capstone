import logo from "../../assets/logos/logo.png"
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
        <img className="footer__logo" src={logo} alt="logo" />
      </div>
    </footer>
  );
}

