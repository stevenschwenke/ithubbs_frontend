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

  constructor() {
    this.talksBestPractice = [
      {portrait: 'olli.png', speaker: 'Oliver Milke', text: 'Docker ist heutzutage eine Grundlagentechnologie, die man kennen sollte. Wenn ihr möchtet, zeige ich sie euch!'},
      {portrait: 'jens_schauder.jpg', speaker: 'Jens Schauder', text: 'Ich habe die Erfahrung gemacht, dass Kommunikation in IT-Projekten unglaublich wichtig ist. Darüber würde ich gern reden.'},
      {portrait: 'lisa_rosenberg.jpg', speaker: 'Lisa Rosenberg', text: 'Mit Continuous Delivery habe ich mich nicht nur im Projekt beschäftigt, sondern auch während meiner Bacholor-Arbeit. Das würde ich euch gern näher bringen!'},
      {portrait: 'dmitrij_drandarov.jpg', speaker: 'Dmitrij Drandarov', text: 'Ich würde euch gern meine Erfahrungen mit verschiedenen Grundlagen-Technologien weitergeben: Git, Gradle und JUnit 5 sind Dinge, die man heutzutage kennen muss.'}
      ];

    this.talksExpert = [
      {portrait: 'josha.png', speaker: 'Josha ', text: 'Ich würde gern über zwei Themen reden: Die von Heroku entwickelte 12 Factor App ist heutzutage so wichtig, dass man sie kennen sollte. Warum und was es damit auf sich hat, möchte ich euch gern darlegen. Außerdem habe ich mich mit Ralley Driven Development beschäftigt. Ihr wisst nicht, was das ist? Super - lasst es mich euch erklären, wenn ihr mögt.'},
      {portrait: 'olli.png', speaker: 'Oliver Milke', text: 'Mein "Crypto 101" - Vortrag stößt immer wieder auf Beliebtheit, deshalb biete ich ihn auch auf dem Barcamp an. Ihr lernt die absoluten Grundlagen der Kryptographie im Alltag eines Softwareentwicklers. Zusätzlich würde ich gern über Jenkinsfiles sprechen und wie man Build Jobs as Code formuliert.'}
  ];

    this.talksCommunity = [
      {portrait: 'jens_schauder.jpg', speaker: 'Jens Schauder', text: 'Ich würde euch gern von meinen Erfahrungen mit den Toastmasters berichten. Was ist das? Warum hält man dort regelmäßig vor den Anwesenden Vorträge? Wie kann das strukturiert gegebene Feedback die eigenen Redekompetenzen massiv verbessern?'},
      {portrait: 'steven.png', speaker: 'Steven ', text: 'Mich treibt das Thema IT-Communities um, daran möchte ich gern mit euch arbeiten. Ich stelle mir einen Workshop zur Weiterentwicklung des IT Hubs als Plattform vor. Was sollte noch an Funktionalitäten drauf? Wie können wir zusammen daran arbeiten? Außerdem würde ich mit euch gern einen Leitfaden für die Organisation von Community-Veranstaltungen erstellen. Das motiviert sicherlich einige, selbst Events zu organisieren. Als drittes Thema würde ich mit euch gemeinsam herausfinden, was wir in der IT Community Braunschweigs noch übersehen haben. '},
      {portrait: 'olli.png', speaker: 'Oliver Milke', text: 'Mein "Crypto 101" - Vortrag stößt immer wieder auf Beliebtheit, deshalb biete ich ihn auch auf dem Barcamp an. Ihr lernt die absoluten Grundlagen der Kryptographie im Alltag eines Softwareentwicklers. Zusätzlich würde ich gern über Jenkinsfiles sprechen und wie man Build Jobs as Code formuliert.'}
    ];
  }

  ngOnInit() {
  }

}
