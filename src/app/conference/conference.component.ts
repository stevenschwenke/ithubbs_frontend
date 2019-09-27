import {Component, OnInit} from '@angular/core';

class Talk {
  public portrait: string;
  speaker: string;
  text: string;
}

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['conference.component.css']
})
export class ConferenceComponent implements OnInit {
  talksBestPractice: Talk[];
  talksExpert: Talk[];
  talksCommunity: Talk[];

  constructor() {
    this.talksBestPractice = [
      {portrait: 'Tim_Bourguignon.png', speaker: 'Tim Bourguignon ', text: 'Ich biete euch mein vielerorts durchgeführtes <strong>Mentoring Speeddating</strong> an. Nach kurzer Einführung in Mentoring gibt es schnell getaktete Gespräche (10 Minuten), in denen ihr interessante Ansprechpartner findet, aus denen sich vielleicht eine Mentor-Beziehung ergibt.'},
      {portrait: 'jens_schauder.jpg', speaker: 'Jens Schauder', text: 'Ich habe die Erfahrung gemacht, dass <strong>Kommunikation in IT-Projekten</strong> unglaublich wichtig ist. Darüber würde ich gern reden.'},
      {portrait: 'stefan_henschke.jpg', speaker: 'Stefan Henschke ', text: 'Aufgrund meiner Erfahrungen kann ich jungen Entwicklern die <strong>Grundlagen der Software-Architektur</strong> näher bringen.'},
      {portrait: 'olli.png', speaker: 'Oliver Milke', text: '<strong>Docker</strong> ist heutzutage eine Grundlagentechnologie, die man kennen sollte. Wenn ihr möchtet, zeige ich sie euch!'},
      {portrait: 'lisa_rosenberg.jpg', speaker: 'Lisa Rosenberg', text: 'Mit <strong>Continuous Delivery</strong> habe ich mich nicht nur im Projekt beschäftigt, sondern auch während meiner Bacholor-Arbeit. Das würde ich euch gern näher bringen!'},
      {portrait: 'dmitrij_drandarov.jpg', speaker: 'Dmitrij Drandarov', text: 'Ich würde euch gern meine Erfahrungen mit verschiedenen Grundlagen-Technologien weitergeben: <strong>Git, Gradle und JUnit 5</strong> sind Dinge, die man heutzutage kennen muss.'}
      ];

    this.talksExpert = [
      {portrait: 'stefan_henschke.jpg', speaker: 'Stefan Henschke ', text: 'In meiner Master-Arbeit habe ich mich mit <strong>evolutionärer Software-Architektur</strong> beschäftigt, das kann ich euch sehr gern näher bringen. Außerdem bin ich großer von von <strong>Heimautomatisierung mit OpenHAB</strong>.'},
      {portrait: 'marius_seebach.jpg', speaker: 'Marius Seebach', text: 'Meine Begeisterung und jahrelange Erfahrung als Scrum-Master möchte ich gern mit euch teilen und biete deshalb die Themen <strong>The science behind agile</strong> und <strong>The story mapping game a method for agile teams</strong> an.'},
      {portrait: 'josha.png', speaker: 'Josha ', text: 'Ich würde gern über zwei Themen reden: Die von Heroku entwickelte <strong>12 Factor App</strong> ist heutzutage so wichtig, dass man sie kennen sollte. Warum und was es damit auf sich hat, möchte ich euch gern darlegen. Außerdem habe ich mich mit <strong>Ralley Driven Development</strong> beschäftigt. Ihr wisst nicht, was das ist? Super - lasst es mich euch erklären, wenn ihr mögt.'},
      {portrait: 'olli.png', speaker: 'Oliver Milke', text: 'Mein "<strong>Crypto 101</strong>" - Vortrag stößt immer wieder auf Beliebtheit, deshalb biete ich ihn auch auf dem Barcamp an. Ihr lernt die absoluten Grundlagen der Kryptographie im Alltag eines Softwareentwicklers. Zusätzlich würde ich gern über <strong>Jenkinsfiles</strong> sprechen und wie man Build Jobs as Code formuliert.'}
  ];

    this.talksCommunity = [
      {portrait: 'Tim_Bourguignon.png', speaker: 'Tim Bourguignon ', text: 'Als Publisher des Podcasts "DevJourney" würde ich euch im <strong>Podcasting 101</strong> gern zeigen, was ich in 70 Folgen aufgenommener Podcasts gelernt habe.'},
      {portrait: 'jens_schauder.jpg', speaker: 'Jens Schauder', text: 'Ich würde euch gern von meinen Erfahrungen mit den <strong>Toastmasters</strong> berichten. Was ist das? Warum hält man dort regelmäßig vor den Anwesenden Vorträge? Wie kann das strukturiert gegebene Feedback die eigenen Redekompetenzen massiv verbessern?'},
      {portrait: 'steven.png', speaker: 'Steven ', text: 'Mich treibt das Thema IT-Communities um, daran möchte ich gern mit euch arbeiten. Ich stelle mir einen <strong>Workshop zur Weiterentwicklung des IT Hubs als Plattform</strong> vor. Was sollte noch an Funktionalitäten drauf? Wie können wir zusammen daran arbeiten? Außerdem würde ich mit euch gern einen <strong>Leitfaden für die Organisation von Community-Veranstaltungen</strong> erstellen. Das motiviert sicherlich einige, selbst Events zu organisieren. Als drittes Thema würde ich mit euch gemeinsam herausfinden, was wir in der <strong>IT Community Braunschweigs</strong> noch übersehen haben. '}
    ];
  }

  ngOnInit() {
  }

}
