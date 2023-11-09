import { DialogHelpInfo } from '../model/dialog-help-data';

export class HelpInfoTemplates {
  public static TEAM_STRUCTURE_HELP_TEMPLATE: DialogHelpInfo = {
    title: 'Struktura drużyn',
    template: `<p>Odnosi się do liczby graczy w składzie meczowym</p>
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
}
