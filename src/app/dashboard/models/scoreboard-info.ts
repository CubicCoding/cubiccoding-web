import { Tournament } from './tournament';
import { ScorePrimary } from './score-primary';
import { ScoreSecondary } from './score-secondary';

export class ScoreboardInfo {
    tournamentInfo: Tournament;
    primary: ScorePrimary;
    secondaries: ScoreSecondary[];
}