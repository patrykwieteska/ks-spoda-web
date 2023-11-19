import { DialogHelpInfo } from '../model/dialog-help-data';

export class HelpInfoTemplates {
  public static TEAM_STRUCTURE_HELP_TEMPLATE: DialogHelpInfo = {
    title: 'Struktura drużyn',
    template: `<p>Odnosi się do liczby zawodników w składzie meczowym</p>
    <b>1 NA 1</b>
      <p>
      Mecze rozgrywane są w składach jednoosobowych
      </p>
      <b>2 NA 2</b>
      <p>
      Mecze rozgrywane są w składach jednoosobowych
      </p>
      <b>2 NA 2</b>
      <p>
      Mecze rozgrywane są w składach mieszanych: <br/>
      1 na 1, 2 na 2, lub 2 na 1
      </p>`,
  };

  public static LEAGUE_TYPE_HELP_TEMPLATE: DialogHelpInfo = {
    title: 'Typ ligi',
    template: `<p>To sposób organizacji rozgrywek</p>
    <b>SEZON</b>
    <p>
      Mecze rozgrywane są w systemie sezonu ligowego. <br />
      W ramach kolejek każdy gra z każdym.
    </p>
    <b>PUCHAR</b>
    <p>
      Mecze rozgrywane są w systemie pucharowym. <br />
      Do wyboru system play-off lub faza grupowa
    </p>`,
  };

  public static PRIVATE_LEAGUE_HELP_TEMPLATE: DialogHelpInfo = {
    title: 'Widoczność ligi',
    template: `
    <b>Liga prywatna</b>
    <p>
      Tylko Ty i osoby, którym udostępnisz tę ligę będą mogli ją zobaczyć
    </p>
    <b>Liga publiczna</b>
    <p>
      Liga będzie widoczna dla wszystkich
    </p>`,
  };

  public static POINT_COUNTING_METHODS_HELP_TEMPLATE: DialogHelpInfo = {
    title: 'Sposób liczenia punktów',
    template: `<p>Decyduje o kolejności drużyn w tabeli sezonu</p>
    <b>RANKING</b>
      <p>
      O pozycji w tabeli decyduje ranking podobny do tego, który występuje w szachach. 
      </br> 
      Każdy zawodnik rozpoczyna z rankingiem startowym = 1000
      </p>
      <b>PUNKTY</b>
      <p>
      O pozycji w tabeli decyduje liczba punktów liczona tradycyjnie </br> (Z - 3 pkt, R - 1pk, P - 0 pkt)
      </p>
      <b>PUNKTY / MECZ</b>
      <p>
      O pozycji w tabeli decyduje średnia punktów ze wszystkich rozegranych meczów w sezonie
      </p>`,
  };

  public static RATING_TYPE_HELP_TEMPLATE: DialogHelpInfo = {
    title: 'Typ rankingu',
    template: `<p>Oznacza sposób liczenia rankingu</p>
    <b>INDYWIDUALNY</b>
      <p>
       
      </p>
      <b>DRUŻYNOWY</b>
      <p>
      
      </p>`,
  };
}
