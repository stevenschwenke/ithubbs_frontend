import {Component, OnInit} from '@angular/core';

class Image {
  public name: string;
  caption: string;
}


class Talk {
  public portrait: string;
  speaker: string;
  text: string;
}

@Component({
  selector: 'app-conference-2019',
  templateUrl: './conference.component.html',
  styleUrls: ['conference.component.css']
})
export class Conference2019Component implements OnInit {
  impressions: any[];
  talksBestPractice: Talk[];
  talksExpert: Talk[];
  talksCommunity: Talk[];

  constructor() {

    this.impressions = [];
    this.impressions.push({source: 'assets/images/conference/event/reception.jpg', title: 'Begrüßung der Teilnehmer'});
    this.impressions.push({source: 'assets/images/conference/event/food.jpg', title: 'Einer der vielen, vielen Brötchenteller'});
    this.impressions.push({source: 'assets/images/conference/event/keynote.jpg', title: 'Keynote über das Thema der Konferenz: IT Community'});
    this.impressions.push({source: 'assets/images/conference/event/agenda1.jpg', title: 'Agenda am Vormittag'});
    this.impressions.push({source: 'assets/images/conference/event/agenda2.jpg', title: 'Agenda zur Mittagszeit'});
    this.impressions.push({source: 'assets/images/conference/event/agenda3.jpg', title: 'Agenda am Nachmittag'});
    this.impressions.push({source: 'assets/images/conference/event/talk_tim.jpg', title: 'Tim bei seinem gut besuchten Talk'});
    this.impressions.push({source: 'assets/images/conference/event/talk_ithub.jpg', title: 'Der IT Hub e.V. stellt sich vor'});
    this.impressions.push({source: 'assets/images/conference/event/feedback.jpg', title: 'Feedback-Karten wurden reichlich für sehr gutes Feedback genutzt'});
    this.impressions.push({source: 'assets/images/conference/event/stage.jpg', title: 'Hauptbühne'});

    this.talksBestPractice = [
      {
        portrait: 'Tim_Bourguignon.jpg',
        speaker: 'Tim Bourguignon ',
        text: 'Ich biete euch mein vielerorts durchgeführtes <strong>Mentoring Speeddating</strong> an. ' +
          'Nach kurzer Einführung in Mentoring gibt es schnell getaktete Gespräche (10 Minuten), in ' +
          'denen ihr interessante Ansprechpartner findet, aus denen sich vielleicht eine Mentor-Beziehung ergibt.'
      },
      {
        portrait: 'jens_schauder.jpg',
        speaker: 'Jens Schauder',
        text: 'Ich habe die Erfahrung gemacht, dass <strong>Kommunikation in IT-Projekten</strong> ' +
          'unglaublich wichtig ist. Darüber würde ich gern reden.'
      },
      {
        portrait: 'lisa_rosenberg.jpg',
        speaker: 'Lisa Rosenberg',
        text: 'Ich möchte euch anhand meiner Erfahrungen das Thema <strong>Continuous Integration</strong> ' +
          'näher bringen. Außerdem möchte ich gern über <strong>Git</strong> reden, sodass euch der ' +
          'Einstieg in dieses wichtige Tool leichter fällt. Dabei gehe ich auf die wichtigsten Grundlagen, ' +
          'Best-Practices und typische Probleme ein.'
      },
      {
        portrait: 'stefan_henschke.jpg',
        speaker: 'Stefan Henschke',
        text: 'Aufgrund meiner Erfahrungen kann ich jungen Entwicklern die <strong>Grundlagen der ' +
          'Software-Architektur</strong> näher bringen.'
      },
      {
        portrait: 'olli.png',
        speaker: 'Oliver Milke',
        text: '<strong>Docker</strong> ist heutzutage eine Grundlagentechnologie, die man kennen sollte. ' +
          'Wenn ihr möchtet, zeige ich sie euch!'
      },
      {
        portrait: 'dmitrij_drandarov.jpg',
        speaker: 'Dmitrij Drandarov',
        text: 'Ich würde euch gern meine Erfahrungen mit verschiedenen Grundlagen-Technologien ' +
          'weitergeben: <strong>Git, Gradle und JUnit 5</strong> sind Dinge, die man heutzutage kennen muss.'
      },
      {
        portrait: 'josha.png',
        speaker: 'Josha von Gizycki',
        text: 'Die von Heroku entwickelte <strong>12 Factor App</strong> ist heutzutage so wichtig, ' +
          'dass man sie kennen sollte. Warum und was es damit auf sich hat, möchte ich euch gern darlegen.'
      },
    ];

    this.talksExpert = [
      {
        portrait: 'JeuryTavares.png',
        speaker: 'Jeury Tavares',
        text: `I have been helping people <strong>communicate</strong> with themselves and others for nearly a decade. I will be sharing with you key elements that make communication easy, constructive and effective. Specially when dealing with feedback. The result of this talk should give you a very good base for being the communicator that you are meant to be and help you be more successful. You will receive the most important key to communicate with anyone. You will learn about different types of personalities and how to deal with them. We will also look at how feedback should be shared in a way that can only benefit you.`
      },
      {
        portrait: 'a_luetgering.jpg',
        speaker: 'Axel Lütgering',
        text: `Das Thema <strong>"Agilität"</strong> treibt mich schon seit den 2000er Jahren um und motiviert mich nachhaltig in meiner Beratertätigkeit und als Scrum Master - um so schlimmer ist für mich der gefühlte Abstieg zu einem reinen Buzzword. In meinem Vortrag möchte ich gerne beleuchten, warum "Agil" dennoch toll ist, mit einigen Agilitätsmythen aufräumen und kleine Helferlein (Facilitationtechniken) vorstellen, die den täglichen Arbeitsalltag erleichtern.`
      },
      {
        portrait: 'mira_andreas.jpg',
        speaker: 'Mira Kottmann & Andreas Siewert',
        text: `Welches Veränderungspotenzial können zwei Neulinge (ein Entwickler und eine Testerin) einem
          langjährigen Team bieten, wenn sie feststellen, dass es Lücken in der Qualitätsicherung und eine
          schlechte Arbeitsteilung zwischen Tester und Entwickler gibt? Wir brachen mit den traditionellen
          Konzepten und wollen euch davon erzählen.`
      },
      {
        portrait: 'stefan_henschke.jpg',
        speaker: 'Stefan Henschke ',
        text: 'In meiner Arbeit habe ich mich mit <strong>evolutionärer Software-Architektur</strong> beschäftigt,' +
          ' das kann ich euch sehr gern näher bringen. Außerdem bin ich großer Freund von ' +
          '<strong>Heimautomatisierung mit OpenHAB</strong>.'
      },
      {
        portrait: 'helena.jpg',
        speaker: 'Helena Schmidt',
        text: 'Die beiden wichtigsten Programmiersprachen für <strong>moderne Datenanalysen</strong> ' +
          'sind R und Python. Ich hätte Lust, die beiden relevantesten Bibliotheken für grafische ' +
          'Darstellungen vorzustellen. Worin liegt die Stärke von matplotlib mit Python ' +
          'und wo die von gglot2 mit R?'
      },
      {
        portrait: 'marius_seebach.jpg',
        speaker: 'Marius Seebach',
        text: 'Meine Begeisterung und jahrelange Erfahrung als Scrum-Master möchte ich gern mit euch ' +
          'teilen und biete deshalb die Themen <strong>The science behind agile</strong> und ' +
          '<strong>The story mapping game a method for agile teams</strong> an.'
      },
      {
        portrait: 'olli.png',
        speaker: 'Oliver Milke',
        text: 'Mein "<strong>Crypto 101</strong>" - Vortrag stößt immer wieder auf Beliebtheit, deshalb ' +
          'biete ich ihn auch auf dem Barcamp an. Ihr lernt die absoluten Grundlagen der Kryptographie ' +
          'im Alltag eines Softwareentwicklers. Zusätzlich würde ich gern über ' +
          '<strong>Jenkinsfiles</strong> sprechen und wie man Build Jobs as Code formuliert.'
      },
      {
        portrait: 'josha.png',
        speaker: 'Josha von Gizycki',
        text: 'Ich habe mich viel mit Einfachheit in der Entwicklung beschäftigt. Herausgekommen ist ' +
          '<strong>Ralley Driven Development</strong>. Wenn ihr wissen wollt, was das bedeutet, werde ' +
          'ich es euch gerne erklären.'
      }
    ];

    this.talksCommunity = [
      {
        portrait: 'Tim_Bourguignon.jpg',
        speaker: 'Tim Bourguignon ',
        text: 'Als Publisher des Podcasts "DevJourney" würde ich euch im <strong>Podcasting 101</strong> ' +
          'gern zeigen, was ich in 70 Folgen aufgenommener Podcasts gelernt habe.'
      },
      {
        portrait: 'lisa_rosenberg.jpg',
        speaker: 'Lisa Rosenberg',
        text: 'Seit Jahren beschäftige ich mich damit, wie wir <strong>Kinder und Jugendliche mit ' +
          'Workshops für die IT begeistern</strong> können. In dem Talk möchte ich meine Erfahrungen ' +
          'als Mentorin für Kinder und Jugendliche mit euch teilen und alle wichtigen ' +
          'Fragen in diesem Bezug klären.'
      },
      {
        portrait: 'jens_schauder.jpg',
        speaker: 'Jens Schauder',
        text: 'Ich würde euch gern von meinen Erfahrungen mit den <strong>Toastmasters</strong> ' +
          'berichten. Was ist das? Warum hält man dort regelmäßig vor den Anwesenden Vorträge? ' +
          'Wie kann das strukturiert gegebene Feedback die eigenen Redekompetenzen massiv verbessern?'
      },
      {
        portrait: 'steven.png',
        speaker: 'Steven ',
        text: 'Mich treibt das Thema IT-Communities um, daran möchte ich gern mit euch arbeiten. ' +
          'Ich stelle mir einen <strong>Workshop zur Weiterentwicklung des IT Hubs als Plattform</strong> ' +
          'vor. Was sollte noch an Funktionalitäten drauf? Wie können wir zusammen daran arbeiten? ' +
          'Außerdem würde ich mit euch gern einen <strong>Leitfaden für die Organisation von ' +
          'Community-Veranstaltungen</strong> erstellen. Das motiviert sicherlich einige, selbst ' +
          'Events zu organisieren. Als drittes Thema würde ich mit euch gemeinsam herausfinden, ' +
          'was wir in der <strong>IT Community Braunschweigs</strong> noch übersehen haben. '
      }
    ];
  }

  ngOnInit() {
  }

}
