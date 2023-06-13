import { useEffect} from 'react'
import photo2 from '../../components/photo/photo2.jpg'
import { Link, NavLink } from 'react-router-dom';
import photo from '../../components/photo/photog.jpg'
import './App.css';
import './Section.css';
export default function Section() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
    <div className="main">
      <img src={photo} alt="" className='main-photo' />
        <div className='text-main'>
            <h1>PULSO</h1>
            <p>Jesteśmy firmą rodzinną powstałą w odpowiedzi na zmieniające się oczekiwania rynku. Produkujemy obuwie damskie, przeznaczone dla wymagających klientek w średnim wieku.</p>
        </div>
    </div>
    <div className='section-one'>
        <div>
            <h2>Nasze buty wyróżnia</h2>
        </div>
        <div className='section-one-right'>
            <div>
                <ul>
                    <li>100% naturalna skóra</li>
                    <li>Elastyczne i miękkie obuwie</li>
                    <li>Ponadczasowa estetyka</li>
                    <li>Zbiermay doświadczenie od 1987</li>
                </ul>
            </div>
            <NavLink to="/shop" ><button className='button'>Sklep</button></NavLink>
        </div>
    </div>
    <div className='section-two'>
        <img src={photo2} alt="Zdjęcie pracownika na tle butów" className='photo-section' />
        <div className='information'>
            <h3>Informacje na temat konswrwacji naszych butów</h3>
            
            <NavLink to='/readmore'><button className='transparent-button'>Czytaj więcej..</button></NavLink>
        </div>
    </div>
    <div className='section-three'>
        <div>
            <h4>Działamy międzynarodowo</h4>
        </div>
        <div>
            <div>
                <ul>
                    <li>Polska</li>
                    <li>Anglia</li>
                    <li>Ukraina</li>
                    <li>Czechy</li>
                </ul>
            </div>
        </div>
    </div>
    <div className='footer'>
        <p>Inko03</p>
    </div>
    </>
  )
}
