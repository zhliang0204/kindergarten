import React, { Component } from 'react'

export default class Service extends Component {
  render() {
    return (
      <div className="Service">
        {this.props.isGerman && (<div className="german">
        <h1>
          DIE ELTERINITIATIVE
        </h1>
        <div>
          Was viele Eltern am Anfang nicht wissen: 
          Unsere Kita ist eine Elterninitiative, die fast komplett von Eltern organisiert und geleitet wird. Alle Eltern der betreuten Kinder sind aktive Mitglieder des Vereins „Das China Büro e.V.“. 
          Eltern gestalten somit lebendig die Kita mit und verpflichten sich zugleich, bestimmte Aufgaben innerhalb des Vereins zu übernehmen. Von kleineren Aufgaben wie dem Einkauf eines Regals über die Organisation größerer Projekte bis hin zur Vorstandsarbeit – 
          die Kita ist auf ein reges Engagement der Eltern angewiesen. Um informiert zu sein und Entscheidungen mitzutreffen ist zudem die regelmäßige Teilnahme an Elternabenden und Vereinssitzungen unerlässlich. Die Deutsch-Chinesische Kita organisiert sich wie folgt:
        </div>
        <div className="service-item">
          <h3>
            DER VORSTAND
          </h3>
          <div className="service-content">
            Die Aufgabe des Vorstands ist es, die Vertretung des Vereins nach außen und die Haftung für die Kindertagesstätte zu übernehmen. 
            Zudem übernimmt er alle administrativen Pflichten als Arbeitgeber und koordiniert die Arbeit der anderen Eltern¬. 
            Dabei arbeitet er eng mit der pädagogischen Leitung der Kita sowie allen anderen Erziehern zusammen. Der Vorstand wird jährlich in der Mitgliederversammlung für mindestens ein Jahr gewählt. 
            In der Regel besteht er aus drei bis vier Personen.
          </div>
          </div>

          <div className="service-item">
          <h3>
            DER AUFSICHTSRAT
          </h3>
          <div className="service-content">
            Der Aufsichtsrat ist zur Beratung und Kontrolle des Vorstandes zuständig. Da es in einer Elterninitiative natürlicher Weise immer viele Meinungen gibt, können auch einmal Konflikte entstehen. Der Aufsichtsrat ist auch dazu da, im Vorfeld schlichtend einzugreifen. Außerdem sichtet und kontrolliert der Aufsichtsrat einmal im Jahr die Finanzen.
          </div>
        </div>

        <div className="service-item">
          <h3>
            DER ELTERNRAT
          </h3>
          <div className="service-content">
            Eine wichtige Aufgabe übernimmt außerdem der Elternrat. Jede Gruppe wird durch einen Elternrat vertreten. Dieser ist Ansprechpartner für Eltern und ErzieherInnen und nimmt in regelmäßigen Abständen an den Teamsitzungen teil. Darüber hinaus hilft er maßgeblich bei der Vorbereitung unserer Feste und Feiern.<br />
            ARBEITSGRUPPEN UND EINZELNE AUFGABEN <br/>
            Neben den dauerhaften Ämtern helfen die Eltern in festen Arbeitsgruppen mit und übernehmen klar umrissene Aufgaben. Somit verteilt sich die Arbeit auf mehrere Schultern. Jeder kann sich dabei entsprechend seiner Expertise im Kita-Alltag einbringen. Mögliche Aufgaben sind: <br/>
            Die Beantragung und Abrechnung von Fördermitteln, Reparaturen, Gartenarbeit, Mitarbeit an der Aus- und Umgestaltung der Räumlichkeiten oder die Koordination von Flohmärkten. Die einzelnen Ämter können meistens von mehreren, optimalerweise von jeweils einem Elternteil aus der Tiger- und Drachengruppe, übernommen werden.
          </div>
        </div> 

        <div className="service-item">
          <h3>
            ELTERNDIENSTE
          </h3>
          <div className="service-content">
            Eine besondere Form der Elternmitarbeit sind die Elterndienste, wobei Eltern für einen gewissen Zeitraum die Betreuung der Kinder übernehmen. In dieser Zeit finden die  Teamsitzungen der ErzieherInnen statt, wo organisatorische und pädagogische Themen besprochen werden.
            Gelegentliche Betreuungsdienste ermöglichen den Eltern, das eigene Kind in der Gemeinschaft mit anderen Kindern, aber auch dessen Eltern näher kennenzulernen. Die Elterndienste finden jeden zweiten Montagnachmittag zwischen 15:00 und 17:00 statt und werden unter den Eltern aufgeteilt.<br /> 
            Außer der Reihe können Elterndienste nötig werden, wenn in einer Gruppe eine oder mehrere ErzieherInnen erkranken. In dieser Notsituation wird von allen Eltern erwartet, dass sie sich an der Organisation des Elterndienstes aktiv beteiligen.
          </div>
        </div>

        <div className="service-item">
          <h3>
            ABRECHUNG DER STUNDEN
          </h3>
          <div className="service-content">
            Mit Aufnahme in die Kita verpflichten sich alle Eltern monatlich mindestens zwei Arbeitsstunden zu leisten (Alleinerziehende 1 Stunde). Pro Halbjahr sind das also 12 Arbeitsstunden pro Familie, bzw. 6 Stunden für Alleinerziehende. Nicht geleistete Arbeitsstunden werden mit 20,00 € pro Stunde berechnet. Mit diesem Geld werden Handwerker oder andere Arbeitskräfte bezahlt.
          </div>
        </div>

        <div className="service-item">
          <h3>
            SCHLUSSWORT
          </h3>
          <div className="service-content">
            Wie man sieht übernehmen die Eltern trotz Ganztagsbetreuung der Kinder komplett die Leitung eines kleinen Betriebes mit 6 bis 8 Angestellten. Wer sich für die Betreuung seines Kindes in der deutsch-chinesischen Kita interessiert, sollte also im Vorfeld sich schon darüber im Klaren sein, dass hier noch Arbeit auf einen wartet. Diese wird dafür mit einer herzlichen Atmosphäre zwischen ErzieherInnen und Eltern über das Maß einer gewöhnlichen Kita hinaus und vielen Gestaltungsmöglichkeiten von Seiten der Eltern belohnt.
          </div>
        </div>

        </div>)}

        {!this.props.isGerman && (<div className="chinese">
          building.......
        </div>)}
      </div>
    )
  }
}
