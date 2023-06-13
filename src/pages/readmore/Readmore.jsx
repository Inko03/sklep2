import React from 'react'
import {Link} from 'react-router-dom'
import './readmore.css'
export default function Readmore() {
  return (
    <div id='readmore'>
        <Link to='/'><div id='back-to'>←</div></Link>
      <div id='inf-product'>
        <p className='title-readmore'>Informacje o produktach i zasady użytkowania</p>
        <p className='inforamation-readmore'>Dziękujemy za zainteresowanie produktami naszej Firmy. Wierzchy naszego obuwia wykonujemy z wysokiej jakości skór naturalnych. Skóra, jak każdy materiał naturalny, może nie zachowywać identycznego koloru oraz struktury na całej powierzchni w trakcie użytkowania obuwia. Podszewki skórzane mogą odbarwiać w różnym stopniu w zależności od indywidualnych cech użytkownika. Decydując się na zakup obuwia z podszewkami skórzanymi należy brać pod uwagę, że może ono zabarwić rajstopy, skarpety lub stopy. Buty należy wkładać i zdejmować zawsze rozsznurowane. Aby uniknąć przetarcia zapiętków nie należy chodzić w butach niezasznurowanych. Obuwie wyjściowe z wierzchami ze skóry licowej, nawet prawidłowo konserwowane, może ulec przemoczeniu podczas użytkowania w warunkach deszczowej pogody. Obowiązkiem użytkownika jest prawidłowa konserwacja obuwia.</p>
      </div>
      <div id='inf-product'>
        <p className='title-readmore'>Sposób konserwacji</p>
        <p className='inforamation-readmore'>Przed konserwacją buty należy oczyścić we właściwy sposób (patrz tabela), a buty przemoczone po oczyszczeniu wysuszyć. Należy unikać przemoczenia obuwia, zwłaszcza skórzanego. Szczególnie szkodliwe dla obuwia skórzanego jest działanie soli używanej w zimie do posypywania chodników i dróg w połączeniu z wodą. Jeśli jednak obuwie zostanie przemoczone należy je oczyścić jak najszybciej po przemoczeniu. Następnie obuwie należy wysuszyć całkowicie w temperaturze pokojowej z dala od źródeł ciepła takich jak kaloryfery, piecyki, suszarki do włosów, które powodują pękanie skóry. Przed suszeniem należy wyciągnąć sznurowadła i wypchać buty papierem nadając im pierwotny kształt. Nie należy prać butów. Po oczyszczeniu i ew. wysuszeniu należy zastosować odpowiedni do rodzaju wierzchu sposób konserwacji (tabela). W dobrych warunkach atmosferycznych obuwie często noszone należy konserwować co kilkanaście dni, w złych warunkach (słota) – każdorazowo po przemoczeniu lub zabrudzeniu. Właściwie konserwowane obuwie będzie bardziej odporne na żrące działania soli i przemakanie, nie jest jednak możliwe uzyskanie pełnej odporności. W skrajnych przypadkach mogą pojawić się trudne do usunięcia zacieki lub przebarwienia, szczególnie przy skórach kolorowych i jasnych. Nie należy stosować past samo nabłyszczających.</p>
      </div>
        <div className='how-main-small'>
            <p className='how-to'>WIERZCHY
            (oznaczenia na opakowaniu)</p>
            <div id='op'><p className='how-to'>SPOSÓB KONSERWACJI</p></div>
        </div>
        <div className='how-main'>
            <p className='how-to'>Skóra licowa</p>
            <p className='howt-to-text'>Oczyścić wilgotną szmatką lub szczotką. Po wysuszeniu stosować pasty zgodne z kolorem wierzchu. Nie należy nakładać nowej warstwy pasty na starą – w takim wypadku wystarczy wyszczotkować obuwie. Przy skórach z efektem cieniowania stosować kremy bezbarwne, aby utrzymać ten efekt. W przypadku utraty tego efektu można go częściowo przywrócić stosując odpowiednie kremy barwne.</p>
        </div>
        <div className='how-main'>
            <p className='how-to'>Nubuk, Welur, Skóra syntetyczna welurowa</p>
            <p className='howt-to-text'>Zabrudzenia usunąć specjalną szczotką. Stosować specjalne środki przeznaczone do tego rodzaju skór – koloryzujące dla ożywienia koloru, a w okresie jesienno-zimowym chroniące przed przemakaniem. Nie należy używać past i kremów.</p>
        </div>
        <div className='how-main'>
            <p className='how-to'>Skóra syntetyczna licowa</p>
            <p className='howt-to-text'>Oczyścić wilgotną szmatką. Można stosować środki do skór syntetycznych.</p>
        </div>
        <div className='how-main'>
            <p className='how-to'>Tkanina</p>
            <p className='howt-to-text'>Czyścić miękką szczotką lub wilgotną szmatką</p>
        </div>
    </div>
  )
}
